<script setup lang='ts'>
import { TypingReport } from '~/lib/DataType';
import { generateSentence } from '~/data/wordSample';
import CheckBox from '../widgets/CheckBox.vue';
import RadioGroup from '../widgets/RadioGroup.vue';

defineProps<{
    testData: TypingReport
}>()




const isCapitalEnabled = ref(false)
const isPunctuationEnabled = ref(false)
const isBracketEnabled = ref(false)
const isNumberEnabled = ref(false)

const isStopCursorEnabled = ref(false)
const isForgiveErrorEnabled = ref(false)

const tabActiveIndex = ref(0)


function changeTab(index: number) {
    tabActiveIndex.value = index
}

</script>
<template>
    <div class="dialog">
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

                            <div class="flex-wrap">
                                <CheckBox :onChange="(isChecked) => { isCapitalEnabled = isChecked }"
                                    text="Enable capital letter" :isChecked="isCapitalEnabled" />
                                <CheckBox :onChange="(isChecked) => { isPunctuationEnabled = isChecked }"
                                    text="Enable punctuation characters" :isChecked="isPunctuationEnabled" />
                                <CheckBox :onChange="(isChecked) => { isBracketEnabled = isChecked }" text="Enable brackets"
                                    :isChecked="isBracketEnabled" />
                                <CheckBox :onChange="(isChecked) => { isNumberEnabled = isChecked }" text="Enable numbers"
                                    :isChecked="isNumberEnabled" />
                            </div>
                            {{ isCapitalEnabled }}

                            <h4>Sample</h4>
                            <div class="demo-text" style="">{{ generateSentence(25, isPunctuationEnabled, isCapitalEnabled,
                                isBracketEnabled, isNumberEnabled) }}</div>

                        </div>
                    </template>

                    <!-- tab content 2 -->
                    <template v-if="tabActiveIndex == 1">
                        <div class="content">
                            <CheckBox :onChange="(isChecked) => { isStopCursorEnabled = isChecked }"
                                text="Stop the cursor when an error occurs." :isChecked="isStopCursorEnabled" />
                            <p class="hint">If enabled, the text cursor stops advancing until the right key is pressed at
                                the current position. If disabled, all errors will be accumulated in the text input field
                                and must be cleared with the delete key.</p>

                            <br>
                            <CheckBox :onChange="(isChecked) => { isForgiveErrorEnabled = isChecked }" text="Forgive errors"
                                :isChecked="isForgiveErrorEnabled" />
                            <p class="hint">Enabling this option makes the text input field forgive some kinds of errors by
                                automatically fixing them. These are errors such as typing a wrong character or skipping a
                                character.</p>

                            <h4>Text Appearance</h4>
                            <div class="demo-text"><span class="success">The quick brown</span> <span
                                    class="caret">f</span><span>ox jumps over the lazy dog.</span></div>

                            <!-- options -->
                            <div class="options">
                                <span>Whitespace</span>
                                <RadioGroup radioFor="whitespace" checked="whitespace" :text="['Hidden', 'Bar', 'Bullet']" :checkValues="['whitespace', 'bar', 'bullet']"/>
                            </div>
                            <div class="options">
                                <span>Cursor</span>
                                <RadioGroup radioFor="cursor" checked="block" :text="['Block', 'Box', 'Underline']" :checkValues="['block', 'box', 'underline']"/>
                            </div>
                        </div>
                    </template>

                </div>
            </div>

            <hr>
            <div class="buttons">
                <button class="button primary outline">close</button>
                <button class="button primary">Save</button>

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

.dialog .demo-text .caret {
    background-color: var(--color-on-surface);
    color: white;
}

.dialog .options{
    display: grid;
    grid-template-columns: 200px auto;   
    align-items: center;
    margin: 1.5rem 0; 
}
</style>