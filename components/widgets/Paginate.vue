<script setup lang='ts'>
</script>
<template>
    <div class="paginate">
        <span v-for="item, index in 5" :key="index" :class="{ active: index == 2 }">{{ item }}</span>
    </div>
</template>
<style scoped>
.paginate {
    margin-top: 1em;
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
}

.paginate span {
    cursor: pointer;
    width: 2.5em;
    height: 2.5em;
    border-radius: var(--border-radius);
    border: 2px solid var(--color-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms;
    background-color: transparent;
}

.paginate span:hover,
.paginate span.active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
    font-weight: bold;
}
</style>