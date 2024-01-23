<script setup lang='ts'>
import { onMounted, ref, useSeoMeta } from '#imports';
import { navigateTo } from 'nuxt/app';
import { useRoute } from 'vue-router';
import RightPanel from '~/components/RightPanel.vue';
import TournamentCard from '~/components/tournament/TournamentCard.vue';
import { AddIcon } from "../../components/icons"
import ApiTournament from '~/lib/api/ApiTournament';
import { useProfileStore } from '~/store/profile';
import { watch } from 'fs';
import { TournamentData } from '~/lib/DataType';
import { useToast } from 'vue-toast-notification';

useSeoMeta({
    title: 'Tournaments',
})

const $toast = useToast();

const profileStore = useProfileStore()

function hostTournament() {
    if(!profileStore.profile?.isPremium) return
    navigateTo('/tournaments/host')
}


profileStore.$subscribe((mutation, state) => {
    if (state.profile) loadTournaments(state.profile.id)
    else loadTournaments("")
})

onMounted(() => {

    if (profileStore.isLoaded) {
        if (profileStore.profile) loadTournaments(profileStore.profile.id)
        else loadTournaments("")
    }

})



const tournaments = ref(Array<TournamentData>())

async function loadTournaments(playerId: string) {
    const res = await ApiTournament.getTournaments(playerId);
    if (res.data) {
        tournaments.value = res.data
    } else {
        $toast.error(res.error!!.message)
    }
}

</script>
<template>
    <main>
        <Sidebar :activeTabIndex="6" />
        <section class="main">
            <h2>Tournaments</h2>
            <p>Are you ready to elevate your gaming experience? Dive into the world of competition and skill with our
                dynamic tournaments platform. Whether you're a seasoned pro or a casual gamer, our Tournaments Create and
                Join page is your gateway to thrilling battles, epic showdowns, and incredible prizes!</p>

            <hr />

            <button @click="hostTournament"
                :class="profileStore.profile?.isPremium ? 'button primary' : 'button primary disabled'">
                <AddIcon style="width: 24px; height: 24px;" /> Host Tournament
            </button>

            <div class="tournament">
                <h4>Today Tournaments</h4>
                <div class="card-holder">
                    <TournamentCard v-for="item, index in tournaments" :key="index" :data="item" />
                </div>

            </div>

            <!-- <div class="tournament">
                <h4>Upcoming Tournaments</h4>
                <div class="card-holder">
                    <TournamentCard v-for="item, index in 4" :key="index" />
                </div>

            </div> -->
        </section>
        <RightPanel />
    </main>
</template>
<style scoped>
.main>button {
    margin-left: auto;
    margin-bottom: 40px;
}

.card-holder {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 100px;
}


@media only screen and (max-width: 1600px) {
    .card-holder {
        grid-template-columns: 100%;
    }
}
</style>