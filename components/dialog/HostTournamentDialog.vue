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
                                    <Dropdown default-value="100" :items="['100', '200', '500']"/>
                                </div>

                                <div class="input-holder">
                                    <span class="title">Match Rounds</span>
                                    <input type="text" class="block" />
                                </div>
                                <div class="input-holder">
                                    <span class="title">Visibility</span>
                                    <input type="text" class="block" />
                                </div>
                            </div>



                        </div>
                    </template>

                    <!-- tab content 2 -->
                    <template v-if="tabActiveIndex == 1">
                        <div class="content card-holder">

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
</style>