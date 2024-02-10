<script setup lang='ts'>
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import { textToUrl } from '~/lib/utils';

const tableData = ref<{
    name: string,
    url: string,
    active: boolean
}[]>([]);

const headers = ref<NodeListOf<HTMLHeadingElement>>();

onMounted(() => {
    setupTableOfContent()
    window.addEventListener('scroll', autoActive);
});

onUnmounted(() => {
    window.removeEventListener('scroll', autoActive);
});

function autoActive() {
    const scrollY = window.scrollY;
    const content = document.getElementById('content-area');
    if (!content) return;

    headers.value!!.forEach((element, index) => {
        const nextElement = headers.value!![index + 1];
        const top = element.offsetTop - 100;
        const bottom = nextElement ? nextElement.offsetTop : content.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
            tableData.value.forEach(item => {
                item.url === element.id ? item.active = true : item.active = false;
            });
        }
    });
}


function setupTableOfContent() {
    const content = document.getElementById('content-area');
    if (!content) return;

    headers.value = content.querySelectorAll('h3');
    headers.value.forEach(element => {
        element.id = textToUrl(element.innerText);
        tableData.value.push({
            name: element.innerText,
            url: element.id,
            active: false
        });
    });
}
</script>
<template>
    <div v-if="tableData.length" class="table-of-content">
        <h4>Table of Content</h4>
        <ul>
            <template v-for="item, index in tableData" :key="index">
                <li :class="item.active ? 'active' : ''">
                    <NuxtLink :to="`#${item.url}`">{{ item.name }}</NuxtLink>
                </li>
            </template>

        </ul>
    </div>
</template>
<style scoped>
.table-of-content {
    position: sticky;
    width: 100%;
    top: 100px;
    min-height: 200px;
    height: max-content;
    border-radius: 10px;
    border: 1px dashed rgb(201, 201, 201);
    padding: 0.2em;
}

.table-of-content h4 {
    margin-left: 0.8rem;
    margin-right: 0.8rem;
}

.table-of-content ul {
    padding: 0;
    list-style: none;
}

.table-of-content li {
    padding: 0.4em 0.8rem;
    margin-bottom: 0;
    color: var(--text-color);
    opacity: 0.7;
    border-radius: var(--border-radius);
    line-height: 1.2em;
}

.table-of-content li:hover,
.table-of-content li.active {
    background-color: var(--color-surface-dark);
    opacity: 1;
}

.table-of-content li a {
    color: inherit;
}

@media only screen and (max-width: 700px) {
    .table-of-content {
        position: static;
    }
}
</style>