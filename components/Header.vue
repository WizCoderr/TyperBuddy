<script setup lang='ts'>

import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
    auto: Boolean
})

const isActive = ref(false);

onMounted(() => {
    if (props.auto) {
        window.addEventListener('scroll', onScroll);
    }
});

onUnmounted(() => {
    if (props.auto) {
        window.removeEventListener('scroll', onScroll);
    }
});


function onScroll() {
    const vpHeight = window.innerHeight * 0.7;

    if (window.scrollY > vpHeight) {
        if (isActive.value == false) isActive.value = true;
    } else {
        if (isActive.value) isActive.value = false;
    }
}
</script>
<template>
    <header :class="isActive || !auto ? 'dark' : ''">
        <section>
            <div class="page">
                <div>
                    <NuxtLink class="logo" to="/">
                        <span>TyperBuddy</span>
                    </NuxtLink>
                    <div class="links">
                        <NuxtLink to="/game/multiplayer">Multiplayer</NuxtLink>
                        <NuxtLink to="/game/practice">Practice</NuxtLink>
                        <NuxtLink to="/company/about">About</NuxtLink>
                        <NuxtLink to="/company/contact">Contact</NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </header>
</template>
<style scoped>
header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0.068);
    backdrop-filter: blur(10px);
}

header.dark {
    background-color: rgba(3, 3, 3, 0.7);
}

header .page>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    height: 60px;
}

header .logo {
    font-size: var(--big-font);
    color: white;
}

header .links {
    display: flex;
    align-items: center;
    gap: 1em;
}

header .links a {
    margin-left: 20px;
    color: white;
}

header .links a:hover {
    text-decoration: underline;
}

@media only screen and (max-width: 700px) {
    header .links {
        display: none;
    }
}
</style>