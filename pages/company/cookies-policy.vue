<script setup lang='ts'>
import { useSeoMeta } from '#imports';
import CommonLayout from '@/layouts/CommonLayout.vue';

useSeoMeta({
    title: 'Cookies Policy',

})


</script>
<template>
    <CommonLayout>
        <h1>Cookies Policy</h1>
        <p>This Cookie Policy explains how TyperBuddy ("we", "us", or "our") uses cookies and similar tracking technologies
            when you visit our website.</p>
        <h3>What are cookies?</h3>
        <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies
            are widely used by website owners in order to make their websites work, or to work more efficiently, as well as
            to provide reporting information.</p>
        <h3>How We Use Cookies</h3>
        <p>We use cookies to improve your experience on our website, including:</p>
        <ol>
            <li>
                <b>Essential Cookies:</b>These cookies are necessary for the website to function properly. They enable
                basic functions like page
                navigation and access to secure areas of the website.
            </li>
            <li>
                <b>Performance Cookies:</b>These cookies help us understand how visitors interact with our website by
                collecting information
                anonymously. This information allows us to improve the performance and user experience of the site.
            </li>
            <li><b>Functionality Cookies:</b>These cookies enable the website to remember choices you make (such as
                language preferences) and provide
                enhanced features.
            </li>
            <li>
                <b>Advertising Cookies:</b>We may use third-party advertising cookies to display personalized
                advertisements based on your browsing
                activity and interests.
                Your Cookie Preferences
            </li>
        </ol>
        <p>You can manage your cookie preferences by clicking on the "Cookie Settings" link in the footer of our
            website.
        </p>
        <h3>Third-Party Cookies</h3>
        <p>Some cookies on our website may be set by third-party services that we use to enhance the user experience,
            analyze website traffic, and deliver targeted advertisements. These third-party services may also collect
            information about your use of other websites.</p>
        <h3>Changes to this Cookie Policy</h3>
        <p>We may update this Cookie Policy from time to time. Any changes will be reflected on this page. We encourage
            you
            to review this policy periodically for any updates.
        </p>
        <h3>Contact Us</h3>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us on
            <NuxtLink to="/company/contact">here</NuxtLink>.
        </p>
        <!-- <p>Last updated:10-feb-2024 </p> -->
    </CommonLayout>
</template>
<style scoped>
</style>
