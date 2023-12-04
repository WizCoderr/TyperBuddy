<script setup lang='ts'>
import { navigateTo } from 'nuxt/app';


function onJoin(){
    navigateTo('tournaments/view/sdfsadf')
}
</script>
<template>
    <div class="card">
        <div class="left">
            <div>
                <h3>KeyMaster Challenge</h3>
                <p>Elevate your typing skills in this thrilling tournament of speed and precision.</p>
            </div>
            <div class="bottom">
                <div class="item">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.253 2a2.25 2.25 0 0 1 2.236 2h1.268A1.75 1.75 0 0 1 20.5 5.606l.006.144v3a3.25 3.25 0 0 1-3.066 3.245l-.21.006a5.758 5.758 0 0 1-4.731 3.95V17.5h1.753a3.25 3.25 0 0 1 3.244 3.066l.006.184v.5a.75.75 0 0 1-.649.743l-.101.007H6.75a.75.75 0 0 1-.744-.648L6 21.25v-.5a3.25 3.25 0 0 1 3.065-3.245l.185-.005H11v-1.549a5.758 5.758 0 0 1-4.729-3.95L6.245 12a3.25 3.25 0 0 1-3.25-3.25v-3c0-.966.784-1.75 1.75-1.75h1.268A2.25 2.25 0 0 1 8.25 2h7.003Zm-1 17H9.25a1.75 1.75 0 0 0-1.705 1.352l-.028.148h8.468a1.75 1.75 0 0 0-1.579-1.493L14.253 19Zm1-15.5H8.25a.75.75 0 0 0-.75.75v5.998a4.252 4.252 0 0 0 8.503 0V4.25a.75.75 0 0 0-.75-.75Zm3.504 2h-1.254v4.983A1.75 1.75 0 0 0 19 8.904l.007-.154v-3a.25.25 0 0 0-.193-.243l-.057-.007ZM6 5.5H4.745a.25.25 0 0 0-.25.25v3A1.75 1.75 0 0 0 6 10.483V5.5Z" />
                    </svg>
                    <span>Prize: <b>$100</b></span>
                </div>
                <div class="item green">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.75 15c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297-2.91 0-4.567-1.09-4.567-3.259v-1c0-.966.784-1.75 1.75-1.75h5.5Zm0 1.5h-5.5a.25.25 0 0 0-.25.25v1c0 1.176.887 1.759 3.067 1.759 2.168 0 2.995-.564 2.933-1.757V16.75a.25.25 0 0 0-.25-.25Zm-11-6.5h4.376a4.007 4.007 0 0 0-.095 1.5H3.75a.25.25 0 0 0-.25.25v1c0 1.176.887 1.759 3.067 1.759.462 0 .863-.026 1.207-.077a2.743 2.743 0 0 0-1.173 1.576l-.034.001C3.657 16.009 2 14.919 2 12.75v-1c0-.966.784-1.75 1.75-1.75Zm16.5 0c.966 0 1.75.784 1.75 1.75l-.001.962c.117 2.19-1.511 3.297-4.432 3.297l-.169-.002a2.755 2.755 0 0 0-1.218-1.606c.387.072.847.108 1.387.108 2.168 0 2.995-.564 2.933-1.757V11.75a.25.25 0 0 0-.25-.25h-4.28a4.05 4.05 0 0 0-.096-1.5h4.376ZM12 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM6.5 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm11 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm-11 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm11 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                    </svg>
                    <span><b>49/100</b></span>
                </div>
            </div>

        </div>
        <div class="right">
            <span class="chip">Paid</span>
            <div class="time">
                <span>Time Left</span>
                <span>00:12:10:13</span>
            </div>
            <button :onClick="onJoin">Join Now</button>
        </div>
    </div>
</template>
<style scoped>
.card {
    border-radius: var(--border-radius-2);
    background-color: white;
    height: 180px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 220px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}


.card .bottom {
    display: flex;
    align-items: center;
    gap: 24px;
}


.card .bottom .item {
    color: var(--color-primary);
    display: flex;
    gap: 4px;
    align-items: center;
}

.card .bottom .item.green {
    color: #f72585;
}

.card .bottom .item.green svg {
    fill: #f72585;
}

.card .item svg {
    fill: var(--color-primary);
}




.card h3 {
    margin-top: 0;
    margin-bottom: 0.5em;
}


.card .right {
    height: 100%;
    border-radius: 100px var(--border-radius-2) var(--border-radius-2) 100px;
    background-color: #3d5a80;
    padding-top: 50px;
    padding-bottom: 12px;
    padding-left: 50px;
    padding-right: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

.card .right .chip {
    position: absolute;
    background-color: white;
    border-radius: 40px;
    padding: 0.2em 0.7em;
    top: 12px;
    right: 12px;
    font-size: var(--small-font);
    font-weight: bold;
}

.card .right .time {
    color: white;
    display: grid;
    justify-content: center;

}

.card .right .time span:last-child {
    font-size: var(--big-font);
    font-weight: bold;
    letter-spacing: 4px;
    display: block;
}



.card .left {
    padding: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card button {
    border: none;
    font-size: var(--medium-font);
    background-color: white;
    border-radius: 50px;
    padding: 0.5em 1em;
    margin-bottom: 12px;
    transition: all 200ms;
}

.card button:hover {
    opacity: 0.8;
}</style>