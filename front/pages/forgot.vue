<script setup lang='ts'>

const inputValue = ref<number>()

</script>
<template>
    <div class="auth">
        <form v-if="false">
            <h2>Forgot Password</h2>
            <p>Enter your email address associated with your account and we'll send a OTP.</p>
            <input type="email" placeholder="Email">
            <button class="primary" type="submit">Send</button>
        </form>

        <form>
            <h2>OTP</h2>
            <p>We have sended the OTP on your email.</p>
            <div class="otp-container">
                <div>
                    <span v-for="item, index in 6">{{ inputValue?.toString()[index] }}</span>
                </div>
                <input v-model="inputValue" type="number">
            </div>
            <button class="primary" type="submit">Verify</button>
        </form>
    </div>
</template>
<style scoped>@import '../public/style/auth.css';</style>
