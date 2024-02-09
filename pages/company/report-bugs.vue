<script setup lang='ts'>
import { useSeoMeta } from '#imports';
import CommonLayout from '../layouts/CommonLayout.vue';

useSeoMeta({
    title: 'Report Bugs',

})


</script>
<template>
    <CommonLayout>
        <section>
            <div class="page">
                <h1>Report Bugs</h1>
                <p class="dev">Content are still under development</p>
            </div>
        </section>
    </CommonLayout>
</template>
<style scoped>
section {
    min-height: 600px;
}

.dev {
    padding: 3em;
    background-color: rgb(235, 235, 235);
}
</style>