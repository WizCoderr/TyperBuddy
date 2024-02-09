<script setup lang='ts'>
import { onMounted, useSeoMeta } from '#imports';
import Chatbox from '~/components/Chatbox.vue';

useSeoMeta({
    title: 'Help',
    description: "Find answers to your questions and get helpful tips and tutorials in our comprehensive help section. Whether you're a beginner or an advanced typist, we've got you covered. Access our helpful resources and improve your typing skills today!"
})

onMounted(() => {
    console.log(localStorage.getItem('access_token'));
});

</script>
<template>
    <main>
        <Sidebar :activeTabIndex="7" />
        <section class="main">
            <h2>Helps</h2>

            <h3>About</h3>
            <p>This web application will help you to learn touch typing, which means typing through muscle memory without
                using your eyesight to find the keys on the keyboard. It can improve your typing speed and accuracy
                dramatically. The opposite is hunt-and-peck typing, a method of typing in which you look at the keyboard
                instead of the screen, and use only the index fingers.
            </p>

            <h3>How algorithm help you in learning?</h3>
            <p>This application uses a unique approach. It employs statistics and smart algorithms to automatically create
                typing lessons that match your current skill level. It works by repeating the following cycle:
            </p>
            <ol>
                <li>The algorithm generates a list of random words for you, based on your typing skills. Your skill level is
                    measured using the typing statistics collected so far. The words consist of a set of letters selected by
                    the algorithm.
                </li>
                <li>You type the given words. You try to make as few mistakes as possible.</li>
                <li>As you type, the algorithm collects your typing statistics, such as the time-to-type metric for each
                    individual key. At the end, these statistics are used to generate the next list of words for step one.
                </li>
            </ol>
            <p>At each stage you just type the provided lists of words, and the algorithms does the rest.</p>

            <h3>The right way to use keyboard</h3>
            <p>Put all your fingers on the home row, the one containing the Caps Lock key. There are small bumps on the keys
                <b>F</b> and <b>J</b>, put your index fingers on the bumps. Each finger is responsible for its own set of
                keys.
            </p>

            <h3>See your statistics</h3>
            <p>The algorithms will collect your progress and report. It will store it on the server and you can see your
                progress from the panel. It will help you to track your typing progress.
            </p>

            <h3>Challenge with other players</h3>
            <p>You can easily Challenge your typing speed with the other players world wide. Just visit multiplayer tab and
                start challenging yourself with others.
            </p>

            <h3>Challenge your friends</h3>
            <p>You can also challenge your friends. Just share your link with them and start challenging.</p>

            <h3>Typing test</h3>
            <p>Test yourself by typing books and novels</p>
        </section>
        <RightPanel />
    </main>
</template>
<style scoped>
section {
    max-width: 800px;
}

p {
    margin: 1em 0;
}

li {
    margin: 1em 0;
}
</style>