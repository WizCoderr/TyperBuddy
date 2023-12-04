<script setup lang='ts'>
import { NuxtLink } from '#components'
import ago from 'ts-ago'
import { ref, onMounted } from 'vue';
import { AxiosResult, Leaderboard } from '~/lib/DataType';
import ApiLeaderboard from '~/lib/api/ApiLeaderboard';
import { RGBColor, getColor } from '~/lib/utils';
import { useProfileStore } from '~/store/profile';

const isLoaded = ref(false)
const leaderboard = ref<Array<Leaderboard>>()
const colorsMap = new Map<string, string>()

const profileStore = useProfileStore()
onMounted(setup)


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
                            <div class="text-arrow">{{ item.averageWPM }} <svg
                                    :class="{ down: item.averageWPM < item.oldWPM }" fill="none" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m7.293 8.293 3.995-4a1 1 0 0 1 1.32-.084l.094.083 4.006 4a1 1 0 0 1-1.32 1.499l-.094-.083-2.293-2.291v11.584a1 1 0 0 1-.883.993L12 20a1 1 0 0 1-.993-.884L11 19.001V7.41L8.707 9.707a1 1 0 0 1-1.32.084l-.094-.084a1 1 0 0 1-.084-1.32l.084-.094 3.995-4-3.995 4Z" />
                                </svg></div>
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

table {
    width: 100%;
    margin-top: 40px;
}

table th {
    text-align: left;
    padding: 6px 1em;
}

table td {
    /* background-color: red; */
    padding: 6px 1em;
}

table tbody tr {
    background-color: var(--color-on-primary);
}

table .profile {
    padding: 6px 0;
}

table .profile div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 50%;
}

table img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

.text-arrow {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.text-arrow svg {
    width: 20px;
    height: 20px;
    fill: #25a18e;
}

.text-arrow svg.down {
    transform: rotateZ(180deg);
    fill: #ef2d56;
}
</style>