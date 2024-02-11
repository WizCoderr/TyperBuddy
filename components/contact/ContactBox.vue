<script setup lang='ts'>
import { ref } from '#imports';

const formData = ref({
    name: '',
    email: '',
    phone: '',
    message: '',
});

</script>
<template>
    <form class="contact-box">
        <h4>Contact Form</h4>
        <WidgetsInputBox label="Name*" :important="true" placeholder="e.g: tony" :value="formData.name" :onChange="v => formData.name = v" />

        <WidgetsInputBox label="Email*" :important="true" type="email" placeholder="e.g: example@gmail.com" :value="formData.email"
            :onChange="v => formData.email = v" />

        <WidgetsInputBox label="Phone" placeholder="e.g: 123456789" :value="formData.phone"
            :onChange="v => formData.phone = v" />

        <WidgetsInputBox label="Message*" :important="true" :rows="6" type="textarea" placeholder="e.g: hello i am tony"
            :value="formData.message" :onChange="v => formData.message = v" />

        <button type="submit" class="button primary">Submit Your Form</button>
    </form>
</template>
<style scoped>
.contact-box {
    background-color: white;
    margin: auto;
    margin-top: 3em;
    margin-bottom: 3em;
    min-height: 300px;
    border: 1px dashed var(--border-color);
    border-radius: var(--border-radius);
    max-width: 600px;
    padding: 0 1em;
    padding-bottom: 1em;
}

.contact-box button {
    margin: auto;
    border-radius: 32px;
}

.contact-box h4 {
    text-align: center;
}
</style>