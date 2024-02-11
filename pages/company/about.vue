<script setup lang='ts'>
import { useSeoMeta } from '#imports';
import CommonLayout from '@/layouts/CommonLayout.vue';

useSeoMeta({
    title: 'About Us',

})


</script>
<template>
    <CommonLayout>
        <h1>About Us</h1>
        <p class="dev">Content are still under development</p>
        <!-- <p>Last updated:10-feb-2024 </p> -->
    </CommonLayout>
</template>
<style scoped>
</style>
