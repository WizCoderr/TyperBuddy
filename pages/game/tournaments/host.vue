<script setup lang='ts'>
import { onMounted, ref, useSeoMeta } from '#imports';
import { navigateTo } from 'nuxt/app';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import RightPanel from '~/components/RightPanel.vue';
import HostTournamentDialog from '~/components/dialog/HostTournamentDialog.vue';
import TournamentCreateCard from '~/components/tournament/TournamentCreateCard.vue';
import { type TournamentRawData, TournamentStatus } from '~/lib/DataType';
import ApiTournament from '~/lib/api/ApiTournament';
import { getTimeLeft, isTodayDate } from '~/lib/utils';
import GameLayout from '~/pages/layouts/GameLayout.vue';
import { useProfileStore } from '~/store/profile';
const $toast = useToast();
const router = useRouter()
const hostDialogVisible = ref(false)
const tournaments = ref(Array<TournamentRawData>())

useSeoMeta({
    title: 'Host Tournament',
})


const profileStore = useProfileStore()
profileStore.$subscribe((mutation, state) => {
    if (state.profile) {
        loadPageData()
    }
})

onMounted(() => {
    if (profileStore.isLoaded) {
        if (profileStore.profile) {
            loadPageData()
        }
    }
})

function loadPageData() {

    if (!profileStore.profile!!.isPremium) {
        $toast.error("Your plan is expired, please renew it.")
        router.push("/tournaments")
        return
    }

    ApiTournament.getUserCreatedTournaments().then(res => {
        if (res.data) {

            const arr = Array<TournamentRawData>()
            for (const iterator of res.data) {
                if (iterator.tournamentStatus == TournamentStatus.IDEAL && !isTodayDate(iterator.startDateTime)) {
                    iterator.tournamentStatus = TournamentStatus.UPCOMING
                }

                arr.push(iterator)
            }
            tournaments.value = arr
        } else {
            $toast.error(res.error!!.message)
        }
    });



    // ApiParticipant.getRegisteredPlayers(tournamentId).then(res => {
    //     if (res.data) {
    //         registeredPlayers.value = res.data
    //     } else {
    //         $toast.error(res.error!!.message)
    //     }
    // });
}


function filterTournament(status: TournamentStatus) {
    return tournaments.value.filter((item) => item.tournamentStatus == status)
}

function changeActiveTab(status: TournamentStatus) {
    activeTab.value = status
}

const activeTab = ref<TournamentStatus>(TournamentStatus.IDEAL)


function onTournamentCreate(data: TournamentRawData) {
    hostDialogVisible.value = false
    tournaments.value.push(data)
}


</script>
<template>
    <GameLayout>
        <template v-if="profileStore.profile?.isPremium">
            <h2>Host Tournaments</h2>
            <p>Are you ready to elevate your gaming experience? Dive into the world of competition and skill with our
                dynamic tournaments platform. Whether you're a seasoned pro or a casual gamer, our Tournaments Create and
                Join page is your gateway to thrilling battles, epic showdowns, and incredible prizes!</p>

            <hr />

            <div class="button-holder">

                <button @click="() => hostDialogVisible = true" class="button primary"><svg width="24" height="24"
                        fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" />
                    </svg> Host Tournament
                </button>

            </div>

            <div class="price-card">
                <h4>Wallet</h4>
                <span class="price">$100</span>
                <button class="button primary">Add money</button>
            </div>

            <div class="tabs-holder">
                <div @click="() => changeActiveTab(TournamentStatus.IDEAL)"
                    :class="activeTab == TournamentStatus.IDEAL ? 'item active' : 'item'">
                    Upcoming ({{ filterTournament(TournamentStatus.IDEAL).length }})
                </div>
                <div @click="() => changeActiveTab(TournamentStatus.UPCOMING)"
                    :class="activeTab == TournamentStatus.UPCOMING ? 'item active' : 'item'">
                    Running ({{ filterTournament(TournamentStatus.UPCOMING).length }})
                </div>
                <div @click="() => changeActiveTab(TournamentStatus.DRAFT)"
                    :class="activeTab == TournamentStatus.DRAFT ? 'item active' : 'item'">
                    Draft ({{ filterTournament(TournamentStatus.DRAFT).length }})
                </div>
                <div @click="() => changeActiveTab(TournamentStatus.FINISHED)"
                    :class="activeTab == TournamentStatus.FINISHED ? 'item active' : 'item'">
                    Finished ({{ filterTournament(TournamentStatus.FINISHED).length }})
                </div>
                <div @click="() => changeActiveTab(TournamentStatus.CANCELED)"
                    :class="activeTab == TournamentStatus.CANCELED ? 'item active' : 'item'">
                    Canceled ({{ filterTournament(TournamentStatus.CANCELED).length }})
                </div>
            </div>

            <div class="tournament-holder">
                <TournamentCreateCard v-for="item, index in filterTournament(activeTab)" :key="index" :data="item" />
            </div>
        </template>
        <div v-else></div>
    </GameLayout>

    <HostTournamentDialog v-if="hostDialogVisible" :onSave="onTournamentCreate"
        :onClose="() => hostDialogVisible = false" />
</template>
<style scoped>
.price-card {
    padding: 1em;
    background-color: white;
    border-radius: var(--border-radius);
    width: max-content;
    margin-bottom: 50px;
}

.price-card h4 {
    margin-top: 0;
}

.price-card span {
    font-size: var(--average-font);
    display: block;
    margin-bottom: 1em;
}

.button-holder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 100px;
}

.tabs-holder {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;
}

.tabs-holder .item {
    width: max-content;
    padding: 0 1em;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius);
    border: 1px solid #21005327;
    background-color: white;
    transition: all 200ms;
    cursor: pointer;
}

.tabs-holder .item.active,
.tabs-holder .item:hover {
    background-color: var(--color-secondary);
    color: white;
}


.main>button {
    margin-bottom: 40px;
}

.tournament-holder {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}





@media only screen and (max-width: 1800px) {
    .tournament-holder {
        grid-template-columns: 1fr 1fr 1fr;
    }
}


@media only screen and (max-width: 1400px) {
    .tournament-holder {
        grid-template-columns: 1fr 1fr;
    }
}

@media only screen and (max-width: 700px) {
    .tournament-holder {
        grid-template-columns: 100%;
    }
}
</style>
