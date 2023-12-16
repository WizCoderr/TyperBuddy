<script setup lang='ts'>
import { watch } from '#imports';
import { ref } from 'vue';

const props = defineProps<{
    defaultValue: string,
    items: Array<string>
}>()

const isOpen = ref(false)

const emit = defineEmits<{
    (event: 'change', value: string): void
}>()

const dropdownValue = ref(props.defaultValue)


watch(dropdownValue, function (newValue, oldValue) {
    emitData()
})

function emitData() {
    emit('change', dropdownValue.value)
}



</script>
<template>
    <div class="dropdown">
        <p>{{ dropdownValue }}</p>
        <div class="content">
            <span :onclick="() => dropdownValue = item" v-for="item, index in items" :key="index">{{ item }}</span>
        </div>

    </div>
</template>
<style scoped>
.dropdown {
    position: relative;

}

.dropdown p {
    padding: 0.6em 1em;
    font-size: var(--medium-font);
    border-radius: var(--border-radius);
    outline: 1px solid rgb(224, 224, 224);
    background-color: white;
}

.dropdown:hover .content {
    display: block;

}

.dropdown .content {
    cursor: context-menu;
    display: none;
    margin-top: 2px;
    position: absolute;
    width: 100%;
    min-height: 100px;
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.dropdown span {
    display: block;
    padding: 0.6em 1em;
}

.dropdown span:first-child {
    border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.dropdown span:last-child {
    border-radius: 0 0 var(--border-radius) var(--border-radius);
}

.dropdown span:hover {
    background-color: var(--color-primary);
    color: white;
}
</style>