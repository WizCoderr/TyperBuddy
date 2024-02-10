<script setup lang="ts">
import { useSeoMeta } from "#imports";
import CommonLayout from "../layouts/CommonLayout.vue";

useSeoMeta({
    title: "Community Guideline",
});
</script>
<template>
    <CommonLayout>
        <h1>Community Guideline</h1>
        <p>
            Welcome to the TyperBuddy community! Our platform thrives on the
            interaction and engagement of our users. To ensure a positive and
            welcoming environment for all members, we've established the
            following guidelines:
        </p>
        <br>
        <ul>
            <li>
                <b>Respect Each Other:</b>Treat fellow members with respect and
                kindness. Do not engage in personal attacks harassment, hate
                speech, or any form of discrimination.
            </li>
            <li>
                <b>Keep it Civil:</b>Maintain a civil tone in all interactions.
                Avoid inflammatory language, profanity, or offensive content
                that may be offensive or inappropriate.
            </li>
            <li>
                <b>Contribute Constructively:</b>Engage in discussions
                constructively and thoughtfully. Provide helpful feedback,
                insights, and contributions that add value to the community.
            </li>
            <li>
                <b>Stay On Topic:</b>Keep discussions relevant to the purpose of
                the platform, which includes typing practice, competitions,
                tips, and related topics.
            </li>
            <li>
                <b>No Spamming or Self-Promotion:</b>Do not spam the community
                with repetitive messages, advertisements, or self-promotional
                content. Spamming detracts from the community experience and may
                result in removal of content or suspension of privileges.
            </li>
            <li>
                <b>Respect Privacy:</b> Protect your own privacy and respect the
                privacy of others. Do not share personal information such as
                addresses, phone numbers, or financial information.
            </li>
            <li>
                <b>Report Inappropriate Behavior:</b>If you encounter any
                behavior that violates these guidelines or makes you feel
                uncomfortable, please report it to the platform administrators
                immediately.
            </li>
            <li>
                <b>Moderation:</b>Community content may be moderated by platform
                administrators to ensure compliance with these guidelines. Users
                who repeatedly violate these guidelines may be subject to
                warnings, temporary suspension of privileges, or permanent bans
                from the platform.
            </li>
        </ul>
        <br>
        <p>
            By participating in the TyperBuddy community, you agree to abide by
            these guidelines. Thank you for helping us foster a supportive and
            inclusive community environment.
        </p>
        <h3>Contact Us</h3>
        <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us on
            <NuxtLink to="/company/contact">here</NuxtLink>.
        </p>
        <!-- <p>Last updated:10-feb-2024 </p> -->
    </CommonLayout>
</template>
<style scoped></style>
