<script setup lang='ts'>
import { TyperData, TypingReport } from '~/lib/DataType';
import { getUniqueCharacters } from '~/lib/utils';

const emit = defineEmits({
    ProgressChange: (progress: number) => {
        return progress
    },

    SubmitTypingReport: (data: TypingReport) => {
        return data
    }
})


const typingReport: TypingReport = {
    totalWords: 0,
    totalCharCount: 0,
    errorCount: 0,
    keysReport: [],
    averageSpeed: 0,
    dateTime: 0,
    topSpeed: 0
}


const typingTextarea = ref<HTMLTextAreaElement>()
const content = ref<HTMLDivElement>()
var isTypingFocus = false

onMounted(function () {
    setupData(tempData)

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


const tempData = "Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
var dataContent = ''
var wordList = Array<string>()
var seconds = 0
var previousTextLength = 0


function setupData(paragraph: string) {
    dataContent = paragraph
    wordList = dataContent.split(' ')
    previousTextLength = 0

    typingReport.dateTime = new Date().getUTCMilliseconds()
    typingReport.totalWords = wordList.length
    typingReport.totalCharCount = paragraph.length
    typingReport.errorCount = 0
    typingReport.averageSpeed = 0
    seconds = 0

    typingReport.keysReport = []
    getUniqueCharacters(paragraph).forEach(char => {
        typingReport.keysReport.push({
            key: char,
            errorCount: 0,
            correctCount: 0
        })
    });

    manipulateText('')
    updateReport()
}


// return all typed words
function getTotalTypedWords(totalCharTyped: number) {
    let lengthCount = 0
    let wordCount = 0

    wordList.forEach(word => {
        lengthCount += word.length
        if (lengthCount >= totalCharTyped) {
            return wordCount
        }
        wordCount++
        lengthCount++               // adding one space
    });

    return wordCount
}



function updateReport() {
    if (isTypingFocus) {
        seconds++
        setTimeout(updateReport, 1000)
    }

    // calculating word per minntes
    const wpm = getTotalTypedWords(typingTextarea.value!!.value.length) * 60 / seconds
    typingReport.averageSpeed = Math.round(wpm)

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
                typingReport.errorCount++
                const key = dataContent[lastIndex].toUpperCase()

                for (let index = 0; index < typingReport.keysReport.length; index++) {
                    if (typingReport.keysReport[index].key == key) {
                        typingReport.keysReport[index].errorCount++
                        break
                    }
                }
            }
        } else {

            // increase correct 
            const key = dataContent[lastIndex].toUpperCase()

            for (let index = 0; index < typingReport.keysReport.length; index++) {
                if (typingReport.keysReport[index].key == key) {
                    typingReport.keysReport[index].correctCount++
                    break
                }
            }
        }

        previousTextLength = text.length
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
    max-width: 800px;
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
}

.typing-content .error {
    color: var(--color-on-error);
    background-color: var(--color-error);
}

.typing-content .normal {
    opacity: 0.75;
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