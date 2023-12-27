<script setup lang='ts'>
import { useSeoMeta } from '#imports';
import { navigateTo } from 'nuxt/app';
import { useRouter } from 'vue-router';
import RightPanel from '~/components/RightPanel.vue';
import MatchHistoryTable from '~/components/tournament/MatchHistoryTable.vue';
import RegisteredPlayers from '~/components/tournament/RegisteredPlayers.vue';
import { generateAvatar } from '~/lib/utils';
import  {ArrowLeftIcon} from "../../../components/icons"

const router = useRouter()

useSeoMeta({
    title: 'View Tournament',
})

function back() {
    router.back()
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

            <Button :onclick="back" class="button primary outline"> <ArrowLeftIcon style="width: 24px; height: 24px;" /> Back</Button>

            <div class="content-area">
                <div class="left">
                    <div class="reward card">
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
                        <h4>Registered Players · 10/100</h4>
                        <div class="content">
                           <RegisteredPlayers :is-editable="true"/>
                        </div>
                    </div>

                </div>
                <div class="right">
                    <div>
                        <h4>About Tournament</h4>
                        <div class="markdown">
                            <h4>Tournament rules</h4>
                            <ol>
                                <li>Ensure participants meet any age or location requirements</li>
                                <li>Specify whether the tournament is open to individuals or teams</li>
                                <li>Set a clear registration deadline</li>
                                <li>Outline the registration process, including any fees if applicable.</li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <h4>Tournament Rules</h4>
                        <div class="markdown">
                            <h4>Tournament rules</h4>
                            <ol>
                                <li>Ensure participants meet any age or location requirements</li>
                                <li>Specify whether the tournament is open to individuals or teams</li>
                                <li>Set a clear registration deadline</li>
                                <li>Outline the registration process, including any fees if applicable.</li>
                            </ol>
                        </div>
                    </div>

                </div>
            </div>

            <div class="card match-history">
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
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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