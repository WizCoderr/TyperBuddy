<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import CommonLayout from './CommonLayout.vue';
import defaultImg from '@/assets/img/blogs/default.jpg';
import { getPostData } from '@/data/blog-post-data';
import { useRoute } from '#imports';

const route = useRoute();
const sub = route.path.split('/')
const post = getPostData(sub[sub.length - 1]);

// const prop = defineProps({
//     title: {
//         type: String,
//         default: 'Untitled Blog Post',
//     },
//     description: {
//         type: String,
//         default: 'This is a blog post',
//     },
//     image: {
//         type: String,
//         default: defaultImg,
//     },
//     alt: {
//         type: String,
//         default: 'blog',
//     }
// })


</script>
<template>
    <CommonLayout>
        <div class="blog-post">
            <div class="blog-header">
                <img :src="post!!.image" :alt="post!!.alt">
                <h1>{{ post!!.title }}</h1>
                <p>{{ post!!.description }}</p>
                <hr />
            </div>
            <slot></slot>
        </div>
    </CommonLayout>
</template>
<style scoped>
.blog-header {
    margin: 1em 0;
    margin-bottom: 5em;
}

.blog-header img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: var(--border-radius-3);
}

.blog-post {
    padding-bottom: 100px;
}
</style>

<style>
.blog-header hr {
    border: none;
    border-bottom: 1px solid var(--border-color);
    opacity: 0.3;
}

.blog-post img {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-3);
}
</style>
