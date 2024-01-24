<script setup lang='ts'>
import { PlayerData } from '~/lib/DataType';
import KickPlayerDialog from './dialog/KickPlayerDialog.vue';
import { ref } from 'vue';
import { DeleteIcon, TurtleIcon } from './icons';

const prop = defineProps<{
    players: Array<PlayerData>,
    totalChars: number,
    message: string
    isAdmin: boolean
}>()


const emit = defineEmits<{
    (event: 'kick', playerId: string): void
}>()


const ranks = ["_", "1st", "2nd", "3rd", "4th", "5th", '6th', '7th', '8th', '9th', '10th', '11th', '12th']
function getRank(rank: number) {
    if (rank > 5 || rank < 0) {
        return ranks[0]
    }


    return ranks[rank]
}

function getProgress(pos: number) {

    let progress = Math.round(pos / prop.totalChars * 100)
    if (progress > 100) progress = 100
    return progress + "%"
}


const colors = [210, 40, 150, 230, 281, 310, 350]
function getColor(index: number) {
    if (index >= colors.length) {
        index = colors.length - 1
    }
    return `hsl(${colors[index]}, 61%, 55%)`
}





const isKickDialogOpen = ref(false)
const kickPlayerName = ref("Unknown")
let kickPlayerId = ""


function openKickDialog(playerId: string, playerName: string) {
    kickPlayerName.value = playerName
    kickPlayerId = playerId
    isKickDialogOpen.value = true
}

function closeKickDialog() {
    isKickDialogOpen.value = false
    kickPlayerId = ""
}


function onKick() {
    if (kickPlayerId == "") return
    emit('kick', kickPlayerId)
    isKickDialogOpen.value = false
}




</script>
<template>
    <section>
        <h2>{{ message }}</h2>
        <table>
            <colgroup>
                <col style="width: 10rem;">
                <col style="width: auto;">
                <col v-if="isAdmin" style="width: 4rem;">
            </colgroup>
            <tbody>
                <tr :class="{ 'blink': player.isInMatch == false }" v-for="player, index in players" :key="index">

                    <td>
                        <div class="profile">
                            <img v-if="player.profileImage == ''" src="../public/extra/no_image.png" :alt="player.name">
                            <img v-else :src="player.profileImage" :alt="player.name">
                            <span class="name">{{ player.name }}</span>
                        </div>
                    </td>
                    <td>
                        <div class="track">
                            <TurtleIcon :style="{ left: getProgress(player.score.cursorPos), fill: getColor(index) }" />
                            <div class="status">
                                <span>Rank: <b>{{ getRank(player.score.rank) }}</b></span>
                                <span>Progress: <b>{{ getProgress(player.score.cursorPos) }}</b></span>
                                <span>Speed: <b>{{ Math.round(player.score.speed) }} wpm</b></span>
                                <span>Errors: <b>{{ player.score.errors }}</b></span>
                            </div>
                        </div>
                    </td>

                    <td v-if="isAdmin">
                        <div class="kick-button">
                            <button v-if="!player.isAdmin" @click="openKickDialog(player.playerId, player.name)">
                                <DeleteIcon style="width: 24px; height: 24px;" />
                            </button>
                        </div>
                    </td>
                </tr>

                <tr v-for="player, index in Math.abs(5 - players.length)" :key="index">

                    <td>
                        <div class="profile">
                        </div>
                    </td>
                    <td>
                        <div class="track">
                        </div>
                    </td>
                    <td v-if="isAdmin">
                        <div></div>
                    </td>
                </tr>
            </tbody>
        </table>

    </section>

    <KickPlayerDialog v-if="isKickDialogOpen" :onClose="closeKickDialog" :onOk="onKick" :playerName="kickPlayerName" />
</template>
<style scoped>
section {
    margin: auto;
    margin-bottom: 2rem;
    max-width: 800px;
    width: 100%;

}

.name {
    font-size: var(--small-font);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

h2 {
    text-align: center;
    color: var(--color-secondary);
}


table {
    width: 100%;
}

table td {
    padding: 0;
}

table tr {
    width: 100%;
    background-color: white;
}

table .profile {
    display: flex;
    align-items: center;
    gap: 0.6em;
    font-size: var(--medium-font);
    font-weight: 600;
}

table img {
    border-radius: 50%;
    margin-left: 3px;
    width: 32px !important;
    height: 32px !important;
    display: block;
}

table .track {
    position: relative;
    height: 2.5em;
    margin: 0 2rem;
}

table .blink {
    animation-name: blinkAnim;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
}

table .track svg {
    fill: var(--color-primary);
    width: 32px;
    position: absolute;
    top: 50%;
    z-index: 1;
    translate: -50% -50%;
    left: 0%;
    transition: all 100ms;
}

table .status {
    width: 320px;
    justify-content: space-between;
    backdrop-filter: blur(4px);
    position: absolute;
    display: flex;
    gap: 1rem;
    bottom: 0;
    right: -2rem;
    z-index: 2;
    background-color: rgba(6, 0, 95, 0.1);
    padding: 0.4em 1em;
    font-size: 10px;
}


.kick-button {
    display: flex;
    justify-content: center;
    align-items: center;
}

.kick-button button {
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.kick-button button:hover {
    transform: scale(1.1, 1.1);
}

.kick-button svg {
    fill: var(--color-error);
}






@keyframes blinkAnim {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }

    100% {
        opacity: 1;
    }
}



@media only screen and (max-width: 1300px) {
    table .track {
        height: 40px;
    }

    table .track svg {
        fill: var(--color-primary);
        width: 40px;
        position: absolute;
        top: 50%;
        z-index: 1;
        translate: -50% -50%;
        left: 0%;
    }
}
</style>