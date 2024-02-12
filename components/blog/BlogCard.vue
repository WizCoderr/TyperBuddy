<script setup lang='ts'>
import defaultImg from '@/assets/img/blogs/default.jpg';
defineProps({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: 'Untitled Blog Post',
    },
    description: {
        type: String,
        default: 'This is a blog post',
    },
    image: {
        type: String,
        default: defaultImg,
    },
    alt: {
        type: String,
        default: 'blog',
    }
})
function createBlogUrl(id: string) {
    return `/blogs/${id}`;
}

const limit = 130
</script>
<template>
    <NuxtLink :to="createBlogUrl(id)">
        <div class="blog-card">
            <img :src="image ? image : defaultImg" :alt="alt">
            <div class="header">
                <h4>{{ title }}</h4>
                <p>{{ description.slice(0, limit) }}{{ description.length > limit ? '...' : '' }}</p>
            </div>
        </div>
    </NuxtLink>
</template>
<style scoped>
.blog-card {
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: var(--border-radius-3);
}

.blog-card .header {
    padding: 1em;
}

.blog-card h4 {
    color: var(--text-color);
    margin: 0;
}

.blog-card p {
    margin-bottom: 0 !important;
    font-size: var(--medium-font);
}

.blog-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: var(--border-radius-3) var(--border-radius-3) 0 0;
}
</style>