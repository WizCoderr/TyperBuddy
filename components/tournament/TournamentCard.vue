<script setup lang='ts'>
import { navigateTo } from 'nuxt/app';
import { PeopleIcon, TrophyIcon, GameIcon } from "../icons"
import type { TournamentData } from '~/lib/DataType';
import { onMounted, onUnmounted, ref } from '#imports';
import { getTimeLeft } from '~/lib/utils';
const prop = defineProps<{
    data: TournamentData
}>()


let timer: any = null
const timeLeft = ref("00:00:00:00")

onMounted(() => {

    if (prop.data) {
        timer = setInterval(() => {
            const time = getTimeLeft(prop.data.startDateTime)
            timeLeft.value = `${String(time[0]).padStart(2, "0")}:${String(time[1]).padStart(2, "0")}:${String(time[2]).padStart(2, "0")}:${String(time[3]).padStart(2, "0")}`
        }, 1000)
    }
})

onUnmounted(() => {
    clearInterval(timer)
})

</script>
<template>
    <div class="card">
        <div class="left">
            <div>
                <h3>{{ data.name }}</h3>
                <p>{{ data.smallDesc.slice(0, 200) }}{{ data.smallDesc.length > 200 && "..." }}</p>
            </div>
            <div class="bottom">
                <div class="item">
                    <TrophyIcon style="width: 24px; height: 24px;" />
                    <span>Prize: <b>₹{{ data.totalReward }}</b></span>
                </div>
                <div class="item red">
                    <PeopleIcon style="width: 24px; height: 24px;" />
                    <span><b>{{ data.joinedPlayers }}/{{ data.seats }}</b></span>
                </div>
                <div class="item black">
                    <GameIcon style="width: 24px; height: 24px;" />
                    <span>Rounds: <b>{{ data.matchRoundCount }}</b></span>
                </div>
            </div>

        </div>
        <div class="right">
            <span class="chip">{{ data.entryFee ? "Paid" : "Free" }}</span>
            <div class="time">
                <span>Time Left</span>
                <span>{{ timeLeft }}</span>
            </div>
            <NuxtLink :to="'/tournaments/view/' + data.id">
                <button>{{ data.isJoined ? "View" : "Join Now" }}</button>
            </NuxtLink>
        </div>
    </div>
</template>
<style scoped>
.card {
    border-radius: var(--border-radius-2);
    background-color: white;
    min-height: 180px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 220px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.card .bottom {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}


.card .bottom .item {
    color: var(--color-primary);
    display: flex;
    gap: 4px;
    align-items: center;
    margin-right: 12px;
}

.card .bottom .item.red {
    color: #f72585;
}

.card .bottom .item.red svg {
    fill: #f72585;
}

.card .bottom .item.black {
    color: var(--color-on-surface);
}

.card .bottom .item.black svg {
    fill: var(--color-on-surface)
}

.card .item svg {
    fill: var(--color-primary);
}




.card h3 {
    margin-top: 0;
    margin-bottom: 0.5em;
}


.card .right {
    height: 100%;
    border-radius: 300px var(--border-radius-2) var(--border-radius-2) 300px;
    background-color: #3d5a80;
    padding-top: 50px;
    padding-bottom: 12px;
    padding-left: 50px;
    padding-right: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

.card .right .chip {
    position: absolute;
    background-color: white;
    border-radius: 40px;
    padding: 0.2em 0.7em;
    top: 12px;
    right: 12px;
    font-size: var(--small-font);
    font-weight: bold;
}

.card .right .time {
    color: white;
    display: grid;
    justify-content: center;

}

.card .right .time span:last-child {
    font-size: var(--big-font);
    margin-top: 0.2em;
    letter-spacing: 0px;
    display: block;
    font-family: 'Courier New', Courier, monospace;
}



.card .left {
    padding: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.card a {
    display: block;
}

.card button {
    width: 100%;
    border: none;
    font-size: var(--medium-font);
    background-color: white;
    border-radius: 50px;
    padding: 0.5em 1em;
    margin-bottom: 12px;
    transition: all 200ms;
}

.card button:hover {
    opacity: 0.8;
}
</style>