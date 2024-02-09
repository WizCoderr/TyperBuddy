<script setup lang='ts'>
</script>
<template>
    <section>
        <div class="page">
            <h2>Why you'll love TyperBuddy.com</h2>
            <p>At TypeBuddy.com, we make typing fun and rewarding. With interactive practice sessions, thrilling multiplayer
                battles, and detailed progress tracking, mastering typing skills has never been more enjoyable. Join us
                today and discover the excitement of typing mastery!</p>
            <div class="cards-holder">
                <div class="card">
                    <h3>Fun and Engaging</h3>
                    <p>Turn typing practice into an enjoyable experience with our interactive exercises and multiplayer
                        mode.</p>
                </div>
                <div class="card">
                    <h3>Track Your Progress</h3>
                    <p>Monitor your performance and see how you stack up against others with detailed statistics and
                        leaderboard rankings.</p>
                </div>
                <div class="card">
                    <h3>Connect with Friends</h3>
                    <p>Compete, collaborate, and connect with friends in real-time typing battles and challenges.</p>
                </div>
                <div class="card">
                    <h3>Join / Host Tournament</h3>
                    <p>Easily join or host your own tournament and earn real rewards.<br /> <b>Coming soon</b></p>
                </div>
            </div>

            <br />
            <br />
            <br />
            <p>Join TyperBuddy now and take the first step towards becoming a typing master. Sign up for free and start
                practicing, competing, and connecting with fellow typists today!
            </p>

        </div>
    </section>
</template>
<style scoped>
section {
    background-color: white;
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
    border: 1px solid rgb(235, 235, 235);
}

.card h3 {
    margin: 0;
}
</style>