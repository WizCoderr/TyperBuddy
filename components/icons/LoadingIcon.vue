<script setup lang='ts'>
defineProps<{
    size: string
}>()
</script>
<template>
    <div :class="'loading ' + size"></div>
</template>
<style scoped>

</style>