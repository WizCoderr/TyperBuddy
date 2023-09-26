<script setup lang='ts'>
import { TyperData, TypingReport } from '~/lib/DataType';
import { countCorrectWords, getUniqueCharacters } from '~/lib/utils';

const prop = defineProps<{
    sentence: string
}>()


// watch for props changes
watch(() => prop.sentence, (newValue, oldValue) => {
    if (newValue != oldValue) {

        if (typingTextarea.value != undefined) typingTextarea.value!!.value = ''   // clear textarea value
        setupData(prop.sentence)
    }
});


const emit = defineEmits({
    ProgressChange: (progress: number) => {
        return progress
    },

    SubmitTypingReport: (data: TypingReport) => {
        return data
    },

    TypingCompleted: (data: TypingReport) => {
        return data
    },

    typing: (data: {
        cursorPos: number;
        speed: number;
        highestSpeed: number;
        errors: number;
    }) => {
        return data
    }

})



const typingReport: TypingReport = {
    totalWords: 0,
    totalCharacter: 0,
    totalError: 0,
    keyReport: [],
    averageWPM: 0,
    timeTaken: 0,
    highestWPM: 0
}


const typingTextarea = ref<HTMLTextAreaElement>()
const content = ref<HTMLDivElement>()
var isTypingFocus = false

onMounted(function () {

    if (typingTextarea == undefined) return
    typingTextarea.value!!.addEventListener('mousedown', function (event) {

        this.focus()
        event.preventDefault();
    });

    typingTextarea.value!!.addEventListener('copy', function (event) {
        event.preventDefault();
    });

    typingTextarea.value!!.addEventListener('paste', function (event) {
        event.preventDefault();
    });


    typingTextarea.value!!.addEventListener('focusin', function () {
        isTypingFocus = true
        setTimeout(updateReport, 1000)
    })

    typingTextarea.value!!.addEventListener('focusout', function () {
        isTypingFocus = false
    })

})

var dataContent = ''
var timeElapsed = 0
var previousTextLength = 0


function setupData(paragraph: string) {
    dataContent = paragraph
    previousTextLength = 0

    typingReport.timeTaken = 0
    typingReport.totalWords = dataContent.split(' ').length
    typingReport.totalCharacter = paragraph.length
    typingReport.totalError = 0
    typingReport.averageWPM = 0
    timeElapsed = 0

    typingReport.keyReport = []
    getUniqueCharacters(paragraph).forEach(char => {
        typingReport.keyReport.push({
            key: char,
            errorCount: 0,
            correctCount: 0
        })
    });

    manipulateText('')
    updateReport()
}



function updateReport() {
    if (isTypingFocus) {
        setTimeout(updateReport, 1000)
    }
    timeElapsed += 1

    // calculating word per minutes
    const wpm = countCorrectWords(typingTextarea.value!!.value, dataContent.slice(0, typingTextarea.value!!.value.length)) * 60 / timeElapsed
    typingReport.averageWPM = Math.round(wpm)

    typingReport.timeTaken = timeElapsed
    // update top speed
    if (typingReport.averageWPM > typingReport.highestWPM) {
        typingReport.highestWPM = typingReport.averageWPM
    }

    emit('SubmitTypingReport', typingReport)
}


const allWords = ref(Array<TyperData>())

function manipulateText(text: string) {

    if (typingTextarea == undefined) return


    // checking if last text is error | storing report for error data
    if (text.length > 0) {
        const lastIndex = text.length - 1
        if (text[lastIndex] != dataContent[lastIndex]) {

            // increase incorrect
            // skip if user is undo
            if (text.length > previousTextLength) {
                previousTextLength = text.length
                typingReport.totalError++
                const key = dataContent[lastIndex].toUpperCase()

                for (let index = 0; index < typingReport.keyReport.length; index++) {
                    if (typingReport.keyReport[index].key == key) {
                        typingReport.keyReport[index].errorCount++
                        break
                    }
                }
            }
        } else {

            // increase correct 
            const key = dataContent[lastIndex].toUpperCase()

            for (let index = 0; index < typingReport.keyReport.length; index++) {
                if (typingReport.keyReport[index].key == key) {
                    typingReport.keyReport[index].correctCount++
                    break
                }
            }
        }
        previousTextLength = text.length

        if (dataContent.length != 0 && text.length == dataContent.length) {
            isTypingFocus = false
            emit('TypingCompleted', typingReport)
        }
    }



    allWords.value = Array<TyperData>()
    // parsing text
    var successText = ''
    var errorText = ''
    const totalChar = Math.min(text.length, dataContent.length)

    for (let index = 0; index < totalChar; index++) {
        let charAt = dataContent[index]

        // handle correct text
        if (charAt == text[index]) {

            // adding error text if not empty
            if (errorText != '') {
                allWords.value.push({
                    class: 'error',
                    text: errorText
                })

                errorText = ''
            }

            successText += charAt
        } else {

            // adding success text if not empty
            if (successText != '') {
                allWords.value.push({
                    class: 'success',
                    text: successText
                })

                successText = ''
            }

            errorText += charAt
        }
    }


    // adding any left text
    if (errorText != '') {
        allWords.value.push({
            class: 'error',
            text: errorText
        })
    }

    if (successText != '') {
        allWords.value.push({
            class: 'success',
            text: successText
        })
    }


    // extracting the not typed text
    if (dataContent.length > text.length) {

        let normalText = ''
        let caretText = dataContent[totalChar]
        if ((dataContent.length - text.length) > 1) {
            normalText = dataContent.slice(totalChar + 1)
        }

        allWords.value.push({
            class: 'caret',
            text: caretText
        })

        if (normalText != '') {
            allWords.value.push({
                class: 'normal',
                text: normalText
            })
        }
    }

    // calculating progress
    const progress = text.length / dataContent.length * 100
    emit('ProgressChange', progress)

    emit('typing', {
        cursorPos: text.length,
        speed: typingReport.averageWPM,
        highestSpeed: typingReport.highestWPM,
        errors: typingReport.totalError
    })


    nextTick(() => checkForTypingEnd())
}




// scroll the page if content is typed
function checkForTypingEnd() {
    if (content == undefined) return
    const caret = content.value!!.querySelector('.caret') as HTMLSpanElement | null
    if (caret == null) return

    const height = content.value!!.offsetHeight
    const caretBottom = caret.offsetTop + caret.offsetHeight

    const currentScroll = content.value!!.scrollTop
    if (caretBottom > height) {
        content.value!!.scrollTo(0, caret.offsetTop)
    } else if (caret.offsetTop < currentScroll) {
        content.value!!.scrollTop -= height
    }
}



</script>
<template>
    <div class="typing-content">
        <div class="content-holder">
            <textarea ref="typingTextarea" id="typing-textarea" :maxlength="dataContent.length"
                @input="event => manipulateText((event.target as any).value)"></textarea>
            <div ref="content" class="content">
                <span v-for="word in allWords" :class="word.class">{{ word.text }}</span>
            </div>

        </div>
    </div>
</template>
<style scoped>
/* -------------------- Typing content ------------------- */
.typing-content {
    width: 100%;
    max-width: 1000px;
    margin: auto;
    background-color: white;
    border-radius: 0.6rem;
    color: var(--color-on-surface);
    line-height: 1.8;
    padding: 1rem 1.6rem;
    font-size: var(--big-2-font);
}

.typing-content .success {
    color: var(--color-on-surface);
    opacity: 0.6;
}

.typing-content .error {
    color: var(--color-on-error);
    background-color: var(--color-error);
}

.typing-content .normal {
    opacity: 1;
}

.typing-content span {
    font-family: monospace !important;
    letter-spacing: 3px;
    white-space: pre-wrap;
}

.typing-content .content-holder {
    position: relative;
}





.typing-content .caret {
    background-color: var(--color-on-surface);
    color: white;
}


.typing-content .content {
    height: 300px;
    overflow: hidden;
    filter: blur(2px);
    scroll-behavior: smooth;
}

.typing-content textarea {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    outline: none;
    z-index: 5;
    border: none;
    opacity: 0;
    font-family: monospace !important;
    letter-spacing: 3px;
    line-height: 1.8;
    font-size: var(--big-2-font);
}

.typing-content textarea:focus+.content {
    filter: blur(0) !important;
}

.sample-text {
    opacity: 0;
    position: absolute;
    user-select: none;
    top: 0;
}
</style>