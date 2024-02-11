<script setup lang='ts'>
</script>
<template>
    <main class="game-area">
        <Sidebar />
        <section>
            <div class="content-area">
                <div class="inner">
                    <slot></slot>
                </div>
                <RightPanel />
            </div>
            <Footer></Footer>
        </section>
    </main>
</template>
<style scoped>
.game-area {
    background-color: var(--color-surface);
    display: grid;
    grid-template-columns: max-content 1fr;
    width: 100%;
    overflow: auto;
    color: var(--color-on-surface);
}

.game-area .content-area {
    display: grid;
    grid-template-columns: 1fr 150px;
    gap: 1em;
    padding-bottom: 100px;
}

.game-area .inner {
    /* max-width: 800px; */
}


.game-area .content-area {
    margin: var(--page-margin);
}

@media only screen and (max-width: 1300px) {

    main {
        grid-template-columns: max-content auto 150px;
    }
}


@media only screen and (max-width: 1000px) {
    .game-area .right-panel {
        display: none;
    }

    .game-area .content-area {
        grid-template-columns: 100%;
    }

}

@media only screen and (max-width: 900px) {
    .game-area {
        grid-template-columns: 100%;
        width: 100%;
    }
}
</style>

<style>
.game-area hr {
    border: none;
    border-top: 1px solid var(--color-surface-dark-2);
    margin: 2rem 0;
}
</style>
