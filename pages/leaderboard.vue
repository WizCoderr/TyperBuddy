<script setup lang='ts'>
import { NuxtLink } from '#components'
import { useSeoMeta } from '#imports';
import ago from 'ts-ago'
import { ref, onMounted } from 'vue';
import { AxiosResult, Leaderboard } from '~/lib/DataType';
import ApiLeaderboard from '~/lib/api/ApiLeaderboard';
import { RGBColor, getColor } from '~/lib/utils';
import { useProfileStore } from '~/store/profile';

import {ArrowUpIcon} from '../components/icons'

const isLoaded = ref(false)
const leaderboard = ref<Array<Leaderboard>>()
const colorsMap = new Map<string, string>()

const profileStore = useProfileStore()
onMounted(setup)

useSeoMeta({
    title: 'Leaderboard',
})



const redColor: RGBColor = [174, 32, 18]
const greenColor: RGBColor = [45, 198, 83]


async function setup() {

    // call until profile loaded
    if (!profileStore.isLoaded) {
        setTimeout(setup, 500)
        return
    }

    let result: AxiosResult<Leaderboard[]>
    if (profileStore.profile == null) {
        result = await ApiLeaderboard.getTopLeaderboard()
    } else {
        result = await ApiLeaderboard.getLeaderboard()
    }

    if (result.isOk) {
        leaderboard.value = result.data!!

        // sort table in decreasing decreasing time
        const sortedArr = result.data!!.slice().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

        // setting color
        colorsMap.clear()

        sortedArr.forEach(element => {
            const time = ago(element.updatedAt)
            if (time) colorsMap.set(time, "")
        });

        const steps = colorsMap.size
        let index = 0
        for (const [key, item] of colorsMap) {
            const col = getColor(index, steps, greenColor, redColor)
            colorsMap.set(key, col)
            index++
        }

    } else {
        console.log(result.error)
    }
}

</script>
<template>
    <main>
        <Sidebar :activeTabIndex="5" />
        <section class="main">
            <h2>Leaderboard</h2>
            <p>The below list show the top 20 players world wide. The more faster you will write the better rank you will
                get.</p>

            <table>
                <colgroup>
                    <col style="width: 52px;">
                    <col style="width: auto;">
                </colgroup>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Rank</th>
                        <th>Average (WPM)</th>
                        <th>Highest (WPM)</th>
                        <th>Last played</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in leaderboard">
                        <td class="profile">
                            <div><img :src="item.profileImage"></div>
                        </td>
                        <td>
                            <NuxtLink :to="'/'">{{ item.name }}</NuxtLink>
                        </td>
                        <td>{{ item.rank }}</td>
                        <td>
                            <div class="text-arrow">{{ item.averageWPM }} <ArrowUpIcon :class="{ down: item.averageWPM < item.oldWPM }"/></div>
                        </td>
                        <td>{{ item.highestWPM }}</td>
                        <td :style="{ color: colorsMap.get(ago(item.updatedAt) as string) }">{{ ago(item.updatedAt) }}</td>
                    </tr>
                </tbody>
            </table>

        </section>
       <RightPanel/>
    </main>
</template>
<style scoped>
.main {
    max-width: 1000px;
}

</style>