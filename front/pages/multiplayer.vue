<script setup lang='ts'>
</script>
<template>
    <main>
        <Sidebar :activeTabIndex="3" />
        <section class="main">
            <h2>Multiplayer</h2>
            <p>Compete against other players in this online multiplayer game. The faster you type, the faster your car goes. Type as fast as you can to win the race!</p>
            <MatchTrack/>
            <TypingArea/>
        </section>
    </main>
</template>
<style scoped></style>