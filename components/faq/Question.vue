<script setup lang='ts'>
import { ref } from 'vue';
import { AddIcon, SubIcon } from '../icons';
export interface FaqQuestion {
    question: string;
    answer: string;
}

const isOpen = ref(false);

defineProps<FaqQuestion>();
</script>
<template>
    <div class="question" @click="() => isOpen = !isOpen">
        <div class="header">
            <h4>{{ question }}</h4>
            <SubIcon v-if="isOpen" />
            <AddIcon v-else />
        </div>
        <p :class="isOpen ? '' : 'hide'">{{ answer }}</p>
    </div>
</template>
<style scoped>
.question {
    margin-bottom: 1em;
    padding: 0 1em;
    border: 1px dashed var(--border-color);
    border-radius: var(--border-radius);
    transition: all 200ms;
    overflow-y: auto;
}

.question .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.question p {
    margin-top: 0 !important;
    margin-bottom: 1em !important;
}

.question p.hide {
    display: none;
}

.question svg {
    width: 1.2em;
    height: auto;
    fill: var(--color-on-surface);
}
</style>