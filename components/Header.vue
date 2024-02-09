<script setup lang='ts'>
</script>
<template>
    <header>
        <section>
            <div class="page">
                <div>
                    <NuxtLink class="logo" to="/">
                        <span>TyperBuddy</span>
                    </NuxtLink>
                    <div class="links">
                        <NuxtLink to="/game/multiplayer">Multiplayer</NuxtLink>
                        <NuxtLink to="/game/practice">Practice</NuxtLink>
                        <NuxtLink to="/about">About</NuxtLink>
                        <NuxtLink to="/contact">Contact</NuxtLink>
                        
                    </div>
                </div>
            </div>
        </section>
    </header>
</template>
<style scoped>
header{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0.068);
}

header .page>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    height: 60px;
}

header .logo{
    font-size: var(--big-font);
    color: white;
}

header .links{
    display: flex;
    align-items: center;
    gap: 1em;
}
header .links a{
    margin-left: 20px;
    color: white;
}

header .links a:hover{
    text-decoration: underline;
}


</style>