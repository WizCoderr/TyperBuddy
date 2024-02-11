<script setup lang='ts'>


import { computed, onMounted } from 'vue';
import type { FaqQuestion } from './Question.vue';
import Question from './Question.vue';

const prop = defineProps({
    count: {
        type: Number,
        default: 10
    }
});
// Note: -1 is used to indicate that all questions should be shown

const fawQuestions: FaqQuestion[] = [
    {
        question: "What is TyperBuddy?",
        answer: "TyperBuddy is a platform designed to help you improve your typing skills. We offer a variety of typing games, practice exercises, and multiplayer challenges to help you become a typing master. Our platform also provides detailed progress tracking to help you monitor your improvement over time."
    },
    {
        question: "How can I improve my typing speed?",
        answer: "Improving your typing speed is easy with TyperBuddy. We offer a variety of typing games and practice exercises that are designed to help you improve your typing speed. You can also participate in multiplayer challenges to compete with other users and track your progress over time."
    },
    {
        question: "Is TyperBuddy free to use?",
        answer: "Yes, TyperBuddy is completely free to use. You can access all of our typing games, practice exercises, and multiplayer challenges without paying a dime. We also offer detailed progress tracking and other features to help you improve your typing skills."
    },
    {
        question: "How can I track my progress?",
        answer: "TyperBuddy offers detailed progress tracking to help you monitor your improvement over time. You can view your typing speed, accuracy, and other metrics to see how you're improving. We also offer leaderboards and other features to help you track your progress and compete with other users."
    },
    {
        question: "How can I contact TyperBuddy?",
        answer: "You can contact TyperBuddy by sending an email by visiting our contact page. We're always happy to hear from our users and we're here to help you with any questions or concerns you may have."
    }];


const filteredQuestions = computed(() => {
    if (prop.count === -1) {
        return fawQuestions;
    }

    const maxIndex = Math.min(fawQuestions.length, prop.count);
    return fawQuestions.slice(0, maxIndex);
});


</script>
<template>
    <div class="faq">
        <Question v-for="question, index in filteredQuestions" :key="index" :question="question.question"
            :answer="question.answer" />
    </div>
</template>
<style scoped></style>