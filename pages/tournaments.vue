<script setup lang='ts'>
import RightPanel from '~/components/RightPanel.vue';
import TournamentCard from '~/components/tournament/TournamentCard.vue';

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

            <Button class="button primary"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75Z" />
                </svg> Host Tournament</Button>

            <div class="tournament">
                <h4>Today Tournaments</h4>
                <div class="card-holder">
                    <TournamentCard v-for="item, index in 3" :key="index" />
                </div>

            </div>

            <div class="tournament">
                <h4>Upcoming Tournaments</h4>
                <div class="card-holder">
                    <TournamentCard v-for="item, index in 4" :key="index" />
                </div>

            </div>
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
}</style>