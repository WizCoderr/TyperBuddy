<script setup lang='ts'>
import Api from '../lib/api.js'
const email= ref('')
const isProcessing = ref(false)

async function onResetPassword(){
    if(isProcessing.value) return
    isProcessing.value = true

    const res = await Api.resetPasswordRequest(email.value)
    isProcessing.value = false
    if(res.isError){
        alert(res.error)
    }else{
        if(res.result != null){
            alert('We have sent an reset password email, please check it to reset your password')
        }else{
            alert('Something went wrong')
        }
    }
}


</script>
<template>
    <div class="auth">
        <form method="post" @submit.prevent="onResetPassword">
            <h2>Forgot Password</h2>
            <p>Enter your email address associated with your account and we'll send reset link on your email.</p>
            <input v-model="email" type="email" placeholder="Email">
            <button class="primary" type="submit">
                <span v-if="!isProcessing">Reset</span>
                <div v-else class="loader2"></div>
            </button>
        </form>
    </div>
</template>
<style scoped>@import '../public/style/auth.css';</style>
