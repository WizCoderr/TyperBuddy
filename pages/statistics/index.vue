
<script setup lang='ts'>

</script>


<template>
    <main>
        <Sidebar :activeTabIndex="4" />
        <section class="main">
            <h2>Statistics</h2>
            <p>Signin required to view your statistics</p>
            
        </section>
    </main>
</template>
<style scoped>
.main {
    max-width: 1000px;
}

main .status-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1rem 0;
}

main .status-chips div {
    background-color: var(--color-surface-variant);
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius-2);
}

main .status-chips span {
    display: block;
    text-align: center;
    font-size: var(--medium-2-font);
    font-weight: 600;
}

main .status-chips div span:first-child {
    font-size: var(--small-font);
    margin-bottom: 0.6rem;
    color: var(--color-secondary);
    font-weight: normal;
}

.chart-container select {
    margin-left: auto;
    display: block;
    padding: 0.6rem 1rem;
    font-size: var(--medium-font);
    border: none;
    outline: none;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    border-radius: var(--border-radius);
}

.chart-holder {
    margin-top: 2rem;
    padding-top: 1rem;
    padding-left: 0.4rem;
    background-color: var(--color-surface-variant);
    border-radius: var(--border-radius-2);
}

.chart-holder canvas {
    width: 100%;
    aspect-ratio: 5/1;
}
</style>