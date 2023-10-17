<script setup lang='ts'>
import { Socket, io } from "socket.io-client";
import { PlayerData, TypingReport } from '~/lib/DataType'
import { useProfileStore } from "~/store/profile";
import { getSimpleData } from "~/lib/LocalStorageManager"
import ApiStatistics from "~/lib/api/ApiStatistics";
const route = useRoute()


const profileStore = useProfileStore()
const serverUrl = import.meta.env.VITE_SERVER_URL
const typingContent = ref("loading...")
const isKicked = ref(false)

const profileData = {
    name: "Unknown",
    profileImage: "",
    accountId: ""
}

let roomCode = ""


let socket: Socket | null = null
const messageText = ref("")
const isInCurrentMatch = ref(false)
const isWriteAllowed = ref(false)

const allPlayers = ref(Array<PlayerData>())


// const playerName = names[Math.round(Math.random() * (names.length - 1))]

onMounted(setup)


onUnmounted(function () {
    if (socket) {
        socket.disconnect()
        socket = null
    }
})

function setup() {
    isKicked.value = false

    // call until profile loaded
    if (!profileStore.isLoaded) {

        setTimeout(setup, 500)
        return
    }

    if (profileStore.profile == null) {
        alert("You need to sign up to play with friends")
        return
    }

    // player are not joining to other room, so create a new room for him
    if (route.query.room == undefined || route.query.room == "") {
        roomCode = profileStore.profile.roomCode
    } else {
        roomCode = route.query.room as string
    }

    if (profileStore.profile != null) {
        profileData.accountId = profileStore.profile.id
        profileData.profileImage = profileStore.profile.profileImage
        profileData.name = profileStore.profile.name
    }

    allPlayers.value = []

    socket = io(serverUrl + '/private')
    socket.on('connect', onConnect)
}





function onKick(message: string) {
    isKicked.value = true

}

function onConnect() {
    allPlayers.value = []
    console.log("Connection established")

    socket!!.on("isInMatch", onIsInMatch)
    socket!!.on("roomState", onRoomStateChange)
    socket!!.on("existingData", onExistingData)
    socket!!.on("scoreChange", onScoreChange)
    socket!!.on("cursorChange", onCursorChange)
    socket!!.on("rankChange", onRankChange)
    socket!!.on("onPlayerJoin", onPlayerJoin)
    socket!!.on("onPlayerLeft", onPlayerLeft)
    socket!!.on("onTypingContentChange", onTypingContentChange)
    socket!!.on("onMessage", onMessage)
    socket!!.on("kick", onKick)
    socket!!.emit('joinRoom', { name: profileData.name, accountId: profileData.accountId, profileImage: profileData.profileImage, multiplayerId: getSimpleData("multiplayerId")!!, roomCode: roomCode });

}




function onRankChange(ranks: Array<{ playerId: string, rank: number }>) {

    ranks.forEach(element => {
        const index = allPlayers.value.findIndex((value) => {
            if (value.playerId == element.playerId) {
                return true
            }
        })

        if (index != -1) {
            allPlayers.value[index].score.rank = element.rank
        }

    });
}

function onScoreChange(scores: Array<{
    playerId: string,
    speed: number,
    highestSpeed: number,
    errors: number
}>) {

    for (const score of scores) {

        for (let index = 0; index < allPlayers.value.length; index++) {
            const player = allPlayers.value[index];

            if (player.playerId == score.playerId) {
                const newScore = {
                    cursorPos: allPlayers.value[index].score.cursorPos,
                    speed: score.speed,
                    errors: score.errors,
                    rank: allPlayers.value[index].score.rank
                }

                allPlayers.value[index].score = newScore
                break
            }
        }
    }
}

function onCursorChange(cursors: Array<{
    playerId: string,
    cursorPos: number
}>) {

    for (const cursor of cursors) {
        for (let index = 0; index < allPlayers.value.length; index++) {
            const player = allPlayers.value[index];
            if (player.playerId == cursor.playerId) {

                allPlayers.value[index].score.cursorPos = cursor.cursorPos
                break
            }
        }
    }

}

function onExistingData(previousData: Array<{ name: string, playerId: string, profileImage: string, isInMatch: boolean }>) {

    for (const player of previousData) {
        allPlayers.value.push({
            playerId: player.playerId,
            name: player.name,
            profileImage: player.profileImage,
            isInMatch: player.isInMatch,
            score: {
                cursorPos: 0,
                speed: 0,
                errors: 0,
                rank: 0
            }
        })
    }

}

function onPlayerJoin(playerData: { name: string, playerId: string, profileImage: string, isInMatch: boolean }) {

    // adding the current player
    allPlayers.value.push({
        playerId: playerData.playerId,
        name: playerData.name,
        profileImage: playerData.profileImage,
        isInMatch: playerData.isInMatch,
        score: {
            cursorPos: 0,
            speed: 0,
            errors: 0,
            rank: 0
        }
    })
}


function onPlayerLeft(playerData: { playerId: string }) {
    console.log(playerData)
    allPlayers.value = allPlayers.value.filter((value) => {
        if (playerData.playerId != value.playerId) {
            return value
        }
    })
}


function onMessage(message: string) {
    messageText.value = message
}


function onTypingContentChange(content: string) {
    typingContent.value = content
}


function onIsInMatch(isInMatch: boolean) {
    isInCurrentMatch.value = isInMatch
}

function onRoomStateChange(state: string) {

    // reset players score to zero
    if (state == "start") {
        for (let index = 0; index < allPlayers.value.length; index++) {
            allPlayers.value[index].score.cursorPos = 0
        }

    } else if (state == "finished") {
        for (let index = 0; index < allPlayers.value.length; index++) {
            allPlayers.value[index].isInMatch = true
        }
    }
    else if (state == "running" && isInCurrentMatch.value == true) {
        isWriteAllowed.value = true
        return
    }

    isWriteAllowed.value = false
}


async function onTypingCompleted(reportData: TypingReport) {

    isWriteAllowed.value = false
    // sending report to server if user is signed in
    if (profileStore.profile != null) {
        console.log(await ApiStatistics.addStatistics(reportData))
    }
}




function onTyping(pos: number) {
    if (socket != null) {
        socket.emit("updateCursor", {
            playerId: socket.id,
            cursorPos: pos
        })
    }
}

function onScoreUpdate(report: TypingReport) {

    if (socket != null) {
        socket.emit("updateScore", {
            playerId: socket.id,
            speed: report.averageWPM,
            highestSpeed: report.highestWPM,
            errors: report.totalError
        })
    }

}




function copyLink() {
    // Copy the text inside the text field
    const link = window.location.href + "?room=" + profileStore.profile!!.roomCode
    navigator.clipboard.writeText(link);

    // Alert the copied text
    alert("Link copied to clipboard: " + link);
}




</script>
<template>
    <main>
        <Sidebar :activeTabIndex="3" />
        <section class="main">
            <h2>Play with Friends</h2>
            <p>Compete against your friends in this online multiplayer game. The faster you type, the faster your car goes.
                Type as fast as you can to win the race!</p>


            <template v-if="isKicked == false">
                <MatchTrack :players="allPlayers" :totalChars="typingContent.length" :message="messageText" />
                <TypingArea :sentence="typingContent" :onTypingCompleted="onTypingCompleted" :onTyping="onTyping"
                    :is-edit-allowed="isWriteAllowed" :forgive-error="false" :multiplayer="true" :message="'Please wait'"
                    :onSubmitTypingReport="onScoreUpdate" />
            </template>

            <div v-else class="kick">
                <div class="content">
                    <img src="../public/images/kick.png" alt="kick">
                    <h2>Oops!<br>You were kicked out</h2>
                    <button @click="setup" class="button primary">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 4.5a7.5 7.5 0 1 0 7.419 6.392c-.067-.454.265-.892.724-.892.37 0 .696.256.752.623A9 9 0 1 1 18 5.292V4.25a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1 0-1.5h1.35a7.474 7.474 0 0 0-5.1-2Z" />
                        </svg>
                        Rejoin</button>
                </div>
            </div>
            <button @click="copyLink">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17 2.498a3.502 3.502 0 1 1-2.597 5.851l-4.558 2.604a3.5 3.5 0 0 1 0 2.093l4.557 2.606a3.502 3.502 0 1 1-.745 1.302L9.1 14.347a3.502 3.502 0 1 1 0-4.698l4.557-2.604A3.502 3.502 0 0 1 17 2.498Zm0 13.5a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Zm-10.498-6a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Zm10.498-6a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Z" />
                </svg>
                Share Link</button>
        </section>


    </main>
</template>
<style scoped>
section>button {
    margin: 3rem 0;
    padding: 0.8rem 1.5rem;
    border: none;
    background-color: var(--color-primary);
    border-radius: var(--border-radius);
    font-size: var(--medium-font);
    color: var(--color-on-primary);
    transition: all 200ms;
    box-shadow: 0 2px 4px #148aff4d;
    display: flex;
    align-items: center;
    gap: 1rem;
}

section>button svg {
    fill: white;
}

section>button:hover {
    background-color: var(--color-primary-variant);
    translate: 0 -4px;
    box-shadow: 0 4px 8px #148aff4d;
}
</style>