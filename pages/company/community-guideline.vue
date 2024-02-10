<script setup lang='ts'>
import { useSeoMeta } from '#imports';
import CommonLayout from '../layouts/CommonLayout.vue';

useSeoMeta({
    title: 'Community Guideline',

})


</script>
<template>
    <CommonLayout>
        <h1>Community Guideline</h1>
        <p>Welcome to the TyperBuddy community! Our platform thrives on the interaction and engagement of our users. To
            ensure a positive and welcoming environment for all members, we've established the following guidelines:</p>
        <h1>Respect Each Other</h1>
        <p> Treat fellow members with respect and kindness. Do not engage in personal attacks harassment, hate speech, or
            any form of discrimination.
        </p>
        <h1>Keep it Civil</h1>
        <p> Maintain a civil tone in all interactions. Avoid inflammatory language, profanity, or offensive content that may
            be offensive or inappropriate.
            Contribute Constructively: Engage in discussions constructively and thoughtfully. Provide helpful feedback,
            insights, and contributions that add value to the community.
        </p>
        <h1>Stay On Topic</h1>
        <p>Keep discussions relevant to the purpose of the platform, which includes typing practice, competitions, tips, and
            related topics.
            No Spamming or Self-Promotion: Do not spam the community with repetitive messages, advertisements, or
            self-promotional content. Spamming detracts from the community experience and may result in removal of content
            or suspension of privileges.
        </p>
        <h1>Respect Privacy</h1>
        <p>Protect your own privacy and respect the privacy of others. Do not share personal information such as addresses,
            phone numbers, or financial information.
        </p>
        <h1>Report Inappropriate Behavior</h1>
        <p>f you encounter any behavior that violates these guidelines or makes you feel uncomfortable, please report it to
            the platform administrators immediately.
        </p>
        <h1>Moderation</h1>
        <p>Community content may be moderated by platform administrators to ensure compliance with these guidelines. Users
            who repeatedly violate these guidelines may be subject to warnings, temporary suspension of privileges, or
            permanent bans from the platform.
        </p>

        <h1>Conclusion</h1>
        <p>By participating in the TyperBuddy community, you agree to abide by these guidelines. Thank you for helping us
            foster a supportive and inclusive community environment.
        </p>
        <p>If you have any questions or concerns about these guidelines, please contact us at
        </p>
        <p on-click="mailto:teamflaxstudio@gmail.com" style="cursor: pointer;">teamflaxstudio@gmail.com</p>
        <!-- <p>Last updated:10-feb-2024 </p> -->
    </CommonLayout>
</template>
<style scoped>
</style>
