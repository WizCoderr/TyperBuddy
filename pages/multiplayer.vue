<script setup lang='ts'>
import { Socket, io } from "socket.io-client";
import { PlayerData, SocketMessageType, TypingReport } from '~/lib/DataType'
import { useProfileStore } from "~/store/profile";
import { getSimpleData } from "~/lib/LocalStorageManager"
import ApiStatistics from "~/lib/api/ApiStatistics";


const profileStore = useProfileStore()
const serverUrl = import.meta.env.VITE_SERVER_URL
const typingContent = ref("loading...")
const isKicked = ref(false)
const kickMsg = ref("")

const profileData = {
    name: "Unknown",
    profileImage: "",
    accountId: ""
}

let roomCode = ''
let socket: Socket | null = null
const messageText = ref("")
const isInCurrentMatch = ref(false)
const isWriteAllowed = ref(false)

const allPlayers = ref(Array<PlayerData>())


// const playerName = names[Math.round(Math.random() * (names.length - 1))]

onMounted(setup)


onUnmounted(function(){
    if(socket){
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

    if (profileStore.profile != null) {
        profileData.accountId = profileStore.profile.id
        profileData.profileImage = profileStore.profile.profileImage
        profileData.name = profileStore.profile.name
    }

    allPlayers.value = []

    socket = io(serverUrl + '/public')
    socket.on('connect', onConnect)
}



function onConnect() {
    allPlayers.value = []
    console.log("Connection established")

    socket!!.on("isInMatch", onIsInMatch)
    socket!!.on("roomState", onRoomStateChange)
    socket!!.on("existingData", onExistingData)
    socket!!.on("scoreChange", onScoreChange)
    socket!!.on("rankChange", onRankChange)
    socket!!.on("onPlayerJoin", onPlayerJoin)
    socket!!.on("onPlayerLeft", onPlayerLeft)
    socket!!.on("onTypingContentChange", onTypingContentChange)
    socket!!.on("onMessage", onMessage)
    socket!!.on("onGameMessage", onGameMessage)
 
    socket!!.emit('joinRoom', { name: profileData.name, accountId: profileData.accountId, profileImage: profileData.profileImage, multiplayerId: getSimpleData("multiplayerId")!!, roomCode: "" });

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




let playerAvgWPM = 0
let playerHighestWPM = 0
function onScoreChange(scores: Array<{
    playerId: string,
    speed: number,
    highestSpeed: number,
    errors: number,
    cursorPos: number
}>) {


    for (const score of scores) {

        for (let index = 0; index < allPlayers.value.length; index++) {
            const player = allPlayers.value[index];

            if (player.playerId == score.playerId) {
                const newScore = {
                    cursorPos: score.cursorPos,
                    speed: score.speed,
                    errors: score.errors,
                    rank: allPlayers.value[index].score.rank
                }

                allPlayers.value[index].score = newScore
                break
            }


            // find the current player
            if(player.playerId == socket!!.id){
                playerAvgWPM = score.speed
                playerHighestWPM = score.highestSpeed
            }
        }
    }
}


function onExistingData(previousData: Array<{ name: string, playerId: string, profileImage: string, isInMatch: boolean, roomCode: string }>) {

    for (const player of previousData) {
        allPlayers.value.push({
            playerId: player.playerId,
            name: player.name,
            profileImage: player.profileImage,
            isInMatch: player.isInMatch,
            isAdmin: false,
            score: {
                cursorPos: 0,
                speed: 0,
                errors: 0,
                rank: 0
            }
        })

        roomCode = player.roomCode
    }

}

function onPlayerJoin(playerData: { name: string, playerId: string, profileImage: string, isInMatch: boolean, roomCode: string }) {
    
    // adding the current player
    allPlayers.value.push({
        playerId: playerData.playerId,
        name: playerData.name,
        profileImage: playerData.profileImage,
        isInMatch: playerData.isInMatch,
        isAdmin: false,
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


function onGameMessage(message: string) {
    messageText.value = message
}

function onMessage(res: {type: SocketMessageType, message: string}) {

    switch (res.type) {
        case SocketMessageType.kick:
            isKicked.value = true
            kickMsg.value = res.message
            break;

        case SocketMessageType.roomFull:
            alert(res.message)
            break
        case SocketMessageType.error:
            alert(res.message)
            break
        case SocketMessageType.forbidden:
            alert(res.message)
            break

        case SocketMessageType.info:
            alert(res.message)
            break

        default:
            break;
    }
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
        reportData.averageWPM = playerAvgWPM
        reportData.highestWPM = playerHighestWPM
        await ApiStatistics.addStatistics(reportData)
    }
}




function onTyping(data: {cursorPos: number, error: number}) {
    if (socket != null && roomCode != '') {
        socket.emit("updateScore", {
            playerId: socket.id,
            cursorPos: data.cursorPos,
            roomCode: roomCode,
            errors: data.error
        })
    }
}





</script>
<template>
    <main>
        <Sidebar :activeTabIndex="2" />
        <section class="main">
            <h2>Multiplayer</h2>
            <p>Compete against other players in this online multiplayer game. The faster you type, the faster your car goes.
                Type as fast as you can to win the race!</p>

            <template v-if="isKicked == false">
                <MatchTrack :is-admin="false" :players="allPlayers" :totalChars="typingContent.length" :message="messageText" />
                <TypingArea :sentence="typingContent" :onTypingCompleted="onTypingCompleted" :onTyping="onTyping"
                    :is-edit-allowed="isWriteAllowed" :forgive-error="false" :multiplayer="true" :message="'Please wait'"
                     />
            </template>

            <div v-else class="kick">
                <div class="content">
                    <img src="../public/images/kick.png" alt="kick">
                    <h2>Oops!<br>{{ kickMsg }}</h2>
                    <button @click="setup" class="button primary">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 4.5a7.5 7.5 0 1 0 7.419 6.392c-.067-.454.265-.892.724-.892.37 0 .696.256.752.623A9 9 0 1 1 18 5.292V4.25a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1 0-1.5h1.35a7.474 7.474 0 0 0-5.1-2Z" />
                        </svg>
                        Rejoin</button>
                </div>
            </div>

        </section>
    </main>
</template>
<style scoped>
.kick {
    width: 100%;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.kick .content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    flex-direction: column;
}


.kick img {
    width: 100px;
}

.kick h2 {
    text-align: center;
}
</style>