<script setup lang='ts'>
const props = defineProps<{
    isChecked: boolean,
    text: string
}>()

const emit = defineEmits<{
    (event: 'change', isChecked: boolean): void
}>()

 const isChecked= ref(props.isChecked)

function emitData(){
    emit('change', isChecked.value)
}

</script>
<template>
    <div class="toggle-text">
        <div class="toggle">
            <input type="checkbox" @change="emitData()" v-model="isChecked">
            <svg class="check" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12Zm-1.53 4.97L10 14.44l-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l7-7a.75.75 0 0 0-1.06-1.06Z" />
            </svg>
            <svg class="uncheck" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6Z" />
            </svg>
        </div>
        <span>{{ text }}</span>
    </div>
</template>
<style scoped>
.toggle {
    position: relative;
    width: 28px;
    height: 28px;
}

.toggle-text {
    display: flex;
    align-items: center;
    gap: 0.4em;
}

.toggle svg {
    width: 100%;
    height: 100%;
    fill: var(--color-secondary);
}

.toggle input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
}

.toggle input:checked~.check {
    display: block;
}

.toggle input:checked~.uncheck {
    display: none;
}

.toggle svg.check {
    display: none;
}
</style>