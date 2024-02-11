
<script setup lang='ts'>
// import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import type { MyChartData, StatisticPageData } from '~/lib/DataType';
import { timeToWord } from '~/lib/utils'
import Heatmap from '~/components/Heatmap.vue';
import { useFetch } from 'nuxt/app';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSeoMeta } from '#imports';
import GameLayout from '@/layouts/GameLayout.vue';

const isGraphHidden = ref(true)
const graphType = ref('bar')

const router = useRouter()
const { params } = router.currentRoute.value

// @ts-ignore:
const serverUrl = import.meta.env.VITE_SERVER_URL
const dataUrl = serverUrl + '/statistics/report/' + params.user_id


let pageData: StatisticPageData = {
    todayStat: [],
    allTimeStat: []
}

useSeoMeta({
    title: 'Statistics',
})


// fetch data from server for ssr
const { data, error } = await useFetch(dataUrl)
if (data.value != null) {
    pageData = data.value as StatisticPageData


    // fill with empty data if data not exist
    if (pageData.todayStat.length == 0) {
        pageData.todayStat.push({
            timeTaken: 0,
            totalWords: 0,
            totalCharacter: 0,
            totalError: 0,
            keyReport: [],
            averageWPM: 0,
            highestWPM: 0
        })
    }

    if (pageData.allTimeStat.length == 0) {
        pageData.allTimeStat.push({
            timeTaken: 0,
            totalWords: 0,
            totalCharacter: 0,
            totalError: 0,
            keyReport: [],
            averageWPM: 0,
            highestWPM: 0
        })
    }

} else {
    throw { message: 'Requested page could not be found.', statusCode: error.value?.statusCode || 404 }
}


// --------------------- data --------------------------------
const todayFirstDataset = ref<MyChartData>({
    chartLabel: 'Accuracy Keys',
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'],
    labelData: [20, 30, 40, 10, 5, 25, 23],
    borderColor: '',
    backgroundColor: ''
})

const todaySecondDataset = ref<MyChartData>({
    chartLabel: 'Problematic Keys',
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'],
    labelData: [10, 50, 15, 5, 5, 80, 45],
    borderColor: '',
    backgroundColor: ''
})


const allTimeFirstDataset = ref<MyChartData>({
    chartLabel: 'Accuracy Keys',
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    labelData: [20, 30, 40, 10, 5, 25, 23],
    borderColor: '',
    backgroundColor: ''
})

const allTimeSecondDataset = ref<MyChartData>({
    chartLabel: 'Problematic Keys',
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    labelData: [150, 30, 5, 100, 5, 90, 15],
    borderColor: '',
    backgroundColor: ''
})



onMounted(function () {
    setupData()

})


async function setupData() {
    setupChartData()
    isGraphHidden.value = false
}

function setupChartData() {

    todayFirstDataset.value.borderColor = getThemeColor('--graph-success')
    todayFirstDataset.value.backgroundColor = getThemeColor('--graph-success-light')
    todaySecondDataset.value.borderColor = getThemeColor('--graph-error')
    todaySecondDataset.value.backgroundColor = getThemeColor('--graph-error-light')

    allTimeFirstDataset.value.borderColor = getThemeColor('--graph-success')
    allTimeFirstDataset.value.backgroundColor = getThemeColor('--graph-success-light')
    allTimeSecondDataset.value.borderColor = getThemeColor('--graph-error')
    allTimeSecondDataset.value.backgroundColor = getThemeColor('--graph-error-light')


    // setting data
    let labels = Array<string>()
    let correctValues = Array<number>()
    let errorValues = Array<number>()
    for (const item of pageData.todayStat[0].keyReport) {
        labels.push(item.key)
        correctValues.push(item.correctCount)
        errorValues.push(item.errorCount)
    }

    todayFirstDataset.value.labels = labels.slice()
    todayFirstDataset.value.labelData = correctValues.slice()
    todaySecondDataset.value.labels = labels.slice()
    todaySecondDataset.value.labelData = errorValues.slice()


    // all time stat
    labels = []
    correctValues = []
    errorValues = []
    for (const item of pageData.allTimeStat[0].keyReport) {
        labels.push(item.key)
        correctValues.push(item.correctCount)
        errorValues.push(item.errorCount)
    }

    allTimeFirstDataset.value.labels = labels.slice()
    allTimeFirstDataset.value.labelData = correctValues.slice()
    allTimeSecondDataset.value.labels = labels.slice()
    allTimeSecondDataset.value.labelData = errorValues.slice()

}


function getThemeColor(name: string) {
    return getComputedStyle(document.body).getPropertyValue(name);
}

</script>


<template>
    <GameLayout>
        <h2>Statistics</h2>
        <p>This is a page with detailed statistics about your learning progress. The more lessons you complete, the more
            detailed and accurate these statistics will be.</p>

        <hr>
        <h3>Statistics for Today:</h3>
        <div class="status-chips" v-for="stat in pageData.todayStat">
            <div>
                <span>Total Time</span>
                <span>{{ timeToWord(stat.timeTaken) }}</span>
            </div>
            <div>
                <span>Total Words</span>
                <span>{{ stat.totalWords.toLocaleString() }}</span>
            </div>
            <div>
                <span>Total Chars</span>
                <span>{{ stat.totalCharacter.toLocaleString() }}</span>
            </div>
            <div>
                <span>Accuracy</span>
                <span>{{ 100 - Math.round(stat.totalError / stat.totalCharacter * 100) }}%</span>
            </div>
            <div>
                <span>Error</span>
                <span>{{ stat.totalError.toLocaleString() }}</span>
            </div>
            <div>
                <span>Highest Speed (WPM)</span>
                <span>{{ stat.highestWPM }} WPM</span>
            </div>
            <div>
                <span>Average Speed (WPM)</span>
                <span>{{ stat.averageWPM }} WPM</span>
            </div>
        </div>

        <div class="chart-container" v-if="!isGraphHidden">
            <select v-model="graphType">
                <option value="bar">Bar</option>
                <option value="line">Line</option>
            </select>

            <div class="chart-holder">
                <GraphChart :mode="graphType" :firstDataset="todaySecondDataset" :secondDataset="todayFirstDataset" />
            </div>
        </div>

        <hr>
        <h3>All Time Statistics:</h3>
        <div class="status-chips" v-for="stat in pageData.allTimeStat">
            <div>
                <span>Total Time</span>
                <span>{{ timeToWord(stat.timeTaken) }}</span>
            </div>
            <div>
                <span>Total Words</span>
                <span>{{ stat.totalWords.toLocaleString() }}</span>
            </div>
            <div>
                <span>Total Chars</span>
                <span>{{ stat.totalCharacter.toLocaleString() }}</span>
            </div>
            <div>
                <span>Accuracy</span>
                <span>{{ 100 - Math.round(stat.totalError / stat.totalCharacter * 100) }}%</span>
            </div>
            <div>
                <span>Error</span>
                <span>{{ stat.totalError.toLocaleString() }}</span>
            </div>
            <div>
                <span>Highest Speed (WPM)</span>
                <span>{{ stat.highestWPM }} WPM</span>
            </div>
            <div>
                <span>Average Speed (WPM)</span>
                <span>{{ stat.averageWPM }} WPM</span>
            </div>
        </div>

        <div class="chart-container" v-if="!isGraphHidden">
            <select v-model="graphType">
                <option value="bar">Bar</option>
                <option value="line">Line</option>
            </select>

            <div class="chart-holder">
                <GraphChart :mode="graphType" :firstDataset="allTimeSecondDataset" :secondDataset="allTimeFirstDataset" />
            </div>
        </div>

        <hr>

        <!-- <Heatmap/> -->

        <!-- <CalendarHeatmap :values="[{ date: '2018-9-22', count: 6 }]" :end-date="2018-9-22"/> -->

    </GameLayout>
</template>
<style scoped>
main .status-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1rem 0;
}

main .status-chips div {
    background-color: var(--color-surface-variant);
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius-2);
}

main .status-chips span {
    display: block;
    text-align: center;
    font-size: var(--medium-2-font);
    font-weight: 600;
}

main .status-chips div span:first-child {
    font-size: var(--small-font);
    margin-bottom: 0.6rem;
    color: var(--color-secondary);
    font-weight: normal;
}

.chart-container select {
    margin-left: auto;
    display: block;
    padding: 0.6rem 1rem;
    font-size: var(--medium-font);
    border: none;
    outline: none;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    border-radius: var(--border-radius);
}

.chart-holder {
    margin-top: 2rem;
    padding-top: 1rem;
    padding-left: 0.4rem;
    background-color: var(--color-surface-variant);
    border-radius: var(--border-radius-2);
}

.chart-holder canvas {
    width: 100%;
    aspect-ratio: 5/1;
}
</style>