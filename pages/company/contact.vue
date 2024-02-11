<script setup lang="ts">
import { useSeoMeta } from "#imports";
import CommonLayout from "../layouts/CommonLayout.vue";

useSeoMeta({
    title: "Contact Us",
});
</script>
<template>
    <CommonLayout>
        <h1>Contact Us</h1>

        <p>We're delighted that you've chosen to reach out to us. Whether you have questions, feedback, or just want to say
            hello, we're here to listen and assist you in any way we can.
        </p>
        <p>At TyperBuddy, we value each and every interaction with our visitors and customers. Your input helps us improve
            our
            platform and provide better services to you and the entire TyperBuddy community.
        </p>
        <p>Please don't hesitate to use any of the contact methods provided below to get in touch with us. We're eager to
            hear
            from you and look forward to building a strong and positive relationship.
        </p>
        <ContactBox />
        <p> Thank you for considering TyperBuddy as your go-to destination for all things typing-related. We can't wait to
            connect with you!
        </p>
    </CommonLayout>
</template>
<style scoped></style>
