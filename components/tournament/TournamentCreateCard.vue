<script setup lang='ts'>
import { navigateTo } from 'nuxt/app';


function onJoin() {
    navigateTo('tournaments/view/sdfsadf')
}
</script>
<template>
    <div class="card">
        <h4>KeyMaster Challenge</h4>
        <p>Elevate your typing skills in this thrilling tournament of speed and precision.</p>
        <div class="content">
            <p>Prizes: <b>$100</b></p>
            <p>Total seats: <b>100</b></p>
            <p>Mode: <b>Public</b></p>
            <p>Rounds: <b>7</b></p>
            <p class="full">Round Break Inv: <b>10min</b></p>
            <p class="full">Sponsorship Count: <b>7</b></p>
            <p class="full">Elimination: <b>No Elimination</b></p>
            <p class="full">Game Level: <b>Medium</b></p>
            <p class="full border"><b>12 dec, 12:30am</b> to <b>12 dec, 1:00am</b></p>
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