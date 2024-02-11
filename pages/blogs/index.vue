<script setup lang='ts'>
import { useSeoMeta } from '#imports';
import CommonLayout from '@/layouts/CommonLayout.vue';
import { blogPostData } from '~/data/blog-post-data';

useSeoMeta({
    title: 'Blogs',

})


</script>
<template>
    <CommonLayout>
        <h1>Blogs</h1>
        <p>Explore the world of typing, gaming, and community engagement through our insightful and entertaining blog posts.
            Whether you're a seasoned typist looking to sharpen your skills, a gaming enthusiast seeking new challenges, or
            simply someone who loves to connect with like-minded individuals, you'll find something to enjoy in our diverse
            collection of articles.</p>
        <div class="blogs-holder">
            <BlogCard v-for="item, index in blogPostData" :id="item.id" :title="item.title" :alt="item.alt"
                :description="item.description" :image="item.image" :key="index" />
        </div>

    </CommonLayout>
</template>
<style scoped>
.blogs-holder {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    margin-top: 3em;
    margin-bottom: 5em;
}

.blogs-holder>div {
    min-height: 200px;
}
</style>