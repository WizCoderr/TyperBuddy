<script setup lang='ts'>
import { } from '~/lib/DataType';
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

const emit = defineEmits<{
    (event: 'close'): void
}>()


interface TournamentBasicData {
    name: string,
    seats: number,
    visibility: "public" | "private",
    headline: string,
    about: string,
    startDate: string,
    startTime: string,
    roundBreak: string,
    rules: string,
    maxMatchWordCount: number,
    matchRoundCount: number,
    matchRoundSentence: Array<string>,
    entryFee: number,
    totalReward: number,
    totalWinners: number
}




const basicData = ref<TournamentBasicData>({
    name: '',
    seats: 100,
    visibility: 'public',
    headline: '',
    about: '',
    startDate: '',
    startTime: '',
    roundBreak: '',
    rules: "",
    maxMatchWordCount: 30,
    matchRoundCount: 5,
    matchRoundSentence: ['', '', '', '', ''],
    entryFee: 0,
    totalReward: 0,
    totalWinners: 5
})



const activeContentTab = ref(0)
const tabActiveIndex = ref(0)


function changeTab(index: number) {
    tabActiveIndex.value = index
}


watch(() => basicData.value.maxMatchWordCount, (newData, oldData) => {

    const oldArr = basicData.value.matchRoundSentence.slice()
    let index = 0
    for (const iterator of oldArr) {

        let words = textToArray(iterator)
        if (words.length > basicData.value.maxMatchWordCount) words = words.slice(0, basicData.value.maxMatchWordCount)
        oldArr[index] = words.join(" ")
        index++
    }

    basicData.value.matchRoundSentence = oldArr
})


function textToArray(text: string) {
    const words = text.split(" ");
    return words.filter((word) => word);
}

watch(() => basicData.value.matchRoundCount, (newData, oldData) => {
    const oldArr = basicData.value.matchRoundSentence.slice()
    const diff = newData - oldData
    if (diff > 0) {       // add items
        for (const iterator of Array(diff)) {
            oldArr.push('')
        }

    } else if (diff < 0) { // remove items
        for (const iterator of Array(Math.abs(diff))) {
            oldArr.pop()
        }
    }

    if (activeContentTab.value > oldArr.length - 1) {
        activeContentTab.value = oldArr.length - 1
    }

    basicData.value.matchRoundSentence = oldArr
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
    if (event.key == '.') {
        event.preventDefault()
    }
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
                                <span class="title">Tournament Name</span>
                                <input v-model="basicData.name" type="text" style="width: 50%;" />
                            </div>

                            <div class="col-3">
                                <div class="input-holder">
                                    <span class="title">Seats</span>
                                    <Dropdown :default-value="basicData.seats.toString()" :onChange="e => basicData.seats = parseInt(e)" :items="['100', '200', '500']" />
                                </div>

                                <div class="input-holder">
                                    <span class="title">Visibility</span>
                                    <Dropdown :default-value="basicData.visibility" :onChange="(e: any) => basicData.visibility = e" :items="['public', 'private']" />
                                </div>
                            </div>

                            <div class="input-holder">
                                <span class="title">Small Info</span>
                                <textarea v-model="basicData.headline" maxlength="30" rows="3"></textarea>
                                <span class="info">
                                    <InfoIcon style="width: 18px; height: 18px;" /> Small description which is visible on
                                    tournament card.
                                </span>
                            </div>

                            <div class="input-holder">
                                <span class="title">About Tournament</span>
                                <textarea v-model="basicData.about" maxlength="10000" rows="5"></textarea>
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
                                    <span class="title">Start Date</span>
                                    <input class="block" type="date" />
                                </div>

                                <div class="input-holder">
                                    <span class="title">Start Time</span>
                                    <input class="block" type="time" />
                                </div>
                                <div class="input-holder">
                                    <span class="title">Round Break Interval</span>
                                    <input class="block" type="time" />
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
                                    <span class="title">Max Word Count</span>
                                    <Dropdown :default-value="basicData.maxMatchWordCount.toString()"
                                        :onChange="e => basicData.maxMatchWordCount = parseInt(e)"
                                        :items="['30', '50', '70', '100', '120']" />
                                </div>

                                <div class="input-holder">
                                    <span class="title">Match Rounds</span>
                                    <Dropdown :default-value="basicData.matchRoundCount.toString()"
                                        :onChange="e => basicData.matchRoundCount = parseInt(e)" :items="['3', '5', '7']" />
                                </div>

                            </div>
                            <div class="game-content">
                                <div class="vertical-tab">
                                    <template v-for="item, index in basicData.matchRoundCount" :key="index">
                                        <span :onClick="() => activeContentTab = index"
                                            :class="{ 'active': index == activeContentTab }">Round {{ item }}
                                            <b>{{ countWords(basicData.matchRoundSentence[index]) }}/{{
                                                basicData.maxMatchWordCount }}</b></span>
                                    </template>
                                </div>
                                <template v-for="item, index in basicData.matchRoundSentence">
                                    <div v-if="activeContentTab == index" :key="index" class="input-holder">
                                        <GameContent :default-value="basicData.matchRoundSentence[index]"
                                            :onChange="e => basicData.matchRoundSentence[index] = e"
                                            :max-length="basicData.maxMatchWordCount" />
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
                                    <span class="title">Total reward(₹)</span>
                                    <input @keydown="validateDecimalNumber" v-model="basicData.totalReward" class="block"
                                        type="number" />
                                </div>

                                <div v-if="basicData.totalReward > 0" class="input-holder">
                                    <span class="title">Total winners</span>
                                    <Dropdown :default-value="basicData.totalWinners.toString()"
                                        :onChange="e => basicData.totalWinners = parseInt(e)"
                                        :items="['3', '5', '10', '20']" />
                                </div>
                            </div>

                            <div v-if="basicData.totalReward > 0" class="input-holder">
                                <span class="title">Winner rewards(₹)</span>
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

                </div>
            </div>


            <hr>
            <div class="buttons">
                <button class="button primary outline" @click="emit('close')">close</button>
                <button class="button primary" @click="emit('close')">Host</button>

            </div>

        </div>
    </div>
</template>
<style scoped>
@import '~/public/style/dialog.css';


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