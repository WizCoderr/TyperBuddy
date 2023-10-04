<script setup lang='ts'>
import { TyperData, TypingReport } from '~/lib/DataType';
import { countCorrectWords, getUniqueCharacters } from '~/lib/utils';

const prop = defineProps<{
    sentence: string,
    isEditAllowed: boolean,
    message: string
    forgiveError: boolean,
    multiplayer: boolean
}>()


// watch for props changes
watch(() => prop.sentence, (newValue, oldValue) => {
    if (newValue != oldValue) {

        if (typingTextarea.value != undefined) typingTextarea.value!!.value = ''   // clear textarea value
        setupData(prop.sentence)
    }
});

watch(() => prop.isEditAllowed, (newValue, oldValue) => {
    if (newValue != oldValue) {
        if (newValue) {
            typingTextarea.value!!.focus()
        }else{
            typingTextarea.value!!.blur()
        }
    }
})


const emit = defineEmits({
    progressChange: (progress: number) => {
        return progress
    },

    submitTypingReport: (data: TypingReport) => {
        return data
    },

    typingCompleted: (data: TypingReport) => {
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
const isTypingFocus = ref(false)

onMounted(function () {

    if (typingTextarea == undefined) return
    typingTextarea.value!!.addEventListener('mousedown', function (event) {

        if (prop.isEditAllowed) {
            this.focus()
        }
        event.preventDefault();
    });

    typingTextarea.value!!.addEventListener('copy', function (event) {
        event.preventDefault();
    });

    typingTextarea.value!!.addEventListener('paste', function (event) {
        event.preventDefault();
    });


    typingTextarea.value!!.addEventListener('focusin', function () {

        if (prop.multiplayer == false) {
            if (prop.isEditAllowed) {
                isTypingFocus.value = true
            }
            setTimeout(updateReport, 1000)
        }

    })

    typingTextarea.value!!.addEventListener('focusout', function () {

        if (prop.multiplayer == false) {
            if (prop.isEditAllowed) {
                isTypingFocus.value = false
            }
        }

    })


    // for multiplayer
    if (prop.multiplayer) {
        setTimeout(updateReport, 1000)
    }

})

var dataContent = ''
var timeElapsed = 0
var previousTextLength = 0
let errorsIndex = Array<number>()


function setupData(paragraph: string) {
    dataContent = paragraph
    previousTextLength = 0
    correctTypingIndex.value = -1
    errorsIndex = []
    typingTextarea.value!!.value = ""

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
    if (prop.multiplayer == false) {
        if (isTypingFocus) {
            setTimeout(updateReport, 1000)
        }
    }else{
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

    emit('submitTypingReport', typingReport)
}


const correctTypingIndex = ref(-1)
const allWords = ref(Array<TyperData>())

function manipulateText(text: string) {

    if (typingTextarea == undefined) return


    // checking if last text is error | storing report for error data
    if (text.length > 0) {
        const lastIndex = text.length - 1

        if (text[lastIndex] != dataContent[lastIndex]) {

            // store error char index
            if (errorsIndex.indexOf(lastIndex) == -1) {
                errorsIndex.push(lastIndex)
            }

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


        if (prop.forgiveError == true) {
            if (text.length == dataContent.length) {
                isTypingFocus.value = false
                emit('typingCompleted', typingReport)
            }
        } else {
            if ((correctTypingIndex.value + 1) == dataContent.length) {
                isTypingFocus.value = false
                emit('typingCompleted', typingReport)
            }
        }
    }


    allWords.value = Array<TyperData>()
    // parsing text
    var successText = ''
    var errorText = ''
    const totalChar = Math.min(text.length, dataContent.length)

    if (prop.forgiveError == true) {
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

                if (errorsIndex.indexOf(index) != -1) {
                    if (successText != '') {
                        allWords.value.push({
                            class: 'success',
                            text: successText
                        })

                        successText = ''
                    }

                    allWords.value.push({
                        class: 'error-outline',
                        text: charAt
                    })

                } else {
                    successText += charAt
                }

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

    } else {

        let isErrorFound = false
        for (let index = 0; index < totalChar; index++) {
            let charAt = dataContent[index]

            // handle correct text
            if (isErrorFound == false) {

                if (charAt == text[index]) {

                    if (errorsIndex.indexOf(index) != -1) {
                        if (successText != '') {
                            allWords.value.push({
                                class: 'success',
                                text: successText
                            })

                            successText = ''
                        }

                        allWords.value.push({
                            class: 'error-outline',
                            text: charAt
                        })

                    } else {
                        successText += charAt
                    }

                    correctTypingIndex.value = index
                } else {
                    isErrorFound = true
                    errorText += charAt
                }
            } else {
                errorText += charAt
            }
        }
    }

    // adding any left text

    if (successText != '') {
        allWords.value.push({
            class: 'success',
            text: successText
        })
    }

    if (errorText != '') {
        allWords.value.push({
            class: 'error',
            text: errorText
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
    let cursorPos = 0
    if (prop.forgiveError == true) {
        const progress = text.length / dataContent.length * 100
        emit('progressChange', progress)
        cursorPos = text.length
    } else {

        let index = correctTypingIndex.value
        if (index < 0) index = 0

        const progress = index / dataContent.length * 100
        emit('progressChange', progress)
        cursorPos = index
    }



    // used for multiplayer
    emit('typing', {
        cursorPos: cursorPos,
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



function onBeforeType(event: any) {
    if (prop.forgiveError == true) return

    if (event.key == 'Backspace') {
        console.log("back")
        console.log(correctTypingIndex.value)
        if (correctTypingIndex.value < event.target.value.length - 1 || correctTypingIndex.value == -1) {
            // do nothing 
        } else {
            event.preventDefault()
        }
    }
}

</script>
<template>
    <div class="typing-content">
        <div class="content-holder">
            <textarea ref="typingTextarea" id="typing-textarea" :maxlength="dataContent.length" @keydown="onBeforeType"
                @input="event => manipulateText((event.target as any).value)"></textarea>
            <div ref="content" class="content">
                <span v-for="word in allWords" :class="word.class">{{ word.text }}</span>
            </div>

        </div>


        <p v-if="!isEditAllowed" class="message">Waiting for next round</p>
        <p v-if="isEditAllowed && !isTypingFocus" class="message">Click to play</p>
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
    position: relative;
}

.typing-content .message {
    position: absolute;
    padding: 0;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    text-align: center;
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

.typing-content .error-outline {
    color: var(--color-error);
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
    filter: blur(4px);
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