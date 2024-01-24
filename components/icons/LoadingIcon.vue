<script setup lang='ts'>
defineProps<{
    size: 'mini' | 'small'
}>()
</script>
<template>
    <div :class="'loading ' + size"></div>
</template>
<style scoped>

</style>