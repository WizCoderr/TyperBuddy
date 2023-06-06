<script setup lang='ts'>
</script>
<template>
    <header>
        <div class="container">
            <h2>TyperBuddy</h2>
            <div>
                <span></span>
            </div>
        </div>
    </header>
</template>
<style scoped>
header{
    position: sticky;
    top: 0;
    height: 60px;
    background-color: white;
    box-shadow: 0 4px 26px #4b4b4b33;
}

header h2{
    font-size: var(--big-font);
}

.container{
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1rem;
}

</style>