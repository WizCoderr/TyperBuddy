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
                    <div class="joined-players card">
                        <h3>Joined Players · 10/100</h3>
                        <div class="chips">
                            <div class="item" v-for="item, index in namesArray" :key="index">
                                <img :src='generateAvatar(item)' />
                                {{item}}
                            </div>
                        </div>

                    </div>

                </div>
                <div class="right">
                    <h3>About this tournament</h3>
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

        </section>
        <RightPanel />
    </main>
</template>
<style scoped>
.card {
    background-color: white;
    border-radius: var(--border-radius-2);
    min-height: 200px;
    padding: 1em;
}

.card h3 {
    margin-top: 0;
}

/* joined players */

.joined-players .chips{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5em;
}

.joined-players .chips .item{
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: var(--color-surface);
    padding: 4px;
    padding-right: 1em;
    border-radius: 50px;
    font-weight: bold;
}
.joined-players .chips .item img{
    width: 40px;
    height: 40px;
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
}

.content-area .right {
    /* border-left: 1px solid var(--color-surface-dark-2); */
    min-height: 400px;
    background-color: white;

}

.content-area .right>h3 {
    margin: 0;
    display: flex;
    align-items: center;
    height: 50px;
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