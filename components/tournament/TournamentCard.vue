<script setup lang='ts'>
import { navigateTo } from 'nuxt/app';

import {PeopleIcon, TrophyIcon, GameIcon} from "../icons"


function onJoin(){
    navigateTo('tournaments/view/sdfsadf')
}
</script>
<template>
    <div class="card">
        <div class="left">
            <div>
                <h3>KeyMaster Challenge</h3>
                <p>Elevate your typing skills in this thrilling tournament of speed and precision.</p>
            </div>
            <div class="bottom">
                <div class="item">
                   <TrophyIcon style="width: 24px; height: 24px;" />
                    <span>Prize: <b>$100</b></span>
                </div>
                <div class="item red">
                    <PeopleIcon style="width: 24px; height: 24px;" />
                    <span><b>49/100</b></span>
                </div>
                <div class="item black">
                    <GameIcon style="width: 24px; height: 24px;" />
                    <span>Rounds: <b>7</b></span>
                </div>
            </div>

        </div>
        <div class="right">
            <span class="chip">Paid</span>
            <div class="time">
                <span>Time Left</span>
                <span>00:12:10:13</span>
            </div>
            <button :onClick="onJoin">Join Now</button>
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
    border-radius: 100px var(--border-radius-2) var(--border-radius-2) 100px;
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
    font-weight: bold;
    letter-spacing: 4px;
    display: block;
}



.card .left {
    padding: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card button {
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
}</style>