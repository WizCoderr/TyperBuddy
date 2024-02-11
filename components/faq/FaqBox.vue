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
    },
    {
        question: "Are there different difficulty levels available for typing exercises?",
        answer: "Yes, TyperBuddy offers typing exercises with varying difficulty levels to cater to users of all skill levels. You can choose from beginner, intermediate, and advanced levels to suit your typing abilities."
    },
    {
        question: "Can I customize the typing exercises or choose specific topics?",
        answer: "Yes, TyperBuddy allows you to customize typing exercises by selecting specific topics or themes. You can practice typing passages related to technology, literature, sports, and more."
    },
    {
        question: "Do you offer typing lessons or tutorials for beginners?",
        answer: "Yes, TyperBuddy provides typing lessons and tutorials for beginners to help them learn the basics of touch typing. Our lessons cover essential techniques, finger positioning, and typing exercises to improve accuracy and speed."
    },
    {
        question: "Is there a mobile app available for TyperBuddy?",
        answer: "Currently, TyperBuddy is available as a web platform accessible through any web browser. However, we are actively working on developing a mobile app for iOS and Android devices to provide users with a seamless typing experience on the go."
    },
    {
        question: "Are there any rewards or achievements for reaching typing milestones?",
        answer: "Yes, TyperBuddy rewards users for reaching typing milestones and achieving high scores in typing challenges. You can earn badges, trophies, and other rewards as you progress and improve your typing skills."
    },
    {
        question: "Can I compete against my friends in multiplayer mode?",
        answer: "Yes, TyperBuddy allows you to invite and compete against your friends in multiplayer typing races. Simply create a room, share the invite link with your friends, and start the race together."
    },
    {
        question: "How is my typing speed measured?",
        answer: "TyperBuddy measures your typing speed in words per minute (WPM) based on the number of words you type correctly within a given time frame. Your accuracy is also taken into account to provide a comprehensive assessment of your typing skills."
    },
    {
        question: "Are there any keyboard shortcuts or hotkeys available?",
        answer: "Yes, TyperBuddy offers keyboard shortcuts and hotkeys to enhance your typing experience. These shortcuts allow you to navigate between exercises, start races, and access various features more efficiently."
    },
    {
        question: "Can I track my progress over multiple sessions?",
        answer: "Yes, TyperBuddy saves your progress and performance metrics across multiple sessions. You can track your improvement over time and compare your current stats with previous sessions to monitor your progress."
    },
    {
        question: "Is there a typing certificate or diploma available upon completion?",
        answer: "TyperBuddy offers a typing certificate or diploma upon completion of certain typing challenges or milestones. This certificate serves as a recognition of your typing proficiency and can be shared on social media or added to your resume."
    },
    {
        question: "Can I practice typing in different languages?",
        answer: "Yes, TyperBuddy supports typing exercises in multiple languages to cater to users from different regions. You can practice typing in English, Spanish, French, German, and other languages to improve your multilingual typing skills."
    },
    {
        question: "How can I improve my typing accuracy?",
        answer: "Improving your typing accuracy is essential for becoming a proficient typist. TyperBuddy offers typing exercises and games that are designed to help you improve your accuracy through practice and repetition."
    },
    {
        question: "Are there any typing challenges or tournaments available?",
        answer: "Yes, TyperBuddy hosts typing challenges and tournaments where users can compete against each other to achieve the highest scores. These challenges are a great way to test your typing skills and compare your performance with other users."
    },
    {
        question: "Can I practice typing on different keyboard layouts?",
        answer: "Yes, TyperBuddy allows you to practice typing on different keyboard layouts such as QWERTY, AZERTY, and Dvorak. This feature is especially useful for users who are transitioning to a new keyboard layout or learning to type in a different language."
    },
    {
        question: "Is there a typing test available to assess my typing skills?",
        answer: "Yes, TyperBuddy offers a typing test that assesses your typing speed, accuracy, and overall typing proficiency. The test provides a comprehensive evaluation of your typing skills and helps you identify areas for improvement."
    },
    {
        question: "Can I practice typing on a virtual keyboard?",
        answer: "Yes, TyperBuddy provides a virtual keyboard that allows you to practice typing without using a physical keyboard. This feature is especially useful for users who are learning to type on touch screen devices or other non-traditional input methods."
    },
    {
        question: "How can I improve my typing posture and ergonomics?",
        answer: "TyperBuddy offers tips and guidelines to help you improve your typing posture and ergonomics. These recommendations are designed to reduce strain and discomfort while typing and promote healthy typing habits."
    },
    {
        question: "Are there any typing exercises for children or beginners?",
        answer: "Yes, TyperBuddy provides typing exercises and games that are suitable for children and beginners. These exercises are designed" +
            " to help young users develop their typing skills in a fun and engaging way."
    }
];


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
<style scoped>
</style>
