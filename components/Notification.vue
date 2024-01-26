<script setup lang='ts'>
import { NotificationData } from '~/lib/DataType';
import { NotificationIcon, LoadingIcon } from './icons';
import ago from 'ts-ago'
import ApiNotification from '~/lib/api/ApiNotification';
import { useToast } from 'vue-toast-notification';


const $toast = useToast()
defineProps<{
    notification: Array<NotificationData>
}>()


const emit = defineEmits<{
    (event: 'notificationRead', ids: Array<string>): void
}>()


async function onRead(id: string) {
    const res = await ApiNotification.markNotificationAsRead([id])
    if (res.data) {
        $toast.success('Notification read successful')
        emit('notificationRead', [id])
    } else {
        $toast.error(res.error!!.message)
    }
}

</script>
<template>
    <div class="notification">
        <h4>
            <NotificationIcon /> Notifications
        </h4>
        <div class="holder scroll-bar">
            <div v-for="item, index in notification" class="item" :key="index">
                <div class="top">
                    <span class="title">{{ item.title }}</span>
                    <p>{{ item.message }}</p>
                </div>
                <div class="bottom">
                    <span class="time">{{ ago(item.createdAt) }}</span>
                    <button class="button primary" @click="() => onRead(item.id)">
                        <LoadingIcon size="mini" />Read
                    </button>
                </div>
            </div>

            <p v-if="!notification.length">No new notification</p>
        </div>
    </div>
</template>
<style scoped>
.notification {
    background-color: white;
    min-height: 100px;
    min-width: 300px;
    border-radius: var(--border-radius);
}

.notification h4 {
    padding: 1em;
    padding-bottom: 0;
    margin-top: 0;
    display: flex;
    gap: 0.5em;
    align-items: center;
}


.notification h4 svg {
    width: 24px;
    fill: var(--color-on-surface);
}

.notification .top {
    padding: 0.5em;
}

.notification .holder {
    padding: 0 1em;
    max-height: 500px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.notification .item {
    cursor: pointer;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-surface);
}

.notification .item .title {
    font-weight: bold;
}


.notification .item p {
    line-height: 1em;
    margin-top: 0.7em;
    margin-bottom: 0.4em;
    opacity: 0.7;
}

.notification .item .bottom {
    height: 32px;
    background-color: var(--color-surface);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5em;
}

.notification .item .time {
    font-size: var(--small-font);
}

.notification .item button {
    padding: 0 0.8em;
    height: 1.7em;
    font-size: var(--small-font);
}
</style>