<script setup lang='ts'>
import { generateAvatar } from '@/lib/utils'
import IconStack from '@/components/widgets/IconStack.vue'

</script>
<template>
    <div class="chat-box">
        <div class="header">
            <h4>Chat</h4>
            <span>3 online</span>
        </div>
        <div class="content scroll-bar">
            <div v-for="item, index in 3" :key="index" class="chat-holder">
                <img :src="generateAvatar('Nitesh Kumar')" />
                <div class="chats">
                    <div v-for="item, index in Math.max(1, Math.round(Math.random() * 3))" :key="index" class="item">
                        <div class="title">
                            <span class="name">Nitesh</span>

                        </div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique velo</p>
                        <span class="time">1 min ago</span>
                    </div>
                </div>
            </div>

            <div class="chat-holder right">
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
            </div>

        </div>
        <form class="footer">
            <div class="typing-stack">
                <IconStack :avatars="[generateAvatar('Nitesh'), generateAvatar('Kishan')]" />
                Typing...
            </div>
            <input type="text" placeholder="Type your message here..." />
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
    font-size: var(--small-font);
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
    padding: 0.5em;
    margin-bottom: 0.2em;
    border-radius: 0.6rem;
    border: 1px solid rgba(0, 0, 0, 0.05);
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
    width: 32px;
    height: 32px;
    object-fit: cover;
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

.footer .typing-stack{
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