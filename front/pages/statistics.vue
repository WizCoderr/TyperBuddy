
<script setup lang='ts'>
import { Vue2 } from 'nuxt/dist/app/compat/vue-demi';
import { MyChartData } from '~/lib/DataType';

const isGraphHidden = ref(true)
const graphType = ref('bar')


// --------------------- data --------------------------------
const todayFirstDataset = ref<MyChartData>({
    chartLabel: 'Accuracy Keys',
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    labelData: [20, 30, 40, 10, 5, 25, 23],
    borderColor: '',
    backgroundColor: ''
})

const todaySecondDataset = ref<MyChartData>({
    chartLabel: 'Problematic Keys',
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
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


function setupData() {
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
}


function getThemeColor(name: string) {
    return getComputedStyle(document.body).getPropertyValue(name);
}

</script>


<template>
    <main>
        <Sidebar :activeTabIndex="1" />
        <section class="main">
            <h2>Statistics</h2>
            <p>This is a page with detailed statistics about your learning progress. The more lessons you complete, the more
                detailed and accurate these statistics will be.</p>

            <hr>
            <h3>Statistics for Today:</h3>
            <div class="status-chips">
                <div>
                    <span>Total Time</span>
                    <span>12 hours 20 min</span>
                </div>
                <div>
                    <span>Total Words</span>
                    <span>12,000</span>
                </div>
                <div>
                    <span>Total Chars</span>
                    <span>24,000</span>
                </div>
                <div>
                    <span>Accuracy</span>
                    <span>65%</span>
                </div>
                <div>
                    <span>Error</span>
                    <span>362</span>
                </div>
                <div>
                    <span>Highest Speed</span>
                    <span>32 WPM</span>
                </div>
                <div>
                    <span>Lowest Speed</span>
                    <span>8 WPM</span>
                </div>
                <div>
                    <span>Average Speed</span>
                    <span>28 WPM</span>
                </div>
            </div>

            <div class="chart-container" v-if="!isGraphHidden">
                <select v-model="graphType">
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                </select>

                <div class="chart-holder">
                    <GraphChart :mode="graphType" :firstDataset="todayFirstDataset"
                        :secondDataset="todaySecondDataset" />
                </div>
            </div>

            <hr>
            <h3>Statistics for Today:</h3>
            <div class="status-chips">
                <div>
                    <span>Total Time</span>
                    <span>12 hours 20 min</span>
                </div>
                <div>
                    <span>Total Words</span>
                    <span>12,000</span>
                </div>
                <div>
                    <span>Total Chars</span>
                    <span>24,000</span>
                </div>
                <div>
                    <span>Accuracy</span>
                    <span>65%</span>
                </div>
                <div>
                    <span>Error</span>
                    <span>362</span>
                </div>
                <div>
                    <span>Highest Speed</span>
                    <span>32 WPM</span>
                </div>
                <div>
                    <span>Lowest Speed</span>
                    <span>8 WPM</span>
                </div>
                <div>
                    <span>Average Speed</span>
                    <span>28 WPM</span>
                </div>
            </div>

            <div class="chart-container" v-if="!isGraphHidden">
                <select v-model="graphType">
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                </select>

                <div class="chart-holder">
                    <GraphChart :mode="graphType" :firstDataset="allTimeFirstDataset"
                        :secondDataset="allTimeSecondDataset" />
                </div>
            </div>
        </section>
    </main>
</template>
<style scoped>
.main {
    max-width: 1000px;
}

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
    aspect-ratio: 4/1;
    padding-left: 0.4rem;
    background-color: var(--color-surface-variant);
    border-radius: var(--border-radius-2);
}

.chart-holder canvas {
    width: 100%;
    height: 100%;
}
</style>