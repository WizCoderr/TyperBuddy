<script setup lang='ts'>

defineProps<{
    playerName: string
}>()


const emit = defineEmits<{
    (event: 'close'): void
    (event: 'ok'): void
}>()


</script>
<template>
    <div class="dialog small">
        <div class="content">
            <div class="inner">
                <p>Do you really want to kick <b>{{ playerName }}</b>?</p>

                <div class="buttons">
                    <button class="button primary outline" @click="emit('close')">
                        Cancel
                    </button>
                    <button class="button secondary" @click="emit('ok')">
                        Kick</button>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
@import '~/public/style/dialog.css';


.inner {
    min-height: 200px;
    display: grid;
    grid-template-rows: 1fr max-content;
    gap: 24px;
    align-items: center;
}
</style>