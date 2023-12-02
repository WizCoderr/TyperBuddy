<script setup lang='ts'>
import { generateSentence } from '~/data/wordSample';
import CheckBox from '../widgets/CheckBox.vue';
import RadioGroup from '../widgets/RadioGroup.vue';
import { SettingData } from '~/lib/DataType'
import { saveLocal, getLocalData } from '~/lib/LocalStorageManager'
import { ref, watch } from 'vue';

const props = defineProps<{
    isVisible: boolean
}>()

const emit = defineEmits<{
    (event: 'close', isSaved: boolean): void
}>()

async function saveAndClose(isSaved: boolean) {
    if (isSaved) saveLocal('setting-data', settingData.value)
    emit('close', isSaved)

}


const settingData = ref<SettingData>({
    isCapitalEnabled: false,
    isPunctuationEnabled: false,
    isBracketEnabled: false,
    isNumberEnabled: false,
    isStopCursorEnabled: false,
    isForgiveErrorEnabled: false,
    whitespaceType: 'hidden',
    cursorType: 'box',
    isSoundEnabled: false
})


// watch for props changes
watch(() => props.isVisible, (newValue, oldValue) => {
    if (newValue == true && newValue != oldValue) {

        // Dialog became visible, load the data
        const data = getLocalData<SettingData>('setting-data')
        if (data != null) settingData.value = data
    }
});


const tabActiveIndex = ref(0)

function changeTab(index: number) {
    tabActiveIndex.value = index
}

</script>
<template>
    <div v-if="isVisible" class="dialog">
        <div class="content">
            <h2>Settings</h2>

            <div class="tab-container">
                <div class="tabs">
                    <span @click="changeTab(0)" :class="{ 'active': tabActiveIndex == 0 }">Lesson</span>
                    <span @click="changeTab(1)" :class="{ 'active': tabActiveIndex == 1 }">Typing</span>
                </div>
                <div class="tab-contents">

                    <!-- tab content 1 -->
                    <template v-if="tabActiveIndex == 0">
                        <div class="content">
                            <h4>Options</h4>
                            <div class="flex-wrap">
                                <CheckBox :onChange="event => settingData.isCapitalEnabled = event"
                                    text="Enable capital letter" :isChecked="settingData.isCapitalEnabled" />
                                <CheckBox :onChange="event => settingData.isPunctuationEnabled = event"
                                    text="Enable punctuation characters" :isChecked="settingData.isPunctuationEnabled" />
                                <CheckBox :onChange="event => settingData.isBracketEnabled = event" text="Enable brackets"
                                    :isChecked="settingData.isBracketEnabled" />
                                <CheckBox :onChange="event => settingData.isNumberEnabled = event" text="Enable numbers"
                                    :isChecked="settingData.isNumberEnabled" />
                            </div>

                            <h4>Sample</h4>
                            <div class="demo-text" style="">{{ generateSentence(25, settingData.isPunctuationEnabled,
                                settingData.isCapitalEnabled,
                                settingData.isBracketEnabled, settingData.isNumberEnabled) }}</div>

                        </div>
                    </template>

                    <!-- tab content 2 -->
                    <template v-if="tabActiveIndex == 1">
                        <div class="content">
                            <h4>Options</h4>
                            <CheckBox :onChange="event => settingData.isStopCursorEnabled = event"
                                text="Stop the cursor when an error occurs." :isChecked="settingData.isStopCursorEnabled" />
                            <p class="hint">If enabled, the text cursor stops advancing until the right key is pressed at
                                the current position. If disabled, all errors will be accumulated in the text input field
                                and must be cleared with the delete key.</p>

                            <br>
                            <CheckBox :onChange="event => settingData.isForgiveErrorEnabled = event" text="Forgive errors"
                                :isChecked="settingData.isForgiveErrorEnabled" />
                            <p class="hint">Enabling this option makes the text input field forgive some kinds of errors by
                                automatically fixing them. These are errors such as typing a wrong character or skipping a
                                character.</p>

                            <br>
                            <h4>Text Appearance</h4>
                            <div class="demo-text"><span class="success">The quick brown</span> <span
                                    :class="{ 'caret-block': settingData.cursorType == 'block', 'caret-box': settingData.cursorType == 'box', 'caret-underline': settingData.cursorType == 'underline' }">f</span><span>ox
                                    jumps over the lazy dog.</span>
                            </div>
                            <br>
                            <!-- options -->
                            <div class="options">
                                <span>Whitespace</span>
                                <RadioGroup :onChange="event => settingData.whitespaceType = event" radioFor="whitespace"
                                    :checked="settingData.whitespaceType" :text="['Hidden', 'Bar', 'Bullet']"
                                    :checkValues="['hidden', 'bar', 'bullet']" />
                            </div>
                            <div class="options">
                                <span>Cursor</span>
                                <RadioGroup :onChange="event => settingData.cursorType = event" radioFor="cursor"
                                    :checked="settingData.cursorType" :text="['Block', 'Box', 'Underline']"
                                    :checkValues="['block', 'box', 'underline']" />
                            </div>

                            <!-- sound -->
                            <br>
                            <h4>Sound</h4>
                            <CheckBox :onChange="event => settingData.isSoundEnabled = event" text="Enable sounds"
                                :isChecked="settingData.isSoundEnabled" />
                            <p class="hint">It will play sounds on the specific event like:- error, success etc</p>



                        </div>
                    </template>

                </div>
            </div>

            <hr>
            <div class="buttons">
                <button @click="saveAndClose(false)" class="button primary outline">close</button>
                <button @click="saveAndClose(true)" class="button primary">Save</button>

            </div>

        </div>
    </div>
</template>
<style scoped>
@import '~/public/style/dialog.css';

.dialog .flex-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 2rem;
}


.dialog .demo-text {
    background-color: white;
    padding: 0.4em;
    font-family: monospace !important;
    letter-spacing: 3px;
    white-space: pre-wrap;
    font-size: var(--average-font);
}

.dialog .demo-text span.success {
    opacity: 0.6;
}

.dialog .demo-text span {
    font-family: inherit;
    letter-spacing: 3px;
    white-space: pre-wrap;
}

.dialog .demo-text .caret-block {
    background-color: var(--color-secondary);
    color: white;
}

.dialog .demo-text .caret-box {
    background-color: transparent;
    color: var(--color-secondary);
    border: 1px solid var(--color-secondary);
}

.dialog .demo-text .caret-underline {
    background-color: transparent;
    color: var(--color-secondary);
    border-bottom: 2px solid var(--color-secondary);
}

.dialog .options {
    display: grid;
    grid-template-columns: 200px auto;
    align-items: center;
    margin: 1rem 0;
}
</style>