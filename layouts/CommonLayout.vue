<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const isFaq = ref(false);
const isTableOfContent = ref(false);
onMounted(() => {
    const route = useRoute()

    // filter for some routes
    if (!route.path.includes('faq')) {
        isFaq.value = true;
    }

    const sub = route.path.split('/')
    if (sub.length && sub[sub.length - 1] != 'blogs') {
        isTableOfContent.value = true;
    }
})
</script>
<template>
    <Header :auto="false"></Header>
    <WidgetsBreadCrumb style="margin-top: 100px;" />
    <section>
        <div class="page">
            <div class="content">
                <div id="content-area">
                    <slot></slot>
                    <FAQ v-if="isFaq" />
                </div>
                <TableOfContent v-if="isTableOfContent" />
            </div>
        </div>
    </section>
    <Footer></Footer>
</template>
<style scoped>
.content {
    display: grid;
    grid-template-columns: 1fr 250px;
    gap: 1em;
    padding-bottom: 200px;
}


@media only screen and (max-width: 900px) {
    .content {
        grid-template-columns: 1fr 200px;
    }
}

@media only screen and (max-width: 700px) {
    .content {
        margin-top: 32px;
        display: flex;
        flex-direction: column-reverse;
    }
}
</style>

<style>
.dev {
    padding: 3em;
    background-color: rgb(235, 235, 235);
}

#content-area p {
    margin: 1em 0;
}
</style>