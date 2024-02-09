<script setup lang='ts'>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowRightIcon } from '../icons'

const breadCrumbs = ref<{
    text: string;
    to: string;
}[]>([]);

onMounted(() => {
    const route = useRoute()
    breadCrumbs.value = urlToBreadcrumb(route.path, ['company', 'game']);
});

function urlToBreadcrumb(url: string, filter: string[] = []) {
    const items = url.split('/').filter((item) => item !== '')
    const result = items.map((item, index) => {
        return {
            text: item,
            to: '/' + items.slice(0, index + 1).join('/')
        }
    }).filter((item) => !filter.includes(item.text))
    return [{ text: 'Home', to: '/' }, ...result]
}
</script>
<template>
    <section>
        <div class="page">
            <div>
                <template v-for="item, index in breadCrumbs" :key="index">
                    <NuxtLink :to="item.to">{{ item.text }}</NuxtLink>
                    <ArrowRightIcon />
                </template>
            </div>
        </div>
    </section>
</template>
<style scoped>
.page>div {
    display: flex;
    align-items: center;
    gap: 0.5em;
}

a {
    color: var(--color-on-surface);
}

a:hover {
    font-weight: bold;
}

svg {
    width: 12px;
    height: auto;
    fill: rgba(0, 0, 0, 0.521);
}

.page>div svg:last-child {
    display: none;
}
</style>