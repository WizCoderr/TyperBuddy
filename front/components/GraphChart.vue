
<script setup lang='ts'>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Filler
} from 'chart.js'

import { Bar, Line } from 'vue-chartjs'
import {MyChartData} from '../lib/DataType'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineController, LineElement, PointElement, Filler, Title, Tooltip, Legend)

const prop = defineProps<{
    mode: String,
    firstDataset: MyChartData,
    secondDataset: MyChartData
}>()


// Note: Mode = bar | line


const chartData = ref({
    labels: prop.firstDataset.labels as string[],
    datasets: [{
        label: prop.firstDataset.chartLabel as string,
        data: prop.firstDataset.labelData as number[],
        borderColor: prop.firstDataset.borderColor as string,
        backgroundColor: prop.firstDataset.backgroundColor as string,
        borderWidth: 1,
    },
    {
        label: prop.secondDataset.chartLabel as string,
        data: prop.secondDataset.labelData as number[],
        borderColor: prop.secondDataset.borderColor as string,
        backgroundColor: prop.secondDataset.backgroundColor as string,
        borderWidth: 1,
    }]
})

const chartOptions = {
    scales: {
        x: {
            grid: {
                display: true
            },
            stacked: true
        },
        y: {
            grid: {
                display: true
            }
            
        }
    },
}


onMounted(function () {

    // previousTypingReport.keysReport.forEach(keyReport => {
    //     chartData.value.labels.push(keyReport.key)
    //     chartData.value.datasets[0].data.push(keyReport.correctCount)
    // });
})




</script>
<template>
    <Bar v-if="mode == 'bar'" :options="chartOptions" :data="chartData" />
    <Line v-else-if="mode == 'line'" :options="chartOptions" :data="chartData" />
</template>
<style scoped></style>