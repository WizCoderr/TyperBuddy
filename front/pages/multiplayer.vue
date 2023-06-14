<script setup lang='ts'>

const data = "Lorem Ipsum is simply dummy text of the printing and type setting industry."
</script>
<template>
    <main>
        <Sidebar :activeTabIndex="3" />
        <section class="main">
            <h2>Multiplayer</h2>
            <p>Compete against other players in this online multiplayer game. The faster you type, the faster your car goes. Type as fast as you can to win the race!</p>
            <MatchTrack/>
            <TypingArea :text-data="data"/>
        </section>
    </main>
</template>
<style scoped></style>