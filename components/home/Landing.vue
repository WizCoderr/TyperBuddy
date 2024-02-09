<script setup lang='ts'>
</script>
<template>
    <section class="landing">
        <div class="page">
            <div>
                <img class="moon" src="../../assets/img/home/moon.png" alt="moon">
                <h1>Master Typing, Master Everything</h1>
                <p>Welcome to TyperBuddy - where typing becomes an adventure! Start your journey to typing mastery with our interactive practice sessions. Choose from a variety of engaging exercises, tailored just for you. Let's embark on this typing adventure together!</p>
                <br />
                <NuxtLink to="/game/practice">
                    <button class="button">Get started</button>
                </NuxtLink>
            </div>
        </div>

        <div class="cloud cloud1"></div>
        <div class="cloud cloud2"></div>
        <div class="cloud cloud3"></div>
    </section>
</template>
<style scoped>
.landing h1{
    font-size: 42px;
    font-weight: normal;
}

.landing button{
    color: black;
    padding: 0.8em 2em;
}
.landing {
    min-height: 100vh;
    width: 100%;
    background-color: #084f8e;
    background-image: url(../../assets/img/home/sky2.png), linear-gradient(0deg, #084f8e, #083466 80%);
    position: relative;
}

.landing .page>div {
    overflow-y: auto;
    padding-top: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1em;
}

.landing h1 {
    color: white;
    margin-bottom: 0;

}

.landing p {
    color: white;
    opacity: 0.7;
    max-width: 800px;
}


.landing .moon {
    width: 150px;
    height: auto;
    border-radius: 50%;
    display: block;
    margin: auto;
    outline: 10px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 80px rgba(255, 255, 255, 0.6);

}

.landing .cloud {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120px;
    background-repeat: repeat-x;
    background-position: 0 0;
    background-position: left;
    background-origin: border-box;
    animation-name: cloud-anim;
    animation-duration: 150s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

.landing .cloud1 {
    bottom: 30px;
    background-image: url(../../assets/img/home/clouds1.png);
    animation-direction: alternate-reverse;
}

.landing .cloud2 {
    bottom: 10px;
    background-image: url(../../assets/img/home/clouds2.png);
    animation-duration: 200s;
}

.landing .cloud3 {
    background-image: url(../../assets/img/home/clouds3.png);
    animation-duration: 80s;

}



@keyframes cloud-anim {
    0% {
        background-position-x: 0
    }

    100% {
        background-position-x: 1000%;
    }

}
</style>