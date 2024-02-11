<script setup lang='ts'>
import { ref } from 'vue';
import { onMounted } from 'vue';

import { defineProps, type PropType } from 'vue';

const props = defineProps({
    label: String,
    type: {
        type: String as PropType<'text' | 'email' | 'textarea'>,
        default: 'text',
    },
    rows: {
        type: Number,
        default: 4,
    },
    placeholder: String,
    value: String,
    important: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits<{
    change: [value: string]
}>()

const inputValue = ref(props.value ? props.value : '');


function onChange(value: string) {
    inputValue.value = value;
    emit('change', value);
}


</script>
<template>
    <div class="input-group">
        <label>{{ label }}</label>

        <textarea v-if="type == 'textarea'" :required="important" :rows="rows" :value="inputValue"
            :placeholder="props.placeholder" @change="(e: any) => onChange(e.target.value)"></textarea>

        <input v-else :type="type" :required="important" :value="inputValue" :placeholder="props.placeholder"
            @change="(e: any) => onChange(e.target.value)" />

    </div>
</template>
<style scoped>
.input-group {
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: var(--medium-font);
    margin: 1em 0;
}

.input-group input,
.input-group textarea {
    color: inherit;
    font-size: inherit;
    padding: 0.7em 1em;
    margin: 0.5em 0;
    border: none;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-surface-dark-2);
    outline-color: var(--color-primary);
}

.input-group textarea {
    resize: vertical;
}
</style>