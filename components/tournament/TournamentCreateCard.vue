<script setup lang='ts'>
import { ref, onMounted, onUnmounted } from '#imports';
import { TournamentRawData } from '~/lib/DataType';
import { getTimeLeft } from '~/lib/utils';
const prop = defineProps<{
    data: TournamentRawData
}>()


let timer: any = null
const timeLeft = ref("00:00:00:00")

onMounted(() => {
    setCountdown()
    timer = setInterval(setCountdown, 1000)
})

function setCountdown() {
    const time = getTimeLeft(prop.data.startDateTime)
    timeLeft.value = `${String(time[0]).padStart(2, "0")}:${String(time[1]).padStart(2, "0")}:${String(time[2]).padStart(2, "0")}:${String(time[3]).padStart(2, "0")}`
}

onUnmounted(() => {
    clearInterval(timer)
})




</script>
<template>
    <div class="card">
        <div>
            <h4>{{ data.name }}</h4>
            <p>{{ data.smallDesc.slice(0, 200) }}{{ data.smallDesc.length > 200 && "..." }}</p>
        </div>
        <div class="content">
            <p>Prizes: <b>${{ data.totalReward }}</b></p>
            <p>Total seats: <b>{{ data.seats }}</b></p>
            <p>Mode: <b>{{ data.visibility }}</b></p>
            <p>Rounds: <b>{{ data.matchRoundCount }}</b></p>
            <p class="full">Round Break Inv: <b>{{ data.roundBreakInv }}</b></p>
            <p class="full">Sponsorship Count: <b>7</b></p>
            <p class="full">Elimination: <b>No Elimination</b></p>
            <p class="full">Game Level: <b>Medium</b></p>
            <p class="full border">{{ timeLeft }}</p>
            <button class="full">View</button>
        </div>

        <!-- <div class="countdown">2:30:40:30</div> -->
    </div>
</template>
<style scoped>
h4 {
    font-size: var(--average-font);
}

.card {
    width: 100%;
    min-height: 400px;
    background-color: white;
    border-radius: var(--border-radius-3);
    box-shadow: rgba(149, 157, 165, 0.05) 0px 8px 16px;
    position: relative;
    padding: 8px 16px;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card .countdown {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background-color: var(--color-secondary);
    height: 32px;
    border-radius: var(--border-radius-3) var(--border-radius-3) 0 0;
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 3px;
    font-weight: bold;
}

.card .content {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    align-items: center;
}

.card .content .full {
    grid-column: 1 / span 2;
}

.card .content p {
    margin: 0;
    padding: 0.1em 0.5em;
    border-radius: 4px;
}

.card .content p.border {
    border: 1px solid #21005317;
    background-color: #2100530e;
    padding: 0.5em;
    text-align: center;
    margin-top: 8px;
    font-size: var(--average-font);
    font-family: 'Courier New', Courier, monospace;
}


.card button {
    margin-top: 12px;
    padding: 0.6em 1em;
    text-align: center;
    border: 1px solid #21005331;
    border-radius: 4px;
    font-size: var(--medium-font);
    background-color: transparent;
    transition: all 200ms;
}

.card button:hover {
    background-color: var(--color-primary);
    color: white;
    font-weight: bold;

}
</style>