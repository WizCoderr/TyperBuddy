<script setup lang='ts'>
import { all } from "axios";
import { readlinkSync } from "fs";
import { Socket, io } from "socket.io-client";
import { PlayerData } from '~/lib/DataType'
import { useProfileStore } from "~/store/profile";

const profileStore = useProfileStore()
const serverUrl = import.meta.env.VITE_SERVER_URL

const typingContent = ref("loading...")
const names = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "David Davis",
    "Emma Wilson",
    "Frank White",
    "Grace Lee",
    "Hannah Miller",
    "Isaac Harris",
    "Jack Turner",
    "Katherine Martin",
    "Liam Anderson",
    "Mia Garcia",
    "Noah Walker",
    "Olivia Perez",
    "Peter Clark",
    "Quinn King",
    "Rachel Scott",
    "Sophia Hill",
    "Thomas Baker"
];


const profileData = {
    name: "Unknown",
    profileImage: "",
    accountId: ""
}






let socket: Socket | null = null
const messageText = ref("")
const isInCurrentMatch = ref(false)
const isWriteAllowed = ref(false)

const allPlayers = ref(Array<PlayerData>())


// const playerName = names[Math.round(Math.random() * (names.length - 1))]

onMounted(setup)

function setup() {

    // call until profile loaded
    if(!profileStore.isLoaded){
        setTimeout(setup, 500)
        return
    }

    if(profileStore.profile != null){
        profileData.accountId = profileStore.profile.id
        profileData.profileImage = profileStore.profile.profileImage
        profileData.name = profileStore.profile.name
    }

    socket = io(serverUrl)
    socket.on('connect', onConnect)

}


function onConnect() {
    allPlayers.value = []
    console.log("Connection established")

    socket!!.on("isInMatch", onIsInMatch)
    socket!!.on("roomState", onRoomStateChange)
    socket!!.on("existingData", onExistingData)
    socket!!.on("scoreChange", onScoreChange)
    socket!!.on("onPlayerJoin", onPlayerJoin)
    socket!!.on("onPlayerLeft", onPlayerLeft)
    socket!!.on("onTypingContentChange", onTypingContentChange)
    socket!!.on("onMessage", onMessage)
    socket!!.on("heartbeat", onHeartbeat)


    socket!!.emit('joinRoom', { name: profileData.name, accountId: profileData.accountId, profileImage: profileData.profileImage });

}


function onHeartbeat(){
    socket!!.emit("heartbeatResponse")
}

function onScoreUpdate(data: {
    cursorPos: number;
    speed: number;
    highestSpeed: number;
    errors: number;
}) {

    if (socket != null) {
        socket.emit("updateScore", {
            playerId: socket.id,
            cursorPos: data.cursorPos,
            speed: data.speed,
            highestSpeed: data.highestSpeed,
            errors: data.errors
        })
    }

}

function calculateRank() {

    let ranks = allPlayers.value.map((value) => {
        return {
            playerId: value.playerId,
            cursorPos: value.score.cursorPos
        }
    })

    // sort the dict in descending order
    ranks.sort((a, b) => {
        return b.cursorPos - a.cursorPos
    })

    // assign rank
    for (let index = 0; index < ranks.length; index++) {

        // find the ranked player index
        const playerIndex = allPlayers.value.findIndex((value) => {
            if (value.playerId == ranks[index].playerId) return true
        })

        if (playerIndex != -1) {

            // show _ for not started players
            if (ranks[index].cursorPos == 0) {
                allPlayers.value[playerIndex].score.rank = 0
            } else {
                allPlayers.value[playerIndex].score.rank = index + 1
            }

        }

    }




}


function onScoreChange(data: {
    playerId: string,
    cursorPos: number,
    speed: number,
    highestSpeed: number,
    errors: number
}) {

    for (let index = 0; index < allPlayers.value.length; index++) {
        const player = allPlayers.value[index];
        if (player.playerId == data.playerId) {
            const score = {
                cursorPos: data.cursorPos,
                speed: data.speed,
                errors: data.errors,
                rank: 0
            }

            allPlayers.value[index].score = score
            break
        }

    }

    calculateRank()

}

function onExistingData(previousData: Array<{ name: string, playerId: string, profileImage: string }>) {

    for (const player of previousData) {
        allPlayers.value.push({
            playerId: player.playerId,
            name: player.name,
            profileImage: player.profileImage,
            score: {
                cursorPos: 0,
                speed: 0,
                errors: 0,
                rank: 0
            }
        })
    }

}

function onPlayerJoin(playerData: { name: string, playerId: string, profileImage: string }) {

    // adding the current player
    allPlayers.value.push({
        playerId: playerData.playerId,
        name: playerData.name,
        profileImage: playerData.profileImage,
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
    if (state == "running" && isInCurrentMatch.value == true) {
        isWriteAllowed.value = true
    } else {
        isWriteAllowed.value = false
    }
}


function onTypingCompleted() {
    isWriteAllowed.value = false
}




</script>
<template>
    <main>
        <Sidebar :activeTabIndex="3" />
        <section class="main">
            <h2>Multiplayer</h2>
            <p>Compete against other players in this online multiplayer game. The faster you type, the faster your car goes.
                Type as fast as you can to win the race!</p>
            <MatchTrack :players="allPlayers" :totalChars="typingContent.length" :message="messageText" />
            <TypingArea :sentence="typingContent" :onTypingCompleted="onTypingCompleted" :onTyping="onScoreUpdate"
                :is-edit-allowed="isWriteAllowed" />
            {{ isInCurrentMatch }}
        </section>
    </main>
</template>
<style scoped></style>