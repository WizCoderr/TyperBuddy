<script setup lang='ts'>
import { generateAvatar } from '~/lib/utils';
import Paginate from '../widgets/Paginate.vue';

</script>
<template>
    <table>
        <colgroup>
            <col style="width: 40px;">
            <col style="width: auto;">
        </colgroup>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Rank</th>
                <th>R1</th>
                <th>R2</th>
                <th>R3</th>
                <th>R4</th>
                <th>R5</th>
                <th>R6</th>
                <th>R7</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item, index in 10">
                <td class="profile">
                    <div><img :src='generateAvatar("Nitesh Kumar")'></div>
                </td>
                <td>
                    <NuxtLink :to="'/'">{{ "Nitesh Kumar" }}</NuxtLink>
                </td>
                <td>{{ index + 1 }}</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>

            </tr>
        </tbody>
    </table>
    <Paginate/>
</template>
<style scoped>
/* match history */






table {
    margin-top: 0;
    width: 100%;
    border-collapse: collapse;
}

table th {
    text-align: left;
    padding: 6px 1em;
}

table td {
    /* background-color: red; */
    padding: 6px 1em;
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


table tbody tr:nth-child(odd) {
    background-color: var(--color-surface);
}

/* table tbody tr:hover {
    background-color: var(--color-primary);
    color: white !important;
    font-weight: bold;
}

table tbody tr:hover a {
    color: white !important;
} */

table img {
    height: 36px;
    width: 36px;
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