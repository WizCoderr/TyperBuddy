<script setup lang='ts'>
import CheckBox from '../widgets/CheckBox.vue';
import Dropdown from '../widgets/Dropdown.vue';
import RadioGroup from '../widgets/RadioGroup.vue';

import { ref } from 'vue';

const props = defineProps<{
    isVisible: boolean
}>()



const tabActiveIndex = ref(0)

function changeTab(index: number) {
    tabActiveIndex.value = index
}

</script>
<template>
    <div v-if="isVisible" class="dialog">
        <div class="content">
            <h2>Host Tournament</h2>

            <div class="tab-container">
                <div class="tabs">
                    <span @click="changeTab(0)" :class="{ 'active': tabActiveIndex == 0 }">General</span>
                    <span @click="changeTab(1)" :class="{ 'active': tabActiveIndex == 1 }">Timing</span>
                    <span @click="changeTab(2)" :class="{ 'active': tabActiveIndex == 2 }">Rules</span>
                    <span @click="changeTab(3)" :class="{ 'active': tabActiveIndex == 3 }">Content</span>
                    <span @click="changeTab(4)" :class="{ 'active': tabActiveIndex == 4 }">Prizes & Sponsorship</span>
                </div>
                <div class="tab-contents">

                    <!-- tab content 1 -->
                    <template v-if="tabActiveIndex == 0">
                        <div class="content card-holder">
                            <div class="input-holder">
                                <span class="title">Tournament Name</span>
                                <input type="text" style="width: 50%;" />
                            </div>

                            <div class="col-3">
                                <div class="input-holder">
                                    <span class="title">Seats</span>
                                    <Dropdown default-value="100" :items="['100', '200', '500']" />
                                </div>

                                <div class="input-holder">
                                    <span class="title">Match Rounds</span>
                                    <Dropdown default-value="5" :items="['5', '7', '9']" />
                                </div>
                                <div class="input-holder">
                                    <span class="title">Visibility</span>
                                    <Dropdown default-value="public" :items="['public', 'private']" />
                                </div>
                            </div>

                            <div class="input-holder">
                                <span class="title">Small Info</span>
                                <textarea rows="3"></textarea>
                                <span class="info"> <svg width="20" height="20" fill="none" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002 0 5.523-4.478 10.001-10.002 10.001-5.524 0-10.002-4.478-10.002-10.001C1.998 6.477 6.476 1.999 12 1.999Zm0 1.5a8.502 8.502 0 1 0 0 17.003A8.502 8.502 0 0 0 12 3.5Zm-.004 7a.75.75 0 0 1 .744.648l.007.102.003 5.502a.75.75 0 0 1-1.493.102l-.007-.101-.003-5.502a.75.75 0 0 1 .75-.75ZM12 7.003a.999.999 0 1 1 0 1.997.999.999 0 0 1 0-1.997Z"
                                            fill="#212121" />
                                    </svg> Small description which is visible on tournament card.</span>
                            </div>

                            <div class="input-holder">
                                <span class="title">About Tournament</span>
                                <textarea rows="5"></textarea>
                                <span class="info"> <svg width="20" height="20" fill="none" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002 0 5.523-4.478 10.001-10.002 10.001-5.524 0-10.002-4.478-10.002-10.001C1.998 6.477 6.476 1.999 12 1.999Zm0 1.5a8.502 8.502 0 1 0 0 17.003A8.502 8.502 0 0 0 12 3.5Zm-.004 7a.75.75 0 0 1 .744.648l.007.102.003 5.502a.75.75 0 0 1-1.493.102l-.007-.101-.003-5.502a.75.75 0 0 1 .75-.75ZM12 7.003a.999.999 0 1 1 0 1.997.999.999 0 0 1 0-1.997Z"
                                            fill="#212121" />
                                    </svg> Write your tournament description</span>
                            </div>



                        </div>
                    </template>

                    <!-- tab content 2 -->
                    <template v-if="tabActiveIndex == 1">
                        <div class="content card-holder">
                            <div class="col-3">
                                <div class="input-holder">
                                    <span class="title">Start Date</span>
                                    <input class="block" type="date" />
                                </div>

                                <div class="input-holder">
                                    <span class="title">Start Time</span>
                                    <input class="block" type="time" />
                                </div>
                                <div class="input-holder">
                                    <span class="title">Round Break Interval</span>
                                    <input class="block" type="time" />
                                </div>
                            </div>

                        </div>
                    </template>

                    <!-- tab content 3 -->
                    <template v-if="tabActiveIndex == 2">
                        <div class="content card-holder">
                            <div class="rules-holder">
                                <div v-for="item, index in 5" :key="index">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Eveniet iusto assumenda sapiente obcaecati, quaerat accusamus
                                        adipisci
                                        perspiciatis laudantium autem voluptatibus dicta recusandae voluptates libero
                                        excepturi,
                                        pariatur ut quasi minus quia.
                                    </p>
                                    <button><svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                                        </svg></button>
                                </div>

                            </div>
                            <button class="button secondary rule-button">Add Rule</button>

                        </div>
                    </template>

                    <!-- tab content 4 -->
                    <template v-if="tabActiveIndex == 3">
                        <div class="content card-holder">
                           <div class="game-content">
                            <div v-for="item, index in 5" :key="index" class="input-holder">
                                <span class="title">Round {{ index + 1 }}</span>
                                <textarea rows="4"></textarea>
                            </div>
                           </div>

                        </div>
                    </template>

                </div>
            </div>


            <hr>
            <div class="buttons">
                <button class="button primary outline">close</button>
                <button class="button primary">Host</button>

            </div>

        </div>
    </div>
</template>
<style scoped>
@import '~/public/style/dialog.css';

.rules-holder {
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.rules-holder div {
    position: relative;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.rules-holder div:hover button {
    display: block;
}

.rules-holder button {
    display: none;
    position: absolute;
    bottom: 0;
    right: 50%;
    background-color: transparent;
    transform: translate(50%, 50%);
    border: none;
    border: 1px solid rgba(0, 0, 0, 0.096);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    backdrop-filter: blur(10px);
}

.rules-holder button svg {
    fill: var(--color-error);
    transform: translateY(-70%);
}

.rules-holder p {
    background-color: white;
    text-align: left;
    padding: 0.5em 1em;
    margin: 0;
    border-radius: var(--border-radius-3);

}

button.rule-button {
    margin-top: 2em;
    width: 100%;
    justify-content: center;

}



.game-content{
    max-height: 400px;
    overflow-y: auto;
}
</style>