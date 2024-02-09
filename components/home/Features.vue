<script setup lang='ts'>
</script>
<template>
    <section>
        <div class="page">
            <h2>Our Features</h2>
            <p>TyperBuddy features interactive practice sessions, timed typing challenges, multiplayer mode for battling
                friends, detailed statistics tracking, and a global leaderboard. Elevate your typing skills with ease and
                excitement.</p>
            <div class="cards-holder">
                <div class="card">
                    <h3>Practice</h3>
                    <p>Sharpen your skills with our interactive typing exercises tailored to your level.</p>
                </div>
                <div class="card">
                    <h3>Typing Tests</h3>
                    <p>Test your speed and accuracy with our timed typing challenges.</p>
                </div>
                <div class="card">
                    <h3>Multiplayer Mode</h3>
                    <p>Challenge friends or compete against players worldwide in real-time typing battles.</p>
                </div>
                <div class="card">
                    <h3>Play with Friends</h3>
                    <p>Connect with friends and enjoy friendly typing duels and team challenges.</p>
                </div>
                <div class="card">
                    <h3>Statistics</h3>
                    <p>rack your progress and analyze detailed statistics to identify areas for improvement.</p>
                </div>
                <div class="card">
                    <h3>Leaderboard</h3>
                    <p>See where you stand among the top typists in our global leaderboard.</p>
                </div>
            </div>

        </div>
    </section>
</template>
<style scoped>
section {
    background-color: var(--color-surface);
    padding: 5em 0;
}

section .page {
    text-align: center;
}

section .cards-holder {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
    margin-top: 2em;
}

section .cards-holder .card {
    background-color: white;
    padding: 2em;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
    width: 300px;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1em;
}

.card h3{
    margin: 0;
}
</style>