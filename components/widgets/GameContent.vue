<script setup lang='ts'>
import { ref, watch } from 'vue';
import { countWords, filterAllowedChars } from '../../lib/utils'
import { LoadingIcon } from '../icons';
import ApiContent from '~/lib/api/ApiContents';
import { useToast } from 'vue-toast-notification';

const $toast = useToast()

const props = defineProps<{
    maxLength: number,
    defaultValue: string
}>()

const emit = defineEmits<{
    (event: 'change', value: string): void
}>()


function emitData(value: string) {
    emit('change', value)
}


const gameContent = ref(props.defaultValue)

watch(props, (value) => {
    gameContent.value = value.defaultValue

})
watch(gameContent, (value) => {
    if (countWords(value) > props.maxLength) {
        gameContent.value = textToArray(value).slice(0, props.maxLength).join(" ")
        return
    }
    emitData(value)
})

function textToArray(text: string) {
    const words = text.split(" ");
    return words.filter((word) => word);
}


function onBeforeType(event: any) {
    console.log(event.target.value)
    gameContent.value = filterAllowedChars(event.target.value)
    if (event.key == 'Backspace') {

    }
}


const isLoading = ref(false)

async function loadGameContent() {
    if (isLoading.value) return
    isLoading.value = true
    const res = await ApiContent.getTypingContent(props.maxLength)
    isLoading.value = false
    if (res.data) {
        gameContent.value = res.data
    } else {
        $toast.error(res.error!!.message)
    }
}


</script>
<template>
    <div class="g-content">
        <textarea @input="onBeforeType" rows="15" v-model="gameContent"></textarea>
        <div class="bottom">
            <span class="count">{{ countWords(gameContent) + "/" + maxLength }}</span>
            <button @click="loadGameContent" class="button secondary">
                <LoadingIcon v-if="isLoading" size="mini" />Generate Text
            </button>
        </div>
    </div>
</template>
<style scoped>
.g-content {
    position: relative;
}

.g-content textarea {
    width: 100%;
    display: block;
}

.g-content .bottom {
    height: 3em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

}


.g-content .count {
    /* position: absolute;
    bottom: 1em;
    right: 1em; */
    padding: 0.4em 1em;
    border-radius: 20px;
    background-color: var(--color-secondary);
    font-size: var(--small-font);
    color: white;
}
</style>