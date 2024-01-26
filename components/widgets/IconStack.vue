<script setup lang='ts'>
import { generateAvatar } from '~/lib/utils';
defineProps<{
    avatars: string[];
}>()
</script>
<template>
    <div class="stack">
        <img v-for="item, index in avatars" :key="index" :src="item" />
    </div>
</template>
<style scoped>
.stack {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 0;
}

.stack img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: -8px;
    display: block;
    outline: 2px solid white;
}
</style>