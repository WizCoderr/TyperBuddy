<script setup lang='ts'>
import { onMounted, onUnmounted, ref, useSeoMeta, watch } from '#imports';
import { navigateTo } from 'nuxt/app';
import { useRouter } from 'vue-router';
import RightPanel from '~/components/RightPanel.vue';
import MatchHistoryTable from '~/components/tournament/MatchHistoryTable.vue';
import RegisteredPlayers from '~/components/tournament/RegisteredPlayers.vue';
import { formatDateTime, generateAvatar, getTimeLeft } from '~/lib/utils';
import { ArrowLeftIcon, LoadingIcon } from "../../../components/icons"
import { ParticipantData, TournamentFullData } from '~/lib/DataType';
import { useToast } from 'vue-toast-notification';
import { useProfileStore } from '~/store/profile';
import { useRoute } from '#vue-router';
import ApiTournament from '~/lib/api/ApiTournament';
import ApiParticipant from '~/lib/api/ApiParticipant';


const router = useRouter()
const route = useRoute()
const $toast = useToast();

const profileStore = useProfileStore()
const pageData = ref<TournamentFullData>()
const registeredPlayers = ref<ParticipantData[]>([])

useSeoMeta({
    title: 'View Tournament',
})

profileStore.$subscribe((mutation, state) => {
    if (state.profile) loadPageData(route.params.id as string, state.profile.id)
    else loadPageData(route.params.id as string)
})

let timer: any = null
const timeLeft = ref("00:00:00:00")
const isTournamentStarted = ref(false)



onUnmounted(() => {
    clearInterval(timer)
})

onMounted(() => {
    if (profileStore.isLoaded) {
        if (profileStore.profile) loadPageData(route.params.id as string, profileStore.profile.id)
        else loadPageData(route.params.id as string)
    }
})

watch(pageData, () => {
    setCountdown()
    clearInterval(timer)
    timer = setInterval(setCountdown, 1000)
})

function setCountdown() {
    if (!pageData.value) return
    const time = getTimeLeft(pageData.value.startDateTime)
    const str = `${String(time[0]).padStart(2, "0")}:${String(time[1]).padStart(2, "0")}:${String(time[2]).padStart(2, "0")}:${String(time[3]).padStart(2, "0")}`
    timeLeft.value = str
    if (str == '00:00:00:00') {
        clearInterval(timer)
        isTournamentStarted.value = true
    }
}

function loadPageData(tournamentId: string, playerId: string = "") {

    ApiTournament.getTournamentPageData(tournamentId, playerId).then(res => {
        if (res.data) {
            pageData.value = res.data
        } else {
            $toast.error(res.error!!.message)
        }
    });

    ApiParticipant.getRegisteredPlayers(tournamentId).then(res => {
        if (res.data) {
            registeredPlayers.value = res.data
        } else {
            $toast.error(res.error!!.message)
        }
    });
}


const isJoining = ref(false)
async function joinTournament() {
    if (isJoining.value) return
    if (!profileStore.profile) {
        $toast.error('Please login first to join')
        return
    }

    if (pageData.value && !pageData.value.isJoined) {
        isJoining.value = true
        const res = await ApiParticipant.joinTournament(route.params.id as string)
        isJoining.value = false
        if (res.data) {
            pageData.value.isJoined = true
            registeredPlayers.value.push({ id: profileStore.profile.id, name: profileStore.profile.name, avatar: profileStore.profile.profileImage })
            $toast.success("You were joined successfully")
        } else {
            $toast.error(res.error!!.message)
        }
    }


    // TODO: implement the condition to enter the tournament room

}


</script>
<template>
    <main>
        <Sidebar :activeTabIndex="6" />
        <section class="main">
            <h2>View Tournaments</h2>
            <p>Are you ready to elevate your gaming experience? Dive into the world of competition and skill with our
                dynamic tournaments platform. Whether you're a seasoned pro or a casual gamer, our Tournaments Create and
                Join page is your gateway to thrilling battles, epic showdowns, and incredible prizes!</p>
            <hr />

            <div v-if="pageData" class="top-bar">
                <div></div>
                <span class="timer">{{ timeLeft }}</span>
                <button @click="joinTournament" class="button primary">
                    <LoadingIcon v-if="isJoining" size="mini" />{{ pageData.isJoined ? "Joined" :
                        profileStore.profile ? "Join tournament" : 'Login to join' }}
                </button>
            </div>

            <div v-if="pageData" class="content-area">
                <div class="left">

                    <div class="joined-players card">
                        <h4>Tournament</h4>
                        <div class="content">
                            <p>Tournament name: {{ pageData.name }}</p>
                            <p>Highlight: {{ pageData.smallDesc }}</p>
                            <p>Total rounds: {{ pageData.matchRoundCount }}</p>
                            <p>Seats: {{ pageData.seats }}</p>
                            <p>Entry fee: {{ pageData.entryFee }}</p>
                            <p>Reward: {{ pageData.totalReward }}</p>
                            <p>Total winners: {{ pageData.totalWinners }}</p>
                            <p>Tournament type: {{ pageData.visibility }}</p>
                            <p>Round break interval: {{ pageData.roundBreakInv }}</p>
                            <p>Entry fee: {{ pageData.entryFee }}</p>
                            <p>Last updated: {{ formatDateTime(pageData.updatedAt) }}</p>
                            <p>Created at: {{ formatDateTime(pageData.createdAt) }}</p>
                        </div>
                    </div>

                    <div v-if="pageData.totalReward" class="reward card">
                        <h4>Game Reward</h4>
                        <div class="content">

                            <div class="rewards-container">
                                <div class="item" :key="index" v-for="item, index in 10">
                                    <span class="layer">Rank</span>
                                    <p class="icon">{{ item }}</p>
                                    <span class="amount">₹100</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="joined-players card">
                        <h4>Registered Players · {{ registeredPlayers.length }}/{{ pageData.seats }}</h4>
                        <div class="content">
                            <RegisteredPlayers :data="registeredPlayers" :is-editable="false" />
                        </div>
                    </div>

                </div>
                <div class="right">
                    <div v-if="pageData.description">
                        <h4>About Tournament</h4>
                        <div class="markdown">
                            {{ pageData.description }}
                        </div>
                    </div>
                    <div v-if="pageData.rules">
                        <h4>Tournament Rules</h4>
                        <div class="markdown">
                            <h4>Tournament rules</h4>
                            <ol>
                                <li v-for="item, index in pageData.rules.split('\n')" :key="index">{{ item }}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="isTournamentStarted" class="card match-history">
                <h4>Match History</h4>
                <div class="content">
                    <MatchHistoryTable />
                </div>

            </div>

        </section>
        <RightPanel />
    </main>
</template>
<style scoped>
/* reward */

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 100px;
}

.top-bar .timer {
    font-size: var(--big-font);
    margin-top: 0.2em;
    letter-spacing: 0px;
    display: block;
    font-family: 'Courier New', Courier, monospace;
}

.rewards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}

.rewards-container .item {
    position: relative;
    width: 150px;
    height: 180px;
    border: 1px solid var(--color-surface-dark);
    border-radius: var(--border-radius-3);
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: center;

}

.rewards-container .layer {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-secondary);
    padding: 3px 16px;
    font-size: var(--small-font);
    color: white;
    border-radius: 0 0 10px 10px;
    font-weight: bold;
}

.rewards-container .icon {
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    margin-top: 24px;
}

.rewards-container .amount {
    font-size: 24px;
    background-color: var(--color-surface);
    padding: 0.2em 0.8em;
    border-radius: 50px;
}



/* card */
.card {
    /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
    background-color: white;
    border-radius: var(--border-radius-2);
    min-height: 200px;
    margin-bottom: 24px;
}

.card .content {
    padding: 1em;
    padding-top: 2em;
}

.card h4 {
    margin: 0;
    display: flex;
    align-items: center;
    padding: 0.7em 0;
    background-color: var(--color-primary);
    text-align: center;
    color: white;
    justify-content: center;
    border-radius: var(--border-radius-2) var(--border-radius-2) 0 0;
}



.main>button {
    margin-bottom: 40px;
}

.card-holder {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 100px;
}

.content-area {
    display: grid;
    grid-template-columns: 2fr 0.8fr;
    gap: 24px;
    margin-bottom: 24px;
}

.content-area .right>div {
    /* border-left: 1px solid var(--color-surface-dark-2); */
    min-height: 200px;
    height: max-content;
    background-color: white;
    margin-bottom: 24px;
    /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
    border-radius: var(--border-radius-2);

}

.content-area .right>div>h4 {
    margin: 0;
    display: flex;
    align-items: center;
    padding: 0.7em 0;
    background-color: var(--color-primary);
    text-align: center;
    color: white;
    justify-content: center;
    border-radius: var(--border-radius-2) var(--border-radius-2) 0 0;
}

.content-area .markdown {
    padding: 1em;
}

.content-area .markdown ol {
    padding-left: 24px;
    line-height: 1.3em;
}

.content-area .markdown li {
    margin-bottom: 1em;
}
</style>