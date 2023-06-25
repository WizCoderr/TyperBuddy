<script setup lang='ts'>
import Api from '../lib/api.js'
const password = ref('')
const confirmPassword = ref('')
const isProcessing = ref(false)

async function onResetPassword(){
    if(isProcessing.value) return
    isProcessing.value = true

    if(confirmPassword.value != password.value){
        alert('Password not matching')
        return
    }

    // let res = await Api.
    
}


</script>
<template>
    <div class="auth">
        <form method="post" @submit.prevent="onResetPassword">
            <h2>Reset Password</h2>
            <p>The following action will reset your account password.</p>
            <input v-model="password" type="password" placeholder="New password">
            <input v-model="confirmPassword" type="password" placeholder="Confirm password">
            <button class="primary" type="submit">
                <span v-if="!isProcessing">Reset</span>
                <div v-else class="loader2"></div>
            </button>
        </form>
    </div>
</template>
<style scoped>@import '../public/style/auth.css';</style>
