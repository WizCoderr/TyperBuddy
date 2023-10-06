<script setup lang='ts'>

import ago from 'ts-ago'
import { AxiosResult, Leaderboard } from '~/lib/DataType';
import ApiLeaderboard from '~/lib/api/ApiLeaderboard';
import { useProfileStore } from '~/store/profile';

const isLoaded = ref(false)
const leaderboard = ref<Array<Leaderboard>>()

const profileStore = useProfileStore()
onMounted(setup)


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
                        <td>{{ item.name }}</td>
                        <td>{{ item.rank }}</td>
                        <td>{{ item.averageWPM }}</td>
                        <td>{{ item.highestWPM }}</td>
                        <td>{{ ago(item.updatedAt) }}</td>
                    </tr>
                </tbody>
            </table>

        </section>
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
</style>