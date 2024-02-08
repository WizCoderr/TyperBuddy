<script setup lang='ts'>
import { type TournamentRawData, TournamentStatus, Visibility } from '~/lib/DataType';
import CheckBox from '../widgets/CheckBox.vue';
import Dropdown from '../widgets/Dropdown.vue';
import GameContent from '../widgets/GameContent.vue';
import RadioGroup from '../widgets/RadioGroup.vue';

import { ref, watch, onMounted } from 'vue';
import { countWords } from '~/lib/utils';
import { useTextareaAutosize } from '@vueuse/core'
import HelpIcon from '../icons/HelpIcon.vue';
import InfoIcon from '../icons/InfoIcon.vue';
const { textarea } = useTextareaAutosize()
import { calculatePrize } from "@/lib/utils"
import { useToast } from 'vue-toast-notification';
import { toRaw } from '#imports';
import ApiTournament from '~/lib/api/ApiTournament';
const $toast = useToast();

const emit = defineEmits<{
    (event: 'close'): void,
    (event: 'save', value: TournamentRawData): void
}>()

const isSaving = ref(false)


// interface TournamentBasicData {
//     name: string,
//     seats: number,
//     visibility: string,
//     headline: string,
//     about: string,
//     startDatetime: string,
//     roundBreak: string,
//     rules: string,
//     maxMatchWordCount: number,
//     matchRoundCount: number,
//     matchRoundSentence: Array<string>,
//     entryFee: number,
//     totalReward: number,
//     totalWinners: number
// }

interface TournamentFormData extends Omit<TournamentRawData, 'createdAt' | 'updatedAt' | 'id'> {
    matchRoundContent: Array<{
        id: string,
        text: string
    }>
}





const basicData = ref<TournamentFormData>({
    description: '',
    roundBreakInv: 5,
    rules: '',
    maxMatchWordsCount: 30,
    tournamentStatus: TournamentStatus.IDEAL,
    name: '',
    smallDesc: '',
    matchRoundCount: 3,
    seats: 100,
    entryFee: 0,
    totalReward: 0,
    totalWinners: 5,
    visibility: Visibility.PUBLIC,
    startDateTime: '',
    matchRoundContent: [{ id: '', text: '' }, { id: '', text: '' }, { id: '', text: '' }]
})


/*
    name: '',
    seats: 100,
    visibility: 'public',
    about: '',
    startDatetime: 'd',
    roundBreak: '5m',
    rules: "",
    maxMatchWordCount: 30,
    matchRoundCount: 5,
    matchRoundSentence: ['', '', '', '', ''],
    entryFee: 0,
    totalReward: 0,
    totalWinners: 5
*/



const activeContentTab = ref(0)
const tabActiveIndex = ref(0)


function changeTab(index: number) {
    tabActiveIndex.value = index
}


watch(() => basicData.value.maxMatchWordsCount, (newData, oldData) => {

    const oldArr = basicData.value.matchRoundContent.slice()
    let index = 0
    for (const iterator of oldArr) {

        let words = textToArray(iterator.text)
        if (words.length > basicData.value.maxMatchWordsCount) words = words.slice(0, basicData.value.maxMatchWordsCount)
        oldArr[index] = { ...iterator, text: words.join(" ") }
        index++
    }

    basicData.value.matchRoundContent = oldArr
})


function textToArray(text: string) {
    const words = text.split(" ");
    return words.filter((word) => word);
}

watch(() => basicData.value.matchRoundCount, (newData, oldData) => {
    const oldArr = basicData.value.matchRoundContent.slice()
    const diff = newData - oldData
    if (diff > 0) {       // add items
        for (const iterator of Array(diff)) {
            oldArr.push({
                id: "",
                text: ""
            })
        }

    } else if (diff < 0) { // remove items
        for (const iterator of Array(Math.abs(diff))) {
            oldArr.pop()
        }
    }

    if (activeContentTab.value > oldArr.length - 1) {
        activeContentTab.value = oldArr.length - 1
    }

    basicData.value.matchRoundContent = oldArr
})



watch(() => basicData.value.entryFee, (newData, oldData) => {
    if (newData < 0) basicData.value.entryFee = 0
    if (isFloat(newData)) basicData.value.entryFee = Math.round(newData)
})


watch(() => basicData.value.totalReward, (newData, oldData) => {
    if (newData < 0) basicData.value.totalReward = 0
    if (isFloat(newData)) basicData.value.totalReward = Math.round(newData)
})

function isFloat(n: number) {
    return Number(n) === n && n % 1 !== 0;
}




function validateDecimalNumber(event: any) {
    if (event.key == '.' || event.key == '-') {
        event.preventDefault()
    }
}

async function onHost() {

    if (isSaving.value) return

    // validate the fields
    try {
        if (!basicData.value.name) throw Error("Please enter tournament name.")
        if (!basicData.value.smallDesc) throw Error("Please enter small description.")
        if (!basicData.value.description) throw Error("Please enter about tournament.")
        if (!basicData.value.startDateTime) throw Error("Please enter tournament datetime.")
        if (basicData.value.entryFee < 0) throw Error("Please enter entry fee or left 0 for free tournament.")
        if (basicData.value.totalReward < 0) throw Error("Please enter reward or left 0 for free tournament.")

        let round = 1
        for (const iterator of basicData.value.matchRoundContent) {
            if (countWords(iterator.text) <= basicData.value.maxMatchWordsCount / 2) throw Error("Please enter at least 50% words in round " + round)
            round++
        }

        // send data to server
        const clone = structuredClone(toRaw(basicData.value))
        clone.startDateTime = dateInputToStringFormat(clone.startDateTime)

        isSaving.value = true
        const res = await ApiTournament.createTournament(clone)
        isSaving.value = false
        if (res.data) {
            $toast.success('Tournament created successfully')
            emit('save', res.data)
        } else {
            $toast.error(res.error!!.message)
        }

    } catch (error: any) {
        $toast.error(error.message)
    }
}

function intervalToNumber(value: string) {

    // number is minutes
    const split = value.split(" ")
    if (split.length != 2) return 5

    if (split[1] == "M") return parseInt(split[0])
    if (split[1] == "H") return parseInt(split[0]) * 60

    return 5
}

function intervalToString(value: number) {

    // number is minutes
    if (value > 59) return `${Math.round(value / 60)} H`
    if (value < 60) return `${value} M`

    return "5 M"

}

function dateInputToStringFormat(value: string) {
    return new Date(value).toISOString()
}

function dateStringToInputFormat(value: string) {
    return new Date(value).toISOString().slice(0, 16)
}


function closeDialog() {
    if (!isSaving.value) emit('close')
}


</script>
<template>
    <div class="dialog">
        <div class="content">
            <h2>Host Tournament</h2>

            <div class="tab-container">
                <div class="tabs">
                    <span @click="changeTab(0)" :class="{ 'active': tabActiveIndex == 0 }">General</span>
                    <span @click="changeTab(1)" :class="{ 'active': tabActiveIndex == 1 }">Timing</span>
                    <span @click="changeTab(2)" :class="{ 'active': tabActiveIndex == 2 }">Rules</span>
                    <span @click="changeTab(3)" :class="{ 'active': tabActiveIndex == 3 }">Content</span>
                    <span @click="changeTab(4)" :class="{ 'active': tabActiveIndex == 4 }">Prizes</span>
                    <span @click="changeTab(5)" :class="{ 'active': tabActiveIndex == 5 }">Sponsorship</span>

                </div>
                <div class="tab-contents">

                    <!-- tab content 1 -->
                    <template v-if="tabActiveIndex == 0">
                        <div class="content card-holder">
                            <h4>General</h4>
                            <div class="input-holder">
                                <span class="title">Tournament Name*</span>
                                <input v-model="basicData.name" type="text" style="width: 50%;" />
                            </div>

                            <div class="col-3">
                                <div class="input-holder">
                                    <span class="title">Seats*</span>
                                    <Dropdown :is-editable="true" :default-value="basicData.seats.toString()"
                                        :onChange="e => basicData.seats = parseInt(e)" :items="['100', '200', '500']" />
                                </div>

                                <div class="input-holder">
                                    <span class="title">Visibility*</span>
                                    <Dropdown :is-editable="true" :default-value="basicData.visibility"
                                        :onChange="(e: any) => basicData.visibility = e" :items="['PUBLIC', 'PRIVATE']" />
                                </div>
                            </div>

                            <div class="input-holder">
                                <span class="title">Small Info*</span>
                                <textarea v-model="basicData.smallDesc" maxlength="100" rows="3"></textarea>
                                <span class="info">
                                    <InfoIcon style="width: 18px; height: 18px;" /> Small description which is visible on
                                    tournament card.
                                </span>
                            </div>

                            <div class="input-holder">
                                <span class="title">About Tournament*</span>
                                <textarea v-model="basicData.description" maxlength="10000" rows="5"></textarea>
                                <span class="info">
                                    <InfoIcon style="width: 18px; height: 18px;" /> Write your tournament description
                                </span>
                            </div>

                        </div>
                    </template>

                    <!-- tab content 2 -->
                    <template v-if="tabActiveIndex == 1">
                        <div class="content card-holder">
                            <h4>Tournament timing</h4>
                            <div class="col-3">
                                <div class="input-holder">
                                    <span class="title">Start Datetime*</span>
                                    <input v-model="basicData.startDateTime" class="block" type="datetime-local" />
                                </div>

                                <div class="input-holder">
                                    <span class="title">Round Break Interval*</span>
                                    <Dropdown :is-editable="true" :default-value="intervalToString(basicData.roundBreakInv)"
                                        :onChange="e => basicData.roundBreakInv = intervalToNumber(e)"
                                        :items="['5 M', '10 M', '15 M', '30 M', '1 H', '5 H', '10 H']" />
                                </div>
                            </div>

                        </div>
                    </template>

                    <!-- tab content 3 -->
                    <template v-if="tabActiveIndex == 2">
                        <div class="content card-holder">
                            <h4>Tournament rules</h4>
                            <div class="input-holder">
                                <span class="title">Write tournament rules, this will be visible on the page.</span>
                                <textarea rows="10" v-model="basicData.rules"></textarea>
                            </div>

                        </div>
                    </template>

                    <!-- tab content 4 -->
                    <template v-if="tabActiveIndex == 3">
                        <div class="content card-holder">
                            <h4>Contents</h4>
                            <div class="col-3">
                                <div class="input-holder">
                                    <span class="title">Max Word Count*</span>
                                    <Dropdown :is-editable="true" :default-value="basicData.maxMatchWordsCount.toString()"
                                        :onChange="e => basicData.maxMatchWordsCount = parseInt(e)"
                                        :items="['30', '50', '70', '100', '120']" />
                                </div>

                                <div class="input-holder">
                                    <span class="title">Match Rounds*</span>
                                    <Dropdown :is-editable="true" :default-value="basicData.matchRoundCount.toString()"
                                        :onChange="e => basicData.matchRoundCount = parseInt(e)" :items="['3', '5', '7']" />
                                </div>

                            </div>
                            <div class="game-content">
                                <div class="vertical-tab">
                                    <template v-for="item, index in basicData.matchRoundCount" :key="index">
                                        <span :onClick="() => activeContentTab = index"
                                            :class="{ 'active': index == activeContentTab }">Round {{ item }}
                                            <b>{{ countWords(basicData.matchRoundContent[index].text) }}/{{
                                                basicData.maxMatchWordsCount }}</b></span>
                                    </template>
                                </div>
                                <template v-for="item, index in basicData.matchRoundContent">
                                    <div v-if="activeContentTab == index" :key="index" class="input-holder">
                                        <GameContent :default-value="basicData.matchRoundContent[index].text"
                                            :onChange="e => basicData.matchRoundContent[index] = { ...basicData.matchRoundContent[index], text: e }"
                                            :max-length="basicData.maxMatchWordsCount" />
                                    </div>
                                </template>

                            </div>

                        </div>
                    </template>


                    <!-- tab content 5 -->
                    <template v-if="tabActiveIndex == 4">
                        <div class="content card-holder">
                            <h4>Prizes</h4>
                            <div class="col-3">
                                <div class="input-holder">
                                    <span class="title">Entry fee(₹)</span>
                                    <input @keydown="validateDecimalNumber" v-model="basicData.entryFee" class="block"
                                        type="number" />
                                </div>

                                <div class="input-holder">
                                    <span class="title">Total reward(₹)*</span>
                                    <input @keydown="validateDecimalNumber" v-model="basicData.totalReward"
                                        class="block" type="number" />
                                </div>

                                <div v-if="basicData.totalReward > 0" class="input-holder">
                                    <span class="title">Total winners*</span>
                                    <Dropdown :is-editable="true" :default-value="basicData.totalWinners.toString()"
                                        :onChange="e => basicData.totalWinners = parseInt(e)"
                                        :items="['3', '5', '10', '20']" />
                                </div>
                            </div>

                            <div v-if="basicData.totalReward > 0" class="input-holder">
                                <span class="title">Winner rewards(₹)*</span>
                                <div class="winner-rewards">
                                    <div v-for="item, index in calculatePrize(basicData.totalReward, basicData.totalWinners)"
                                        :key="index">
                                        <span class="value">₹{{ item.prize }}</span>
                                        <span class="bottom">Rank {{ item.rank }}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </template>

                    <!-- tab content 6 -->
                    <template v-if="tabActiveIndex == 5">
                        <div class="content card-holder">
                            <h4>Sponsorship</h4>
                        </div>
                    </template>

                </div>
            </div>


            <hr>
            <div class="buttons">
                <button class="button primary outline" @click="closeDialog">close</button>
                <button class="button primary" @click="onHost">
                    <div v-if="isSaving" class="loading mini"></div>Host
                </button>
            </div>

        </div>
    </div>
</template>
<style scoped>
@import '~/public/style/dialog.css';


.content {
    min-height: 600px;
}

.winner-rewards {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.winner-rewards div {
    width: 100px;
    height: 80px;
    border: 1px solid rgb(238, 238, 238);
    background-color: white;
    border-radius: var(--border-radius-2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.winner-rewards .bottom {
    font-size: var(--very-small-font);
    background-color: var(--color-surface);
    padding: 0.2em 0.6em;
    border-radius: 8px;
}

.rules-holder {
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.rules-holder div {
    display: grid;
    grid-template-columns: auto max-content;
    gap: 8px;

}

/* .rules-holder div:hover button {
    display: block;
} */

.rules-holder button {
    border: none;
    border: 1px solid rgba(0, 0, 0, 0.096);
    background-color: white;
    width: 40px;
    height: 40px;
    border-radius: 4px;
}

.rules-holder button svg {
    fill: var(--color-error);

}

.rules-holder textarea {
    display: block;
    width: 100%;
    resize: none;
    outline: none;
    font-size: var(--medium-font);
    border: none;
    background-color: white;
    text-align: left;
    padding: 0.5em 1em;
    margin: 0;
    border-radius: var(--border-radius-3);

}

button.rule-button {
    margin-top: 2em;
    width: 100%;
    justify-content: center;

}



.game-content {
    display: grid;
    grid-template-columns: 180px auto;
    gap: 1em;
    max-height: 400px;
    overflow-y: auto;
}

.game-content>.vertical-tab {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.game-content>.vertical-tab span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6em 1em;
    background-color: white;
    border-radius: var(--border-radius);
    cursor: pointer;
}

.game-content>.vertical-tab span b {
    font-size: var(--very-small-font);
    padding: 0.4em 0.6em;
    background-color: var(--color-surface);
    border-radius: 12px;
}

.game-content>.vertical-tab span.active b,
.game-content>.vertical-tab span:hover b {
    background-color: rgba(255, 255, 255, 0.219);
}

.game-content>.vertical-tab span.active,
.game-content>.vertical-tab span:hover {
    background-color: var(--color-secondary);
    color: white;
}
</style>