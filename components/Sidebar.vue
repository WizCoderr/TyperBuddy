<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import SignInDialog from './dialog/SignInDialog.vue';
import { useProfileStore } from '~/store/profile'
import { CarIcon, FriendsIcon, SignInIcon, TypingIcon, TrophyIcon, LeaderboardIcon, StatisticsIcon, MeterIcon, HelpIcon, WalletIcon } from './icons';
import { useRoute } from '#imports';


const profileStore = useProfileStore()
const activeTab = ref('')

onMounted(function () {
    const route = useRoute()
    if (profileStore.profile == null) {
        profileStore.fetchProfile()
    }

    const sub = route.path.split('/')
    activeTab.value = sub[sub.length - 1]

    // exception for statistics
    if (sub.includes('statistics')) {
        activeTab.value = 'statistics'
    }
})



// --------------- dialog -------------

const isSignInDialogVisible = ref(false)
function openSignInDialog() {
    isSignInDialogVisible.value = true
}

function closeSignInDialog() {
    isSignInDialogVisible.value = false
}

</script>
<template>
    <div class="sidebar-container">
        <nav class="sidebar">
            <div class="heading">
                <img src="../public/favicon.ico" alt="TyperBuddy">
                <h2>TyperBuddy</h2>
            </div>

            <hr>

            <div v-if="!profileStore.isLoaded" class="skeleton">
                <div class="image medium"></div>
                <div>
                    <div class="text"></div>
                    <div class="text small"></div>
                </div>
            </div>
            <template v-else>
                <div v-if="profileStore.profile != null" class="profile">
                    <div class="image-holder">
                        <img :src="profileStore.profile.profileImage">
                    </div>
                    <h4>{{ profileStore.profile.name }}</h4>
                </div>

                <button v-else @click="openSignInDialog()" class="button primary">
                    <span>SignIn</span>
                    <SignInIcon style="width: 24px; height: 24px;" />
                </button>
            </template>


            <hr>
            <ul>
                <li :class="{ 'active': activeTab == 'practice' }">
                    <NuxtLink to="/game/practice">
                        <span class="marker"></span>
                        <TypingIcon style="width: 24px; height: 24px;" />
                        <p>Practice</p>
                    </NuxtLink>
                </li>


                <li :class="{ 'active': activeTab == 'typing-test' }">
                    <NuxtLink to="/game/typing-test">
                        <span class="marker"></span>
                        <MeterIcon style="width: 24px; height: 24px;" />
                        <p>Typing Test</p>
                    </NuxtLink>
                </li>

                <li :class="{ 'active': activeTab == 'multiplayer' }">
                    <NuxtLink to="/game/multiplayer">
                        <span class="marker"></span>
                        <CarIcon style="width: 24px; height: 24px;" />
                        <p>Multiplayer</p>
                    </NuxtLink>
                </li>

                <li :class="{ 'active': activeTab == 'play-with-friends' }">
                    <NuxtLink to="/game/play-with-friends">
                        <span class="marker"></span>
                        <FriendsIcon style="width: 24px; height: 24px;" />
                        <p>Play with Friends</p>
                    </NuxtLink>
                </li>

                <li :class="{ 'active': activeTab == 'statistics' }">
                    <NuxtLink
                        :to="profileStore.profile ? '/game/statistics/report/' + profileStore.profile.id : '/game/statistics'">
                        <StatisticsIcon style="width: 24px; height: 24px;" />
                        <span class="marker"></span>
                        <p>Statistics</p>
                    </NuxtLink>

                </li>

                <li :class="{ 'active': activeTab == 'leaderboard' }">
                    <NuxtLink to="/game/leaderboard">
                        <span class="marker"></span>
                        <LeaderboardIcon style="width: 24px; height: 24px;" />
                        <p>Leaderboard</p>
                    </NuxtLink>
                </li>


                <li :class="{ 'active': activeTab == 'tournaments' }">
                    <NuxtLink to="/game/tournaments">
                        <span class="marker"></span>
                        <TrophyIcon style="width: 24px; height: 24px;" />
                        <p>Tournaments</p>
                    </NuxtLink>
                </li>

                <li v-if="profileStore.profile" :class="{ 'active': activeTab == 'wallet' }">
                    <NuxtLink to="/game/wallet">
                        <span class="marker"></span>
                        <WalletIcon style="width: 24px; height: 24px;" />
                        <p>Wallet</p>
                    </NuxtLink>
                </li>

                <li :class="{ 'active': activeTab == 'help' }">
                    <NuxtLink to="/game/help">
                        <span class="marker"></span>
                        <HelpIcon style="width: 24px; height: 24px;" />
                        <p>Help</p>
                    </NuxtLink>
                </li>

            </ul>
        </nav>
    </div>

    <SignInDialog :is-visible="isSignInDialogVisible" :onClose="closeSignInDialog" />
</template>
<style scoped>
/* skeleton */

.skeleton {
    display: grid;
    align-items: center;
    grid-template-columns: max-content 1fr;
    gap: 12px;
    margin: 0 16px;
}

.skeleton .small {
    width: 40px;
}




/*  ------------------- side bar----------------- */

.sidebar-container {
    width: 250px;
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: inherit;
    padding: var(--page-margin) 0;
    height: 100vh;
    background-color: var(--color-surface-variant);
}

.sidebar button {
    width: 90%;
    margin: auto;
    justify-content: space-between;

}


/* ------------ profile ---------- */

.sidebar .profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0.6rem;
    padding: 0 0.4rem;
    border-radius: var(--border-radius);

    /* temp */
    /* display: none; */
}

.sidebar .profile:hover {
    background-color: rgb(219, 219, 219);
}

.sidebar .profile img {
    width: 42px;
    height: 42px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid rgb(202, 202, 202);
}


.heading {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    margin: 0 1rem;
}

.sidebar hr {
    margin: 1rem 0.6rem;
    border: none;
    border-top: 1px solid var(--color-surface-dark);
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar li {
    padding: 0 !important;
    position: relative;
    color: var(--color-primary);
}

.sidebar li a {
    padding: 1rem 1rem;
    display: flex;
    gap: 0.6rem;
    align-items: center;
    color: inherit;
    text-decoration: none;
}


.sidebar li .marker {
    width: 6px;
    background-color: var(--color-primary);
    height: 0;
    position: absolute;
    left: -6px;
    top: 50%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    translate: 0 -50%;
    transition: all 200ms;
}

.sidebar li svg {
    fill: var(--color-primary);
}

.sidebar li.active .marker {
    height: 80%;
    left: 0;
    background-color: var(--color-secondary);
}

.sidebar li.active {
    background-color: var(--color-secondary-light) !important;
    color: var(--color-secondary);
}

.sidebar li:hover {
    background-color: var(--color-primary-light);
}

.sidebar li:hover .marker {
    left: 0;
    height: 80%;
}

.sidebar li.active svg {
    fill: var(--color-secondary);
}


@media only screen and (max-width: 1200px) {
    .sidebar li {
        padding: 0.8rem 1rem;
    }

    .heading h2 {
        font-size: var(--average-font);
    }

    .sidebar-container {
        width: 220px;
    }

}

@media only screen and (max-width: 900px) {

    .sidebar {
        left: -300px;
        width: 300px;
        background-color: var(--color-surface-variant);
    }

}
</style>~/store/modules/profile
