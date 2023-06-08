<script setup lang='ts'>



</script>
<template>
    <main>
        <Sidebar />
        <section class="main">
            <div class="status-bar">
                <h3>Speed: 10% ( +0% )</h3>
                <h3>Accuracy: 10% ( +0% )</h3>
            </div>
            <div class="key-status">
                <h3>All Keys:</h3>
                <div class="keys">
                    <div v-for="item in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'">
                        <span>{{ item }}</span>
                    </div>
                </div>
            </div>
            <div class="typing-progress">
                <span class="track"></span>
                <span class="progress"></span>
            </div>

            <TypingArea />
            <Keyboard />

        </section>
    </main>
</template>
<style scoped>
main {
    background-color: var(--color-surface);
    display: grid;
    grid-template-columns: 300px auto;
    width: 100%;
    overflow: auto;
}


/* --------------------- Main ----------------- */

.main {
    margin: var(--page-margin);
}

.main .status-bar {
    display: flex;
    flex-direction: row;
    gap: 4rem;
}

.main .status-bar h3 {
    white-space: nowrap;
}

.main .key-status {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.main .key-status h3 {
    white-space: nowrap;
}

.main .key-status .keys {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2px;
}

.main .key-status .keys div {
    width: 2rem;
    height: 2rem;
    background-color: var(--color-surface-variant);
    display: flex;
    align-items: center;
    justify-content: center;
}

.main .key-status span {
    font-size: var(--average-font);
    color: var(--color-on-surface);
}


.typing-progress {
    position: relative;
    height: 5rem;
    margin: 0 1rem;
}

.typing-progress .track {
    width: 100%;
    background-color: var(--color-surface-dark);
    height: 4px;
    position: absolute;
    left: 0;
    z-index: 1;
    top: 50%;
    translate: 0 -50%;
}



.typing-progress .track::after {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    display: inline-block;
    background-color: var(--color-surface-dark);
    position: absolute;
    right: 0;
    top: 50%;
    z-index: 1;
    translate: 50% -50%;
}

.typing-progress .progress {
    width: 10%;
    background-color: var(--color-secondary);
    height: 6px;
    position: absolute;
    z-index: 2;
    top: 50%;
    translate: 0 -50%;
}

.typing-progress .progress::before {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    display: inline-block;
    background-color: var(--color-secondary);
    position: absolute;
    top: 50%;
    z-index: 2;
    translate: -50% -50%;
}

.typing-progress .progress::after {
    content: "";
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 2rem;
    display: inline-block;
    background-color: white;
    border: 4px solid var(--color-secondary);
    position: absolute;
    right: 0;
    top: 50%;
    z-index: 2;
    translate: 50% -50%;
}



@media only screen and (max-width: 1200px) {
    main {
        grid-template-columns: 220px auto;
    }
}
</style>