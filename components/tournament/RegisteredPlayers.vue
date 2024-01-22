<script setup lang='ts'>
import { generateAvatar } from '~/lib/utils';
import FriendListDialog from '../dialog/FriendListDialog.vue';
export interface PlayerChipData {
    id: string
    name: string,
    avatar: string,
}


defineProps({
    isEditable: Boolean,
    data: Array<PlayerChipData>
})


</script>
<template>
    <div class="chips">
        <div class="item" v-for="item, index in data" :key="index">
            <img v-if="item.avatar" :src='item.avatar' />
            <img v-else :src='generateAvatar(item.name)' />
            {{ item.name }}
        </div>
    </div>
    <template v-if="isEditable">
        <hr />
        <div class="edit">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.75 3a.75.75 0 0 1 .743.648l.007.102.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75Z" />
            </svg>
            Add Players
        </div>

        <FriendListDialog :isVisible="false" />
    </template>
</template>
<style scoped>
.edit {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    max-width: 300px;
    margin: 24px auto;
    border-radius: 50px;
    border: 1px dashed var(--color-on-surface);
    gap: 24px;
    fill: var(--color-on-surface);
    font-weight: bold;
    cursor: pointer;
    transition: all 200ms;
}

.edit:hover {
    background-color: var(--color-on-surface);
    color: white;
    border-style: solid;
    fill: white;
}


.edit svg {
    fill: inherit;

}




.chips {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.7em;
    cursor: context-menu;
}

.chips .item {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: var(--color-surface);
    padding: 4px;
    padding-right: 1em;
    border-radius: 50px;
    font-weight: bold;
    border: 1px solid var(--color-surface-dark);
}

.chips .item img {
    width: 36px;
    height: 36px;
    border-radius: 50px;
}
</style>