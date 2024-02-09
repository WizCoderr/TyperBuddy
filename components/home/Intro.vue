<script setup lang='ts'>
</script>
<template>
    <section>
        <div class="page">
            <img src="../../assets/img/home/typing.svg" alt="typing">
            <div class="content">
                <h2>Your Ultimate Typing Destination</h2>
                <p>Welcome to TyperBuddy, where typing enthusiasts of all levels come together to improve their skills,
                    compete, and connect with friends. Whether you're a seasoned typist or just getting started, TyperBuddy
                    has everything you need to take your typing to the next level.</p>
                <br />
                <button class="button primary">Start typing</button>
            </div>
        </div>
    </section>
</template>
<style scoped>
section {
    background-color: white;
    padding: 5em 0;
}

section .page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
}

section img {
    width: 100%;
    max-width: 400px;
    height: auto;
}
</style>