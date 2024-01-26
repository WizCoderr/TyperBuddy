<script setup lang='ts'>
import { onMounted } from '#imports';
import queryString from 'query-string';

import {GoogleIcon, GithubIcon, CloseIcon} from "../icons"

const props = defineProps<{
    isVisible: boolean
}>()

const emit = defineEmits<{
    (event: 'close'): void
}>()

function close() {
    emit('close')
}

//@ts-ignore
const githubClientID = import.meta.env.VITE_GITHUB_CLIENT_ID
//@ts-ignore
const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID

let hostUrl = ""
onMounted(function () {
    hostUrl = window.location.origin
})


function signInWithGoogle() {
    const params = queryString.stringify({
        client_id: googleClientID,
        redirect_uri: hostUrl + '/auth-verification/google',
        scope: ['email', 'profile'].join(' '), // space separated string
        response_type: 'code'
    });

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    window.location.href = googleLoginUrl

}

function signInWithGithub() {
    const params = queryString.stringify({
        client_id: githubClientID,
        redirect_uri: hostUrl + '/auth-verification/github',
        scope: ['read:user', 'user:email'].join(' '), // space separated string
        allow_signup: true,
    });

    const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;
    window.location.href = githubLoginUrl
}

</script>
<template>
    <Head>

    </Head>
    <div v-if="isVisible" class="dialog">
        <div class="content">

            <button @click="close()" class="close">
                <CloseIcon style="width: 24px; height: 24px; fill: white;" />
            </button>

            <img src="../../public/images/planet.png" alt="planet">
            <h2>Welcome</h2>
            <p>Create an account and access<br>cool features</p>


            <button class="btn google" @click="signInWithGoogle()">
               <GoogleIcon style="width: 24px; height: 24px;" />
                <span>Continue with Google</span>
            </button>

            <!-- <button class="btn facebook">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24"
                    shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640">
                    <path
                        d="M380.001 120.001h99.993V0h-99.993c-77.186 0-139.986 62.8-139.986 139.986v60h-80.009V320h79.985v320h120.013V320h99.994l19.996-120.013h-119.99v-60.001c0-10.843 9.154-19.996 19.996-19.996v.012z" />
                </svg>
                <span>Continue with Facebook</span>
            </button> -->
<!-- 
            <button @click="signInWithGithub()" class="btn github">
                
                <GithubIcon style="width: 24px; height: 24px;" />
                <span>Continue with Github</span>
            </button> -->

        </div>
    </div>
</template>
<style scoped>
@import '~/public/style/dialog.css';


.dialog .content {
    position: relative;
    max-width: 400px;
    margin: 0;
    padding: 0;
}

.dialog h2 {
    margin-bottom: 0.5em;
}

.dialog img {
    width: 100%;
    border-top-left-radius: var(--border-radius-3);
    border-top-right-radius: var(--border-radius-3);
}

button.close {
    position: absolute;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    right: 8px;
    top: 8px;
    background-color: rgba(255, 255, 255, 0.219);
    border: none;
}

button.close:hover {
    scale: 1.1;
}

.dialog button.btn {
    display: flex;
    align-items: center;
    padding: 1em 1rem;
    border: none;
    background-color: #ebebeb;
    gap: 1rem;
    width: 70%;
    margin: 0.5rem auto;
    border-radius: 6px;
    cursor: pointer;
    overflow: auto;
}

.dialog button span {
    font-size: var(--medium-font);
    color: var(--color-on-surface);
}

button.btn.facebook {
    background-color: #1877F2;
}

button.btn.github {
    background-color: #000000;
    margin-bottom: 2rem;
}


button.facebook span,
button.github span {
    color: white;
}

button.google:hover {
    background-color: #e0e0e0;
}

button.facebook:hover {
    background-color: #055bcc;
}

button.github:hover {
    background-color: #2c2c2c;
}
</style>