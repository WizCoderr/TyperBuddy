<script setup lang='ts'>
import BlogPostLayout from '@/layouts/BlogPostLayout.vue';
import defaultImg from '@/assets/img/blogs/default.jpg';
</script>
<template>
    <BlogPostLayout>
        <h3>How to create a post for typerbuddy?</h3>
        <img :src="defaultImg" alt="">

    </BlogPostLayout>
</template>
<style scoped></style>