<script setup lang='ts'>
import { TypingReport } from '~/lib/DataType';
import { getKeyColor } from '~/lib/utils';


const progressElement = ref<HTMLSpanElement>()
function updateProgress(progress: number) {
    if (progress == undefined) return
    progressElement.value!!.style.width = `${progress}%`

}



const previousTypingReport: TypingReport = {
    dateTime: 0,
    totalWords: 0,
    totalCharCount: 0,
    errorCount: 10,
    keysReport: [],
    averageSpeed: 10
}

const currentTypingReport = ref<TypingReport>({
    dateTime: 0,
    totalWords: 0,
    totalCharCount: 0,
    errorCount: 0,
    keysReport: [],
    averageSpeed: 0
})

const typingSpeedPerformance = ref('+0%')
const typingAccuracyPerformance = ref('+0%')
var keysMaxValue = 0
var keysMinValue = 0

function updateTypingReport(reportData: TypingReport) {

    // calculating maxValue and minValue
    reportData.keysReport.forEach(data => {
        const change = data.correctCount - data.errorCount
        if(change > keysMaxValue){
            keysMaxValue = change
        }else if(change < keysMinValue){
            keysMinValue = change
        }
    });

    // update key report
    currentTypingReport.value.keysReport = reportData.keysReport

    // calculating speed change percentage
    currentTypingReport.value.averageSpeed = reportData.averageSpeed

    const speedChange = Math.round((previousTypingReport.averageSpeed - currentTypingReport.value.averageSpeed) / previousTypingReport.averageSpeed * 100)
    if (speedChange <= 0) {
        typingSpeedPerformance.value = `+${Math.abs(speedChange)}%`
    } else {
        typingSpeedPerformance.value = `-${speedChange}%`
    }


    // calculating typing accuracy percentage
    currentTypingReport.value.errorCount = reportData.errorCount

    const accuracyChange = Math.round((previousTypingReport.errorCount - currentTypingReport.value.errorCount) / previousTypingReport.errorCount * 100)
    if (accuracyChange >= 0) {
        typingAccuracyPerformance.value = `+${accuracyChange}%`
    } else {
        typingAccuracyPerformance.value = `${accuracyChange}%`
    }



    console.log(reportData)
}

</script>
<template>
    <main>
        <Sidebar />
        <section class="main">
            <div class="status-bar">
                <h3>Speed: {{ currentTypingReport.averageSpeed }} ( {{ typingSpeedPerformance }})</h3>
                <h3>Error: {{ currentTypingReport.errorCount }} ( {{ typingAccuracyPerformance }} )</h3>
            </div>
            <div class="key-status">
                <h3>All Keys:</h3>
                <div class="keys">
                    <div v-for="item in currentTypingReport.keysReport" :style="'background-color:' + getKeyColor(keysMinValue, keysMaxValue, item.correctCount - item.errorCount)">
                        <span>{{ item.key }}</span>
                    </div>
                </div>
            </div>
            <div class="typing-progress">
                <span class="track"></span>
                <span ref="progressElement" class="progress"></span>
            </div>

            <TypingArea :onSubmitTypingReport="(data) => updateTypingReport(data)"
                :onProgressChange="(progress) => updateProgress(progress)" />
            <Keyboard />

        </section>
    </main>
</template>
<style scoped>
main {
    background-color: var(--color-surface);
    display: grid;
    grid-template-columns: 300px auto;
    width: 100%;
    overflow: auto;
}


/* --------------------- Main ----------------- */

.main {
    margin: var(--page-margin);
}

.main .status-bar {
    display: flex;
    flex-direction: row;
    gap: 4rem;
}

.main .status-bar h3 {
    white-space: nowrap;
}

.main .key-status {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.main .key-status h3 {
    white-space: nowrap;
}

.main .key-status .keys {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2px;
}

.main .key-status .keys div {
    width: 2rem;
    height: 2rem;
    background-color: var(--color-surface-variant);
    display: flex;
    align-items: center;
    justify-content: center;
}

.main .key-status span {
    font-size: var(--average-font);
    color: var(--color-on-surface);
}


.typing-progress {
    position: relative;
    height: 5rem;
    margin: 0 1rem;
}

.typing-progress .track {
    width: 100%;
    background-color: var(--color-surface-dark);
    height: 4px;
    position: absolute;
    left: 0;
    z-index: 1;
    top: 50%;
    translate: 0 -50%;
}



.typing-progress .track::after {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    display: inline-block;
    background-color: var(--color-surface-dark);
    position: absolute;
    right: 0;
    top: 50%;
    z-index: 1;
    translate: 50% -50%;
}

.typing-progress .progress {
    width: 0%;
    background-color: var(--color-secondary);
    height: 6px;
    position: absolute;
    z-index: 2;
    top: 50%;
    translate: 0 -50%;
}

.typing-progress .progress::before {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    display: inline-block;
    background-color: var(--color-secondary);
    position: absolute;
    top: 50%;
    z-index: 2;
    translate: -50% -50%;
}

.typing-progress .progress::after {
    content: "";
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 2rem;
    display: inline-block;
    background-color: white;
    border: 4px solid var(--color-secondary);
    position: absolute;
    right: 0;
    top: 50%;
    z-index: 2;
    translate: 50% -50%;
}



@media only screen and (max-width: 1200px) {
    main {
        grid-template-columns: 220px auto;
    }
}
</style>