<script setup lang='ts'>

import { useProfileStore } from '~/store/profile'
import { ref, onMounted } from 'vue';
import { useSeoMeta } from '#imports';
import Header from '~/components/Header.vue';

useSeoMeta({
    title: 'Home',
    description: 'Enhance your typing skills with our interactive practice sessions. Choose from a variety of exercises tailored to your skill level and track your progress effortlessly. Start practicing today!',

})



</script>
<template>
    <Header></Header>
    <HomeLanding />
    <h1>Hllo</h1>
</template>
<style scoped></style>