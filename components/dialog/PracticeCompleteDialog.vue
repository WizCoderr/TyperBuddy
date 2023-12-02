<script setup lang='ts'>
import { TypingReport } from '~/lib/DataType';
import { timeToWord } from '~/lib/utils';

defineProps<{
    testData: TypingReport
}>()


const emit = defineEmits<{
  (event: 'start'): void
  (event: 'restart'): void
}>()


</script>
<template>
    <div class="dialog">
        <div class="content">
            <img class="logo" src="../../public/extra/success.png" alt="success">
            <h2>Successful</h2>
            <p>You have successfully completed this challenge.</p>
            <div class="chips">
                <div>
                    <span>Time</span>
                    <span>{{ timeToWord(testData.timeTaken) }}</span>
                </div>
                <div>
                    <span>Total Words</span>
                    <span>{{ testData.totalWords }}</span>
                </div>
                <div>
                    <span>Total Character</span>
                    <span>{{ testData.totalCharacter }}</span>
                </div>
                <div>
                    <span>Error</span>
                    <span>{{ testData.totalError }}</span>
                </div>
                <div>
                    <span>Average Speed</span>
                    <span>{{ testData.averageWPM }} wpm</span>
                </div>
                <div>
                    <span>Highest Speed</span>
                    <span>{{ testData.highestWPM }} wpm</span>
                </div>
            </div>
            <hr>
            <div class="buttons">
                <button @click="emit('restart')"><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 4.5a7.5 7.5 0 1 0 7.419 6.392c-.067-.454.265-.892.724-.892.37 0 .696.256.752.623A9 9 0 1 1 18 5.292V4.25a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1 0-1.5h1.35a7.474 7.474 0 0 0-5.1-2Z" />
                    </svg>Retry</button>
                <button><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.749 2h4.554l.1.014.099.028.06.026c.08.034.153.085.219.15l.04.044.044.057.054.09.039.09.019.064.014.064.009.095v4.532a.75.75 0 0 1-1.493.102l-.007-.102V4.559l-6.44 6.44a.75.75 0 0 1-.976.073L13 11 9.97 8.09l-5.69 5.689a.75.75 0 0 1-1.133-.977l.073-.084 6.22-6.22a.75.75 0 0 1 .976-.072l.084.072 3.03 2.91L19.438 3.5h-2.69a.75.75 0 0 1-.742-.648l-.007-.102a.75.75 0 0 1 .648-.743L16.75 2ZM3.75 17a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Zm5.75-3.25a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5ZM13.75 15a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75Zm5.75-4.25a.75.75 0 0 0-1.5 0v10.5a.75.75 0 0 0 1.5 0v-10.5Z" />
                    </svg><NuxtLink to="/Statistics">Statistics</NuxtLink></button>
                <button @click="emit('start')"><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.75 3a.75.75 0 0 1 .743.648l.007.102.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75Z" />
                    </svg> New Test</button>
            </div>

        </div>
    </div>
</template>
<style scoped>
.dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 5;
    color: var(--color-on-surface);
}

.dialog .content {
    max-width: 800px;
    margin: 1rem;
    padding: 1rem;
    width: 100%;
    background-color: var(--color-surface-variant);
    min-height: 400px;
    border-radius: var(--border-radius-3);
}

.dialog .logo {
    margin: auto;
    margin-top: 1rem;
    display: block;
    width: 6rem;
}

.dialog h2 {
    text-align: center;
    margin-top: 1rem;
}

.dialog p {
    text-align: center;
    margin: 1rem 0;
    font-size: 18px;
}

.dialog .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.dialog .chips div {
    background-color: var(--color-surface);
    padding: 0.6rem 1.5rem;
    border-radius: var(--border-radius);
}

.dialog .chips span {
    white-space: nowrap;
    display: block;
    font-size: var(--average-font);
    text-align: center;
    font-weight: 600;
}

.dialog .chips div span:first-child {
    font-size: var(--small-font);
    margin-bottom: 0.6rem;
    font-weight: normal;
}

.dialog hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid var(--color-surface-dark);
}

.dialog .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.6rem;
}

.dialog button {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    border: none;
    padding: 0.8rem 1.5rem;
    font-size: var(--medium-font);
    border-radius: var(--border-radius);
    background-color: var(--color-secondary);
    color: var(--color-on-secondary);
    fill: var(--color-on-secondary);
}

.dialog .buttons a{
    color: var(--color-on-secondary);
}

.dialog button svg {
    fill: inherit;
}

.dialog button:hover {
    background-color: var(--color-secondary-variant);
}</style>