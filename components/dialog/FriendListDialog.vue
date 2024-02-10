<script setup lang='ts'>
import CheckBox from '../widgets/CheckBox.vue';
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
    <div v-if="isVisible" class="dialog small">
        <div class="content">
            <h2>Friends List</h2>

            <div class="tab-container">
                <div class="tabs">
                    <span @click="changeTab(0)" :class="{ 'active': tabActiveIndex == 0 }">Friends (10)</span>
                    <span @click="changeTab(1)" :class="{ 'active': tabActiveIndex == 1 }">Joined (7)</span>
                </div>
                <div class="tab-contents">

                    <!-- tab content 1 -->
                    <template v-if="tabActiveIndex == 0">
                        <div class="content card-holder">
                            <div class="card" v-for="item, index in 10" :key="index">
                                <div class="left"><img src="../../public/extra/no_image.png" /></div>
                                <div class="center">
                                    <h4>Nitesh Kumar</h4>
                                    <p>In a world far away</p>
                                </div>
                                <div class="right">
                                    <button>Add</button>
                                </div>
                            </div>

                        </div>
                    </template>

                    <!-- tab content 2 -->
                    <template v-if="tabActiveIndex == 1">
                        <div class="content card-holder">
                            <div class="card" v-for="item, index in 10" :key="index">
                                <div class="left"><img src="../../public/extra/no_image.png" /></div>
                                <div class="center">
                                    <h4>Nitesh Kumar</h4>
                                    <p>In a world far away</p>
                                </div>
                                <div class="right">
                                    <button class="danger">Remove</button>
                                </div>
                            </div>

                        </div>
                    </template>

                </div>
            </div>

            <hr>
            <div class="buttons">
                <button class="button primary outline">close</button>
                <button class="button primary">Add Friends (5)</button>

            </div>

        </div>
    </div>
</template>
<style scoped>
@import '~/public/style/dialog.css';


.card-holder {
    width: 100%;
    height: 50vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
}


.card-holder .card {
    width: 100%;
    height: 60px;
    background-color: white;
    display: grid;
    grid-template-columns: max-content auto max-content;
    padding: 8px;
    align-items: center;
    gap: 12px;
    border-radius: var(--border-radius);
}

.card-holder h4,
.card-holder p {
    margin: 0;
    text-align: left;
}

.card-holder button {
    border-radius: 40px;
    border: none;
    border: 1px solid rgba(0, 0, 0, 0.281);
    padding: 0.5em 1.5em;
    background-color: white;
    cursor: pointer;
    transition: all 200ms;
}

.card-holder button:hover {
    background-color: var(--color-on-surface);
    border-color: var(--color-on-surface);
    color: white;
}

.card-holder button.danger {
    border-color: var(--color-secondary);
    color: var(--color-secondary);
}

.card-holder button.danger:hover {
    background-color: var(--color-secondary);
    color: white;
}

.card-holder p {
    font-size: var(--small-font);
    opacity: 0.7;
}



.card-holder .card img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>
