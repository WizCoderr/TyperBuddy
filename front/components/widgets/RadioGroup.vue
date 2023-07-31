<script setup lang='ts'>
const props = defineProps<{
    radioFor: string,
    checked: string,
    text: Array<string>,
    checkValues: Array<string>
}>()

const emit = defineEmits<{
    (event: 'change', checkedValue: string): void
}>()

const checkedValue = ref(props.checked)

function emitData() {
    emit('change', checkedValue.value)
}

</script>
<template>
    <div class="toggle-group" style="grid-template-columns: repeat(3, 1fr);">
        <div class="toggle-text" v-for="item, index in checkValues">
            <div class="toggle">
                <input :for="radioFor" :value="item" type="radio" @change="emitData()" v-model="checkedValue">
                <svg class="check" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm3.22 6.97-4.47 4.47-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 1 0-1.06-1.06Z" />
                </svg>

                <svg class="uncheck" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Z" />
                </svg>
            </div>
            <span>{{ text[index] }}</span>
        </div>
    </div>
</template>
<style scoped>

.toggle-group{
    display: grid;
}
.toggle-text {
    display: flex;
    align-items: center;
    gap: 0.4em;
}

.toggle {
    position: relative;
    width: 28px;
    height: 28px;
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