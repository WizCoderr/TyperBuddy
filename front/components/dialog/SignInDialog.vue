<script setup lang='ts'>
import queryString from 'query-string';
// import { GoogleLogin } from 'vue3-google-login';

const props = defineProps<{
    isVisible: boolean
}>()

const emit = defineEmits<{
    (event: 'close'): void
}>()

function close() {
    emit('close')
}

const githubClientID = import.meta.env.VITE_GITHUB_CLIENT_ID
const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const hostUrl = import.meta.env.VITE_HOST_URL

// https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(' ')}&response_type=code
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24px" height="24px" viewBox="0 0 24 24">
                    <path
                        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </button>

            <img src="../../public/images/planet.png" alt="planet">
            <h2>Welcome</h2>
            <p>Create an account and access<br>cool features</p>


            <button class="btn google" @click="signInWithGoogle()">
                <svg width="24" height="24" viewBox="0 0 57 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_101_17)">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M56.9999 29.6445C56.9999 27.26 56.8058 25.52 56.386 23.7156H29.0815V34.4777H45.1086C44.7856 37.1522 43.0407 41.18 39.163 43.8865L39.1088 44.2469L47.7418 50.9162L48.34 50.9757C53.8331 45.9168 56.9999 38.4734 56.9999 29.6445Z"
                            fill="#4285F4" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M29.0816 57.9999C36.9334 57.9999 43.5251 55.4221 48.34 50.9756L39.1631 43.8864C36.7073 45.5943 33.4114 46.7865 29.0816 46.7865C21.3911 46.7865 14.864 41.7278 12.5372 34.7356L12.1962 34.7645L3.21924 41.6923L3.10181 42.0177C7.88404 51.4909 17.7073 57.9999 29.0816 57.9999Z"
                            fill="#34A853" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12.5373 34.7357C11.9235 32.9314 11.568 30.9979 11.568 29.0002C11.568 27.0023 11.9233 25.069 12.505 23.2646L12.4888 22.8802L3.39948 15.8411L3.10215 15.9822C1.13111 19.9134 0.000244141 24.3277 0.000244141 29C0.000244141 33.6723 1.13129 38.0865 3.10215 42.0177L12.5375 34.7356"
                            fill="#FBBC04" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M29.0816 11.2133C34.5424 11.2133 38.2259 13.5656 40.3264 15.5313L48.5338 7.54019C43.4932 2.86794 36.9334 0.000244141 29.0816 0.000244141C17.7073 0.000244141 7.88422 6.50907 3.10181 15.9823L12.5049 23.2648C14.864 16.2726 21.3911 11.2135 29.0816 11.2135"
                            fill="#EA4335" />
                    </g>
                    <defs>
                        <clipPath id="clip0_101_17">
                            <rect width="57" height="58" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
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

            <button @click="signInWithGithub()" class="btn github">
                <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_101_35)">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M31.9988 0.797421C14.3293 0.797421 0 15.1243 0 32.7961C0 46.9353 9.1678 58.9259 21.8826 63.1591C23.483 63.4555 24.0712 62.4634 24.0712 61.6177C24.0712 60.8547 24.0393 58.3342 24.0263 55.6625C15.1231 57.5984 13.2463 51.8853 13.2463 51.8853C11.7911 48.186 9.6934 47.2022 9.6934 47.2022C6.7902 45.2143 9.9143 45.258 9.9143 45.258C13.1269 45.4825 14.8183 48.5534 14.8183 48.5534C17.6743 53.4456 22.3066 52.0294 24.1314 51.2132C24.4196 49.1451 25.2464 47.7325 26.1629 46.9329C19.0549 46.1262 11.5832 43.3813 11.5832 31.1189C11.5832 27.6263 12.8352 24.7704 14.8797 22.5309C14.5467 21.7231 13.4506 18.4703 15.188 14.0635C15.188 14.0635 17.875 13.2025 23.9909 17.3435C26.5421 16.636 29.2787 16.2793 31.9965 16.2675C34.7165 16.2793 37.4579 16.6348 40.0127 17.3435C46.1203 13.2049 48.8049 14.0635 48.8049 14.0635C50.5447 18.4715 49.4534 21.7266 49.1203 22.531C51.1719 24.7704 52.4133 27.6263 52.4133 31.1189C52.4133 43.4096 44.925 46.1119 37.8016 46.9045C38.9497 47.8966 39.9749 49.8443 39.9749 52.8278C39.9749 57.107 39.9383 60.5558 39.9383 61.6082C39.9383 62.4598 40.5147 63.4555 42.1375 63.1436C54.8451 58.9082 64.0012 46.9162 64.0012 32.7854C64.0012 15.1159 49.6743 0.786621 32.0012 0.786621L31.9989 0.797321L31.9988 0.797421Z"
                            fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_101_35">
                            <rect width="64" height="64" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                <span>Continue with Github</span>
            </button>

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