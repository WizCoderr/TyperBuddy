<script setup lang='ts'>
import { ref, useSeoMeta } from '#imports';
import { navigateTo } from 'nuxt/app';
import { useRouter } from 'vue-router';
import RightPanel from '~/components/RightPanel.vue';
import HostTournamentDialog from '~/components/dialog/HostTournamentDialog.vue';
import TournamentCreateCard from '~/components/tournament/TournamentCreateCard.vue';

const router = useRouter()


const hostDialogVisible = ref(false)


useSeoMeta({
    title: 'Host Tournament',
})



</script>
<template>
    <main>
        <Sidebar :activeTabIndex="6" />
        <section class="main">
            <h2>Host Tournaments</h2>
            <p>Are you ready to elevate your gaming experience? Dive into the world of competition and skill with our
                dynamic tournaments platform. Whether you're a seasoned pro or a casual gamer, our Tournaments Create and
                Join page is your gateway to thrilling battles, epic showdowns, and incredible prizes!</p>

            <hr />

            <div class="button-holder">

                <Button @click="() => hostDialogVisible = true" class="button primary"><svg width="24" height="24"
                        fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" />
                    </svg> Host Tournament
                </Button>
            </div>



            <div class="tabs-holder">
                <div class="item active">
                    Upcoming (4)
                </div>
                <div class="item">
                    Running (3)
                </div>
                <div class="item">
                    Finished (0)
                </div>
                <div class="item">
                    Canceled (1)
                </div>
            </div>

            <div class="tournament-holder">
                <TournamentCreateCard v-for="item, index in 5" :key="index" />
            </div>

        </section>
        <RightPanel />
    </main>

    <HostTournamentDialog v-if="hostDialogVisible" :onClose="() => hostDialogVisible = false" />
</template>
<style scoped>
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