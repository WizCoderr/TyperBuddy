<script setup lang='ts'>
const data = "Lorem Ipsum is simply dummy text of the printing and type setting industry."
</script>
<template>
    <main>
        <Sidebar :activeTabIndex="4" />
        <section class="main">
            <h2>Play with Friends</h2>
            <p>Compete against your friends in this online multiplayer game. The faster you type, the faster your car goes.
                Type as fast as you can to win the race!</p>
            <MatchTrack />
            <TypingArea :text-data="data"/>
            <button>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17 2.498a3.502 3.502 0 1 1-2.597 5.851l-4.558 2.604a3.5 3.5 0 0 1 0 2.093l4.557 2.606a3.502 3.502 0 1 1-.745 1.302L9.1 14.347a3.502 3.502 0 1 1 0-4.698l4.557-2.604A3.502 3.502 0 0 1 17 2.498Zm0 13.5a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Zm-10.498-6a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Zm10.498-6a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Z" />
                </svg>
                Share Link</button>
        </section>
    </main>
</template>
<style scoped>
section>button {
    margin: 3rem 0;
    padding: 0.8rem 1.5rem;
    border: none;
    background-color: var(--color-primary);
    border-radius: var(--border-radius);
    font-size: var(--medium-font);
    color: var(--color-on-primary);
    transition: all 200ms;
    box-shadow: 0 2px 4px #148aff4d;
    display: flex;
    align-items: center;
    gap: 1rem;
}

section>button svg {
    fill: white;
}

section>button:hover {
    background-color: var(--color-primary-variant);
    translate: 0 -4px;
    box-shadow: 0 4px 8px #148aff4d;
}
</style>