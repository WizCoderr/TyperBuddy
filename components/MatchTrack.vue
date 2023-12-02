<script setup lang='ts'>
import { PlayerData } from '~/lib/DataType';
import KickPlayerDialog from './dialog/KickPlayerDialog.vue';
import { ref } from 'vue';

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
                <col style="width: 12rem;">
                <col style="width: auto;">
                <col v-if="isAdmin" style="width: 4rem;">
            </colgroup>
            <tbody>
                <tr :class="{ 'blink': player.isInMatch == false }" v-for="player, index in players" :key="index">

                    <td>
                        <div class="profile">
                            <img v-if="player.profileImage == ''" src="../public/extra/no_image.png" :alt="player.name">
                            <img v-else :src="player.profileImage" :alt="player.name">
                            <span>{{ player.name }}</span>
                        </div>
                    </td>
                    <td>
                        <div class="track">
                            <svg :style="{ left: getProgress(player.score.cursorPos), fill: getColor(index) }" fill="none"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.997 5.998a6.14 6.14 0 0 1 5.8 4.125l.075.233.044.145h2.33a2.749 2.749 0 0 1 2.744 2.581l.005.168v1a1.75 1.75 0 0 1-1.606 1.742l-.143.006H18.62l.241.584a1.75 1.75 0 0 1-.813 2.22l-.137.064a1.752 1.752 0 0 1-.496.123l-.171.009h-1.787a1.75 1.75 0 0 1-1.51-.867l-.072-.138-.539-1.142.054-.007c-1.4.186-2.817.208-4.221.066l-.497-.057-.535 1.136a1.75 1.75 0 0 1-1.583 1.005H4.75a1.749 1.749 0 0 1-1.618-2.415l.433-1.05a3.242 3.242 0 0 1-1.57-2.78.75.75 0 0 1 .648-.743L2.745 12h1.88l.497-1.642a6.137 6.137 0 0 1 5.875-4.36Zm6.777 9.693c-.771.31-1.559.565-2.356.765l-.549.129.362.77a.25.25 0 0 0 .117.118l.053.019.056.006h1.787a.25.25 0 0 0 .248-.28l-.017-.065-.478-1.155h-.043l.411-.148.409-.159Zm-13.552 0 .39.152.388.141-.482 1.165a.25.25 0 0 0 .232.345h1.804l.057-.006a.25.25 0 0 0 .17-.137l.359-.763.044.01a18.159 18.159 0 0 1-2.962-.907Zm-.202-1.695.151-.499-.507.001.025.053c.086.166.198.316.33.445ZM17.37 12l.756 2.498 2.12.001a.25.25 0 0 0 .243-.193l.007-.057v-1a1.25 1.25 0 0 0-1.122-1.242l-.128-.006L17.37 12Z" />
                            </svg>
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
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                                </svg>
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
    max-width: 1200px;
    width: 100%;

}

h2 {
    text-align: center;
    color: var(--color-secondary);
}


table {
    width: 100%;
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
    width: 36px;
    display: block;
}

table .track {
    position: relative;
    height: 50px;
    margin: 0 2rem;
}

table .blink {
    animation-name: blinkAnim;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
}

table .track svg {
    fill: var(--color-primary);
    width: 45px;
    position: absolute;
    top: 50%;
    z-index: 1;
    translate: -50% -50%;
    left: 0%;
    transition: all 100ms;
}

table .status {
    width: 360px;
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
    font-size: var(--very-small-font);
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