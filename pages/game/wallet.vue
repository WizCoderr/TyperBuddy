<script setup lang='ts'>
import { onMounted, ref, useSeoMeta } from '#imports';
import { useToast } from 'vue-toast-notification';
import { WalletIcon, WithdrawIcon } from '~/components/icons';
import { ArrowUpIcon } from '~/components/icons';
import Notification from '~/components/Notification.vue';
import Paginate from '~/components/widgets/Paginate.vue';
import ApiWallet from '~/lib/api/ApiWallet';
import type { WalletPageData } from '~/lib/DataType';
import { formatDateTime } from '~/lib/utils';
import GameLayout from '../layouts/GameLayout.vue';
const $toast = useToast()

const walletPageData = ref<WalletPageData>()
useSeoMeta({
    title: 'Wallet',
})

onMounted(() => {
    loadPageData()
});


async function loadPageData() {
    const res = await ApiWallet.getWalletPageData()
    if (res.data) {
        walletPageData.value = res.data

    } else {
        $toast.error(res.error!!.message)
    }
}



// TODO: implement onPaginate change listener callback

function removeReadNotification(ids: string[]) {
    if (walletPageData.value) {
        walletPageData.value.notifications = walletPageData.value.notifications.filter((item) => !ids.includes(item.id))
    }
}

</script>
<template>
    <GameLayout>
        <h2>Wallet</h2>
        <p>Manage your wallet easy from here</p>
        <hr />

        <template v-if="walletPageData">
            <div class="top-bar">
                <div class="card">
                    <h4>
                        <WalletIcon />Current balance
                    </h4>
                    <h2>${{ walletPageData.wallet.balance }}</h2>

                </div>
                <div class="card">
                    <h4>
                        <WithdrawIcon />Withdrawal
                    </h4>
                    <h2>${{ walletPageData.wallet.withdrawal }}</h2>
                </div>
            </div>

            <br />
            <div class="history-notification">
                <div class="card">
                    <h4>Transaction history</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Transaction ID</th>
                                <th>Type</th>
                                <th>Value</th>
                                <th>Datetime</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item, index in walletPageData.transactionHistory.transactionHistory">
                                <td>{{ index }}</td>
                                <td>{{ item.transactionId }}</td>
                                <td>
                                    <div v-if="item.amount > 0" class="text-arrow">Received
                                        <ArrowUpIcon :class="'down'" />
                                    </div>
                                    <div v-else class="text-arrow">Sent
                                        <ArrowUpIcon />
                                    </div>
                                </td>
                                <td>${{ Math.abs(item.amount) }}</td>
                                <td>{{ formatDateTime(item.createdAt) }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <Paginate :active="1" :total="walletPageData.transactionHistory.totalPage" />

                </div>

                <Notification :notification="walletPageData.notifications" :onNotificationRead="removeReadNotification" />
            </div>
        </template>
    </GameLayout>
</template>
<style scoped>
.history-notification {
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
    min-height: 500px;
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
