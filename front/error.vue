<script setup lang='ts'>
const props = defineProps({
    error: Object
})

</script>
<template>
    <div class="not-found">
        <h1>404</h1>
        <p>The requested page could not be found.</p>
        <NuxtLink to="/">Go to Home</NuxtLink>
    </div>
</template>
<style scoped>
.not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: var(--surface-color);
}

.not-found h1 {
    line-height: 1;
    display: block;
    color: var(--color-primary);
    font-size: 100px;
}

.not-found p {
    margin: 24px 0;
    color: var(--color-on-secondary);
    font-weight: 600;
}

.not-found a {
    border-radius: 4px;
    margin-top: 10px;
    text-decoration: none;
    padding: 12px 24px;
    font-weight: 600;
    color: white;
    background-color: var(--color-primary-variant);
    transition: opacity 200ms;
}

.not-found a:hover {
    opacity: 0.8;
}

@media only screen and (max-width: 500px) {
    .not-found h1 {
        font-size: 80px;
    }
}
</style>