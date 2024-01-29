<script setup lang='ts'>
import { generateAvatar, getCurrentTime, objectToString } from '@/lib/utils'
import IconStack from '@/components/widgets/IconStack.vue'
import { onMounted, onUnmounted, ref } from '#imports';
import { getTimeString } from '@/lib/utils'

const socket = ref<WebSocket | null>(null)
const players = ref<Array<PlayerData>>([])
const playerChats = ref<Array<PlayerChat>>([])
const typingPlayers = ref<Array<string>>([])
const historyChats = ref<Array<PlayerRawChat>>([])
let timer: any = null
let playerId = ""

onMounted(() => {
    const ws = new WebSocket("ws://localhost:3001/chat");
    ws.onopen = onConnect
    socket.value = ws

    timer = setInterval(updateTypingPlayers, 500)

})

onUnmounted(() => {
    if (socket.value) socket.value.close()
    if (timer) {
        clearInterval(timer)
        timer = null
    }
})



function onConnect() {
    if (!socket.value) return
    socket.value.onmessage = onRawMessage
    socket.value.onclose = onClose

    // send player profile data
    const data: RawMessage<any> = {
        type: 'join',
        data: {
            name: 'Nitesh Kumar',
            roomId: 'abcd',
            avatar: 'https://avatars.githubusercontent.com/u/29686102?v=4'
        }
    }

    socket.value.send(objectToString(data))
}






function onClose(event: CloseEvent) {
    console.log(event)
}


function onRawMessage(event: MessageEvent) {
    console.log(event.data)
    const data = JSON.parse(event.data) as RawMessage<any>;
    switch (data.type) {
        case 'join':
            onJoin(data.data)
            break;
        case 'leave':
            onLeave(data.data)
            break;
        case 'chat':
            onChat(data.data)
            break;
        case 'typing':
            onTyping(data.data.playerId)
            break;
        case 'history':
            onHistory(data.data)
            break;
        case 'error':
            onError(data.data)
            break;
        default:
            break;
    }
}

interface RawMessage<T> {
    type: "join" | "typing" | "chat" | "error" | "leave" | "history"
    data: T
}


interface SocketMessage {
    playerId: string,
}

interface PlayerRawChat extends SocketMessage {
    message: string,
    time: string,
}

interface PlayerChat {
    player: PlayerRawData,
    chats: Array<PlayerRawChat>
}

interface TypingStatus extends SocketMessage {
    time: number
}

interface PlayerRawData extends SocketMessage {
    name: string,
    avatar: string,
    time: number
}

interface PlayerData extends PlayerRawData {
    lastTyping: number,
    active: boolean
}

interface Leave extends SocketMessage { }


function onChat(data: PlayerRawChat) {
    historyChats.value.push(data)
    playerChats.value = groupChats(historyChats.value)
}


function onTyping(playerId: string) {
    const index = players.value.findIndex((item) => item.playerId == playerId)
    if (index == -1) return

    players.value[index].lastTyping = getCurrentTime()
    updateTypingPlayers()
}

function onJoin(data: PlayerRawData) {

    // skip if player already exist
    const playerIndex = players.value.findIndex((item) => item.playerId == data.playerId)
    if (playerIndex > -1) return

    const profile = { ...data, lastTyping: 0, active: true }

    // generate a profile image if player don't have any
    if (profile.avatar.length < 10) {
        profile.avatar = generateAvatar(profile.name, profile.avatar)
    }
    players.value.push(profile)
}

function onLeave(data: Leave) {

    // find player
    const index = players.value.findIndex((item) => item.playerId == data.playerId)
    if (index > -1) {
        players.value[index].active = false
    }
}

function onError(message: string) {
    console.log(message)
}

function onHistory(data: { playerId: string, chatHistory: PlayerRawChat[], players: PlayerRawData[] }) {
    playerId = data.playerId

    // add history players
    data.players.forEach(element => {
        onJoin(element)
    });

    const history = data.chatHistory
    playerChats.value = groupChats(history)
    historyChats.value = history
}



// extra
function updateTypingPlayers() {

    const avatars = Array<string>()           // store avatar
    const current = getCurrentTime()
    for (const iterator of players.value) {
        // test for 1 seconds delay
        const diff = current - iterator.lastTyping
        if (diff < 1000) avatars.push(iterator.avatar)
    }

    typingPlayers.value = avatars
}


function getPlayerById(playerId: string) {
    return players.value.find((item) => item.playerId == playerId)
}

function groupChats(chats: PlayerRawChat[]) {
    const tempChats: PlayerChat[] = []
    let lastPlayerId = ""

    for (const element of chats) {
        // create new chat group
        if (lastPlayerId != element.playerId) {

            const player = getPlayerById(element.playerId)
            if (player) {
                lastPlayerId = element.playerId
                tempChats.push({ player: player, chats: [] })
            } else {

                // TODO: temporarily because old unconnected profile is empty on server but message still exist
                continue
            }

        }

        // add chat to last chat group
        tempChats[tempChats.length - 1].chats.push(element)
    }


    return tempChats
}


function onSubmit(event: any) {
    if (socket.value) {
        const formData = new FormData(event.target);
        const msg = formData.get('msg')
        event.target.reset()

        if (!msg) return

        // send data to server
        const data: RawMessage<any> = {
            type: 'chat',
            data: {
                message: msg.toString(),
            }
        }
        socket.value.send(objectToString(data))
    }
}



function emitTypingStatus() {

    if (!socket.value || !playerId) return
    const data: RawMessage<any> = {
        type: 'typing',
        data: {}
    }

    socket.value.send(objectToString(data))
}


</script>
<template>
    <div class="chat-box">
        <div class="header">
            <h4>Chat</h4>
            <span>{{ players.filter(item => item.active).length }} online</span>
        </div>
        <div class="content scroll-bar">
            <template v-for="chats, index in playerChats" :key="index">
                <div :class="chats.player.playerId == playerId ? 'chat-holder right' : 'chat-holder'">
                    <img :src="chats.player.avatar" />
                    <div class="chats">
                        <div v-for="chat, index2 in chats.chats" :key="index2" class="item">
                            <div class="title">
                                <span class="name">{{ chats.player.name }}</span>

                            </div>
                            <p>{{ chat.message }}</p>
                            <span class="time">{{ getTimeString(chat.time) }}</span>
                        </div>
                    </div>
                </div>
            </template>


            <!-- <div class="chat-holder right">
                <img :src="generateAvatar('Nitesh Kumar')" />
                <div class="chats">
                    <div v-for="item, index in Math.max(1, Math.round(Math.random() * 3))" :key="index" class="item">
                        <div class="title">
                            <span class="name">Nitesh</span>
                        </div>
                        <p>Lorem ipsum dolor</p>
                        <span class="time">1 min ago</span>
                    </div>
                </div>
            </div> -->

        </div>
        <form @submit.prevent="onSubmit" class="footer">
            <div v-if="typingPlayers.length" class="typing-stack">
                <IconStack :avatars="typingPlayers" />
                Typing...
            </div>
            <input @input="emitTypingStatus" type="text" name="msg" placeholder="Type your message here..." />
            <button>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z" />
                </svg>
            </button>
        </form>
    </div>
</template>
<style scoped>
.chat-box {
    width: 100%;
    min-height: 400px;
    max-height: 600px;
    background-color: white;
    border-radius: 0.6rem;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.chat-box .header {
    height: 50px;
    padding: 0 1em;
    background-color: var(--color-primary);
    border-radius: 0.6rem 0.6rem 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    font-size: var(--small-font);
}

.chat-box .header h4 {
    margin: 0;
    color: white;
}

.chat-box .content {
    background-color: white;
    height: 100%;
    overflow-y: auto;
    padding: 1em 0.5em;
    padding-bottom: 5em;
}

.chat-box .chat-holder {
    display: flex;
    gap: 0.2em;
    margin: 0.6em 0;
}

.chat-box .chats {
    margin-right: 10%;
}


.chat-box .chat-holder.right {
    flex-direction: row-reverse;
}

.chat-box .chat-holder.right .chats {
    margin-right: 0;
    margin-left: 10%;
}


.chat-box .chat-holder .time {
    font-size: var(--very-small-font);
    display: block;
    text-align: end;
    opacity: 0.7;
}

.chat-box .chat-holder.right .chats>div:first-child {
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0;
}

.chat-box .chats .item {
    background-color: var(--color-surface);
    padding: 0.4em 0.5em;
    margin-bottom: 0.2em;
    border-radius: 0.6rem;
    border: 1px solid rgba(0, 0, 0, 0.05);
    width: fit-content;
    min-width: 100px;
}



.chat-box .chat-holder.right .item {
    background-color: var(--color-on-surface);
    color: white;
}

.chat-box .chats .item .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5em;
}

.chat-box .chats .item:first-child .title {
    display: flex;
}

.chat-box .chats .item .title {
    display: none;
}


.chat-box .chats>div:first-child {
    border-top-left-radius: 0;
}

.chat-box .chats .item>div :first-child {
    font-weight: bold;
}

.chat-box .chats .item>div :last-child {
    font-size: var(--small-font);
}

.chat-box .chats p {
    line-height: 1.3em;
    margin: 0;
}

.chat-box img {
    width: 28px;
    height: 28px;
    object-fit: cover;
    border-radius: 50%;
}





.footer {
    border-top: 1px solid var(--color-surface-dark);
    background-color: white;
    border-radius: 0 0 0.6rem 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    position: relative;
}

.footer .typing-stack {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 1em;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    transform: translateY(calc(-100% - 1px));
    color: var(--color-primary);
    font-size: var(--small-font);
    font-weight: bold;
    background-color: white;
    width: 100%;
    padding: 0 1em;
}

.footer button svg {
    fill: var(--color-on-surface);
}

.footer button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--color-on-surface);
    padding: 0;
    transition: all 200ms;
}

.footer button:hover {
    opacity: 0.7;
}

.footer input {
    height: 2.8em;
    border: none;
    outline: none;
    padding: 0.5em 1em;
    width: 100%;
    display: block;
    font-size: var(--medium-font);
    background-color: transparent;
    color: var(--color-on-surface);
}
</style>