<script setup lang='ts'>
import { all } from "axios";
import { Socket, io } from "socket.io-client";
import { PlayerData } from '~/lib/DataType'

const serverUrl = import.meta.env.VITE_SERVER_URL

// temp
const data = "Lorem Ipsum is simply dummy text of the printing and type setting industry."
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



let socket: Socket | null = null

const allPlayers = ref(Array<PlayerData>())


const playerName = names[Math.round(Math.random() * (names.length - 1))]

onMounted(function () {
    socket = io(serverUrl)
    socket.on('connect', onConnect)


})


function onConnect() {
    allPlayers.value = []
    console.log("Connection established")

    // adding the current player
    allPlayers.value.push({
        playerId: socket!!.id,
        name: playerName,
        profileImage: "",
        score: {
            cursorPos: 0,
            speed: 0,
            errors: 0,
            rank: 0
        }
    })

    socket!!.emit('joinRoom', { name: playerName, accountId: "", profileImage: "" });
    socket!!.on("onPlayerJoin", onPlayerJoin)
    socket!!.on("onPlayerLeft", onPlayerLeft)

}




function onPlayerJoin(playerData: {name: string, playerId: string, profileImage: string}) {

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


function onPlayerLeft(playerData: {playerId: string}) {
    console.log(playerData)
    allPlayers.value = allPlayers.value.filter((value) => {
        if(playerData.playerId != value.playerId){
            return value
        }
    })
}




</script>
<template>
    <main>
        <Sidebar :activeTabIndex="3" />
        <section class="main">
            <h2>Multiplayer</h2>
            <p>Compete against other players in this online multiplayer game. The faster you type, the faster your car goes.
                Type as fast as you can to win the race!</p>
            <MatchTrack :players="allPlayers" :totalChars="data.length"/>
            <TypingArea :sentence="data" />
        </section>
    </main>
</template>
<style scoped></style>