<script setup lang='ts'>
import { generateSentence } from '~/data/wordSample';
import { SettingData, TypingReport } from '~/lib/DataType';
import { getKeyColor } from '~/lib/utils';
import PracticeSettingDialog from '~/components/dialog/PracticeSettingDialog.vue';
import PracticeCompleteDialog from '~/components/dialog/PracticeCompleteDialog.vue';
import { saveLocal, getLocalData } from '~/lib/LocalStorageManager'
import ApiStatistics from '~/lib/api/ApiStatistics';
import { usePracticeReportStore } from '~/store/practiceReport'
import { usePracticeLessonStore } from '~/store/practiceLesson'
import { useProfileStore } from '~/store/profile'

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const reportStore = usePracticeReportStore()
const lessonStore = usePracticeLessonStore()
const profileStore = useProfileStore()


const progressElement = ref<HTMLSpanElement>()
function updateProgress(progress: number) {
    if (progress == undefined) return
    progressElement.value!!.style.width = `${progress}%`

}


onMounted(function () {
    startLesson()
    const $toast = useToast();
    let instance = $toast.error('You did it!', {position: "bottom"});
})



function startLesson() {
    isCompleteDialogVisible.value = false
    lessonStore.updateLesson(40, true)
}

function restartLesson() {
    isCompleteDialogVisible.value = false
    lessonStore.restartLesson()
}





// &#x21B5; - line break symbol


// ------------------------ Dialog --------------------

const isCompleteDialogVisible = ref(false)
const dialogTypingReport = ref<TypingReport>({
    timeTaken: 0,
    totalWords: 0,
    totalCharacter: 0,
    totalError: 0,
    keyReport: [],
    averageWPM: 0,
    highestWPM: 0
})


const isSettingDialogVisible = ref(false)
function openSetting() {
    isSettingDialogVisible.value = true
}

function onSettingClose(isSaved: boolean) {
    isSettingDialogVisible.value = false

    if (isSaved) lessonStore.updateLesson(40, true)
}


async function onPracticeComplete(reportData: TypingReport) {

    dialogTypingReport.value.timeTaken = reportData.timeTaken
    dialogTypingReport.value.totalWords = reportData.totalWords
    dialogTypingReport.value.totalCharacter = reportData.totalCharacter
    dialogTypingReport.value.totalError = reportData.totalError
    dialogTypingReport.value.averageWPM = reportData.averageWPM
    dialogTypingReport.value.highestWPM = reportData.highestWPM
    dialogTypingReport.value.keyReport = reportData.keyReport

    isCompleteDialogVisible.value = true

    // sending report to server if user is signed in
    if (profileStore.profile != null) {
        console.log(await ApiStatistics.addStatistics(reportData))
    }

}



</script>
<template>
    <main>
        <Sidebar :activeTabIndex="0" />
        <section class="main">
            <div class="status-bar">
                <h3>Speed: {{ reportStore.currentTypingReport.averageWPM }} ( <span
                        :class="{ 'success': reportStore.typingSpeedPerformance[0] == '+' }">{{
                            reportStore.typingSpeedPerformance }}</span> )</h3>
                <h3>Error: {{ reportStore.currentTypingReport.totalError }} ( <span
                        :class="{ 'success': reportStore.typingAccuracyPerformance[0] == '+' }">{{
                            reportStore.typingAccuracyPerformance }}</span> )
                </h3>
                <div>
                    <button @click="openSetting()" class="button secondary">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                        </svg>
                        <span>Settings</span>
                    </button>
                </div>
            </div>
            <div class="key-status">
                <h3>All Keys:</h3>
                <div class="keys">
                    <div v-for="item in reportStore.currentTypingReport.keyReport"
                        :style="'background-color:' + getKeyColor(reportStore.keysMinValue, reportStore.keysMaxValue, item.correctCount - item.errorCount)">
                        <span>{{ item.key }}</span>
                    </div>
                </div>
            </div>
            <div class="typing-progress">
                <span class="track"></span>
                <span ref="progressElement" class="progress"></span>
            </div>

            <TypingArea :sentence="lessonStore.lesson" :message="'Click to play'" :onTypingCompleted="onPracticeComplete"
                :onSubmitTypingReport="reportStore.updateTypingReport" :onProgressChange="updateProgress"
                :is-edit-allowed="true" :forgive-error="true" :multiplayer="false" />
            <Keyboard />

        </section>
    </main>

    <PracticeSettingDialog :is-visible="isSettingDialogVisible" :onClose="event => onSettingClose(event)" />
    <PracticeCompleteDialog :onRestart="restartLesson" :onStart="startLesson" :test-data="dialogTypingReport"
        v-if="isCompleteDialogVisible" />
</template>
<style scoped>@import '../assets/css/common.css';</style>