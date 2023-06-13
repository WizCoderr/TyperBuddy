<script setup lang='ts'>
</script>
<template>
    <section>
        <h2>Ready</h2>
        <table>
            <colgroup>
                <col style="width: 12rem;">
                <col style="width: auto;">
            </colgroup>
            <tbody>
                <tr v-for="item in 5">
                    <td>
                        <div class="profile">
                            <img src="../public/extra/no_image.png" alt="no_image">
                            <span>Nitesh Kumar</span>
                        </div>
                    </td>
                    <td>
                        <div class="track">
                            <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.997 5.998a6.14 6.14 0 0 1 5.8 4.125l.075.233.044.145h2.33a2.749 2.749 0 0 1 2.744 2.581l.005.168v1a1.75 1.75 0 0 1-1.606 1.742l-.143.006H18.62l.241.584a1.75 1.75 0 0 1-.813 2.22l-.137.064a1.752 1.752 0 0 1-.496.123l-.171.009h-1.787a1.75 1.75 0 0 1-1.51-.867l-.072-.138-.539-1.142.054-.007c-1.4.186-2.817.208-4.221.066l-.497-.057-.535 1.136a1.75 1.75 0 0 1-1.583 1.005H4.75a1.749 1.749 0 0 1-1.618-2.415l.433-1.05a3.242 3.242 0 0 1-1.57-2.78.75.75 0 0 1 .648-.743L2.745 12h1.88l.497-1.642a6.137 6.137 0 0 1 5.875-4.36Zm6.777 9.693c-.771.31-1.559.565-2.356.765l-.549.129.362.77a.25.25 0 0 0 .117.118l.053.019.056.006h1.787a.25.25 0 0 0 .248-.28l-.017-.065-.478-1.155h-.043l.411-.148.409-.159Zm-13.552 0 .39.152.388.141-.482 1.165a.25.25 0 0 0 .232.345h1.804l.057-.006a.25.25 0 0 0 .17-.137l.359-.763.044.01a18.159 18.159 0 0 1-2.962-.907Zm-.202-1.695.151-.499-.507.001.025.053c.086.166.198.316.33.445ZM17.37 12l.756 2.498 2.12.001a.25.25 0 0 0 .243-.193l.007-.057v-1a1.25 1.25 0 0 0-1.122-1.242l-.128-.006L17.37 12Z" />
                            </svg>
                            <div class="status">
                                <span>Position: <b>2nd</b></span>
                                <span>Progress: <b>25%</b></span>
                                <span>Speed: <b>21</b></span>
                                <span>Errors: <b>12</b></span>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

    </section>
</template>
<style scoped>

section {
    margin: auto;
    margin-bottom: 2rem;
    max-width: 1200px;
    width: 100%;
    
}
h2 {
    text-align: center;
    color: var(--color-secondary);
}


table {
    width: 100%;
}

table tr {
    width: 100%;
    background-color: white;
}

table .profile {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: var(--medium-font);
    font-weight: 600;
}

table img {
    border-radius: 50%;
    margin-left: 3px;
    width: 36px;
    display: block;
}

table .track {
    position: relative;
    height: 50px;
    margin: 0 2rem;
}

table .track svg {
    fill: var(--color-primary);
    width: 45px;
    position: absolute;
    top: 50%;
    z-index: 1;
    translate: -50% -50%;
    left: 100%;
}

table .status{
    backdrop-filter: blur(4px);
    position: absolute;
    display: flex;
    gap: 1rem;
    bottom: 0;
    right: -2rem;
    z-index: 2;
    background-color: rgba(6, 0, 95, 0.1);
    padding: 0.4rem 1rem;
    font-size: var(--very-small-font);
}
</style>