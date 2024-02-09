<script setup lang='ts'>
</script>
<template>
    <section>
        <div class="page">
            <div class="content">
                <h2>Get Started Today</h2>
                <ul>
                    <li>Sign up for a free account to unlock almost all features.</li>
                    <li>Dive into our practice sessions to start improving your typing skills immediately.</li>
                    <li>Challenge yourself with typing tests or join the multiplayer fun with friends.</li>
                    <li>Participate in tournament and earn real rewards - <b>coming soon</b></li>
                </ul>
                <br/>
                <button class="button primary">Start typing</button>
            </div>
            <img src="../../assets/img/home/get-start.svg" alt="get-started">
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

section ul {
    text-align: left;
    padding: 0;
    padding-left: 1em;
    margin: 0;
    margin-top: 2em;
    line-height: 1.5em;
}

section li{
    margin-bottom: 0.5em;
}
</style>