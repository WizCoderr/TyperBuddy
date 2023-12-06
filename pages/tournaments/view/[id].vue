<script setup lang='ts'>
import { useSeoMeta } from '#imports';
import { navigateTo } from 'nuxt/app';
import { useRouter } from 'vue-router';
import RightPanel from '~/components/RightPanel.vue';
import { generateAvatar } from '~/lib/utils';

const router = useRouter()

useSeoMeta({
    title: 'View Tournament',
})

function back() {
    router.back()
}


const namesArray = [
    'Emma Johnson',
    'Alexander Martinez',
    'Olivia Wang',
    'Ethan Reynolds',
    'Sophia Mitchell',
    'Liam Patel',
    'Ava Rodriguez',
    'Noah Taylor',
    'Isabella Nguyen',
    'Lucas Thompson'
];


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

            <Button :onclick="back" class="button primary outline"><svg width="24" height="24" fill="none"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.733 19.79a.75.75 0 0 0 1.034-1.086L5.516 12.75H20.25a.75.75 0 0 0 0-1.5H5.516l6.251-5.955a.75.75 0 0 0-1.034-1.086l-7.42 7.067a.995.995 0 0 0-.3.58.754.754 0 0 0 .001.289.995.995 0 0 0 .3.579l7.419 7.067Z" />
                </svg> Back</Button>

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
                            <div class="chips">
                                <div class="item" v-for="item, index in namesArray" :key="index">
                                    <img :src='generateAvatar(item)' />
                                    {{ item }}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="right">
                    <h4>About this tournament</h4>
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

            <div class="card match-history">
                <h4>Match History</h4>
                <div class="content">
                    <table>
                        <colgroup>
                            <col style="width: 40px;">
                            <col style="width: auto;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Rank</th>
                                <th>R1</th>
                                <th>R2</th>
                                <th>R3</th>
                                <th>R4</th>
                                <th>R5</th>
                                <th>R6</th>
                                <th>R7</th>
                                <th>R8</th>
                                <th>R9</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item, index in 5">
                                <td class="profile">
                                    <div><img :src='generateAvatar("Nitesh Kumar")'></div>
                                </td>
                                <td>
                                    <NuxtLink :to="'/'">{{ "Nitesh Kumar" }}</NuxtLink>
                                </td>
                                <td>{{ index + 1 }}</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>

                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </section>
        <RightPanel />
    </main>
</template>
<style scoped>

/* reward */

.rewards-container{
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}

.rewards-container .item{
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

.rewards-container .layer{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-secondary);
    padding: 3px 16px;
    font-size: var(--small-font);
    color: white;
    border-radius: 0 0  10px 10px;
    font-weight: bold;
}

.rewards-container .icon{
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    margin-top: 24px;
}

.rewards-container .amount{
    font-size: 24px;
    background-color: var(--color-surface);
    padding: 0.2em 0.8em;
    border-radius: 50px;
}




/* match history */

table {
    width: 100%;
    border-collapse: collapse;
}

table th {
    text-align: left;
    padding: 6px 1em;
}

table td {
    /* background-color: red; */
    padding: 6px 1em;
}


table .profile {
    padding: 6px 0;
}

table .profile div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 50%;
}


table tbody tr:nth-child(odd) {
    background-color: var(--color-surface);
}

/* table tbody tr:hover {
    background-color: var(--color-primary);
    color: white !important;
    font-weight: bold;
}

table tbody tr:hover a {
    color: white !important;
} */

table img {
    height: 36px;
    width: 36px;
    border-radius: 50%;
}

.text-arrow {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.text-arrow svg {
    width: 20px;
    height: 20px;
    fill: #25a18e;
}

.text-arrow svg.down {
    transform: rotateZ(180deg);
    fill: #ef2d56;
}







/* card */
.card {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: white;
    border-radius: var(--border-radius-2);
    min-height: 200px;
    margin-bottom: 24px;
}

.card .content{
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

/* joined players */

.joined-players .chips {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5em;
}

.joined-players .chips .item {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: var(--color-surface);
    padding: 4px;
    padding-right: 1em;
    border-radius: 50px;
    font-weight: bold;
}

.joined-players .chips .item img {
    width: 36px;
    height: 36px;
    border-radius: 50px;
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

.content-area .right {
    /* border-left: 1px solid var(--color-surface-dark-2); */
    min-height: 400px;
    height: max-content;
    background-color: white;

}

.content-area .right>h4 {
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