<script setup lang='ts'>
import Api from '../lib/api.js'

const first = ref('')
const last = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const otpInput = ref('')

const isOtpVisible = ref(false)
let token = ''

async function onSignupSubmit(){
    if(password.value != confirmPassword.value){
        alert('Password not matching')
        return
    }

    let res = await Api.signup(first.value, last.value, email.value, password.value)
    if(res.isError){
        alert(res.error)
    }else{
        if(res.result != null){
            token = res.result.token
            showOtpDialog()
        }else{
            alert('something went wrong')
        }
    }
}


async function onResendOtp(){

}

let secondsLeft = ref(59)
function showOtpDialog(){
    secondsLeft.value = 59
    isOtpVisible.value = true
    otpCountdown()
}


function otpCountdown(){
    secondsLeft.value -= 1
    if(secondsLeft.value > 0){
        setTimeout(otpCountdown, 1000)
    }
}

async function resendOtp(){
    secondsLeft.value = 59

    let res = await Api.signupOtpResend(token)
    if(res.isError){
        alert(res.error)
    }else{
        otpCountdown()
    }
}

async function verifyOTP(){
    if(otpInput.value.toString().length < 6){
        alert('Invalid OTP')
        return
    }

    const otp = otpInput.value.toString().slice(0, 7)

    let res = await Api.signupVerify(token, otp)
    if(res.isError){
        alert(res.error)
    }else{
        if(res.result != null){
            localStorage.setItem('token', res.result.token)
            window.location.href = '/'
        }else{
            alert('something went wrong')
        }
    }
    
}

</script>
<template>
    <div class="auth">

        <!-- Sign up form -->
        <form v-if="!isOtpVisible" method="post" @submit.prevent="onSignupSubmit()">
            <h2>Sign Up</h2>
            <p>Welcome to TyperBuddy</p>
            <input v-model="first" type="text" placeholder="First name" required>
            <input v-model="last" type="text" placeholder="Last name" required>
            <input v-model="email" type="email" placeholder="Email" required>
            <input v-model="password" type="password" placeholder="Password" required>
            <input v-model="confirmPassword" type="password" placeholder="Confirm password" required>
            <button class="primary" type="submit">Sign Up</button>

            <div class="divider">
                <hr>
                <span>Or</span>
            </div>
            <button type="button" class="secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 0 326667 333333">
                    <path
                        d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                        fill="#4285f4" />
                    <path
                        d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                        fill="#34a853" />
                    <path
                        d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                        fill="#fbbc04" />
                    <path
                        d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                        fill="#ea4335" />
                </svg> 
                <span>Sign up with Google</span>
            </button>
            <p>Already have an account? <a href="#">Sign in</a></p>
        </form>


        <!-- OTP Form -->
        <form v-else method="post" @submit.prevent="verifyOTP()">
            <h2>OTP</h2>
            <p>We have sent the OTP on your email, type the OTP to verify the email.</p>
            <div class="otp-container">
                <div>
                    <span v-for="item, index in 6">{{ otpInput.toString()[index] }}</span>
                </div>
                <input v-model="otpInput" type="number">
            </div>
            <div class="resend">
                <span v-if="secondsLeft > 0">Resend code in 00:{{ secondsLeft }}</span>
                <span v-else class="button" @click="resendOtp()">Resend</span>
            </div>
            
            <button class="primary" type="submit">Verify</button>
        </form>
    </div>
</template>
<style scoped>@import '../public/style/auth.css';</style>