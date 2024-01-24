<script setup lang='ts'>
import { onMounted, useSeoMeta } from '#imports';
import { WalletIcon, WithdrawIcon } from '~/components/icons';
import { ArrowUpIcon } from '~/components/icons';
import Notification from '~/components/Notification.vue';

useSeoMeta({
    title: 'Wallet',
})

onMounted(() => {
    
});

</script>
<template>
    <main>
        <Sidebar :activeTabIndex="8" />
        <section class="main">
            <h2>Wallet</h2>
            <p>Manage your wallet easy from here</p>
            <hr />

            <div class="top-bar">
                <div class="card">
                    <h4>
                        <WalletIcon />Current balance
                    </h4>
                    <h2>$100</h2>

                </div>
                <div class="card">
                    <h4>
                        <WithdrawIcon />Withdrawal
                    </h4>
                    <h2>$100</h2>
                </div>
            </div>

            <br />
            <div class="history-notification">
                <div class="card">
                    <h4>Transaction history</h4>
                    <table>
                        <!-- <colgroup>
                        <col style="width: 52px;">
                        <col style="width: auto;">
                    </colgroup> -->
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Transaction ID</th>
                                <th>Type</th>
                                <th>Value</th>
                                <th>Date Received</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item, index in 10">
                                <td>{{ index }}</td>
                                <td>sdf45sdf65sd</td>
                                <td>
                                    <div class="text-arrow">Received
                                        <ArrowUpIcon :class="'down'" />
                                    </div>
                                </td>
                                <td>$100</td>
                                <td>4 Dec 2019</td>
                                <td>12:45PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

               <Notification/>
            </div>



        </section>
        <RightPanel />
    </main>
</template>
<style scoped>

.history-notification{
    display: grid;
    grid-template-columns: auto 300px;
    gap: 1em;
}
.top-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
}

table {
    margin-top: 0;
    background-color: var(--color-surface);
}

table tr {
    height: 2.8em;
}

.card {
    padding: 1em;
    background-color: white;
    min-height: 100px;
    min-width: 300px;
    border-radius: var(--border-radius);
}

.card h4 {
    margin-top: 0;
    display: flex;
    gap: 0.5em;
    align-items: center;
}

.card h2 {
    margin: 1em;
    color: var(--color-secondary);
}

.card h4 svg {
    width: 24px;
    fill: var(--color-on-surface);
}
</style>