<script setup lang='ts'>
import { useSeoMeta } from '#imports';
import CommonLayout from '../layouts/CommonLayout.vue';

useSeoMeta({
    title: 'Privacy Policy',

})


</script>
<template>
    <CommonLayout>
        <h1>Privacy Policy</h1>
        <p>This Privacy Policy describes how TyperBuddy ("we", "us", or "our") collects, uses, and shares your
            information when you use our typing platform services, including playing with friends, participating in
            typing tests, local practices, online matches, free tournaments, and paid tournaments (collectively, the
            "Services"). By accessing or using our Services, you consent to the collection, use, and disclosure of
            your information in accordance with this Privacy Policy.
        </p>
        <h3>Information You Provide</h3>
        <ul>
            <li><b>Account Information</b>: When you register for an account, we collect your email address,
                username and profile picture.
            </li>
            <li><b>Profile Information</b>: You may choose to provide additional information such as your
                name, profile picture, and other details to customize your profile.
            </li>
            <li><b>Payment Information</b>: We are processing our payments securely through Razorpay. And it may collect
                some of your details which are required by the Razorpay.
            </li>
        </ul>

        <h3>Information We Collect Automatically</h3>
        <ul>
            <li>
                <b>Usage Information</b>: We collect information about your interactions with the Services, such as the
                types of games you play, your scores, and other usage statistics.
            </li>
            <li><b>Device Information</b>: We automatically collect information about the device you use to access the
                Services, including device model, operating system, IP address, and browser type.
            </li>
        </ul>

        <h3>How We Use Your Information</h3>
        <ol>
            <li><b>To Provide and Improve Our Services</b>: We use your information to operate, maintain, and improve our
                Services, including developing new features and optimizing user experience.
            </li>
            <li><b>Communication</b>: We may use your email address to send you important updates, announcements, and
                information related to the Services. You can opt-out of these communications at any time.
            </li>
            <li><b>Customer Support</b>: We may use your information to respond to your inquiries, provide customer support,
                and address technical issues.
            </li>
            <li><b>Payment Processing:</b> We use your payment information to process transactions for paid tournaments
                securely through Razorpay.
            </li>
        </ol>
        <h3>Information Sharing</h3>
        <ol>
            <li><b>With Third-Party Service Providers</b>: We may share your information with third-party service providers
                who assist us in operating, maintaining, and improving our Services. These service providers are obligated
                to keep your information confidential and secure.
            </li>
            <li><b>Legal Compliance</b>: We may disclose your information if required by law or in response to a valid legal
                request, such as a court order or subpoena.
            </li>
        </ol>

        <h3>Data Security</h3>
        <p>We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or
            destruction. However, please note that no method of transmission over the internet or electronic storage is 100%
            secure.
        </p>

        <h3>Children's Privacy</h3>
        <p>Our Services are not intended for children under the age of 13. We do not knowingly collect personal information
            from children under 13. If you believe that we have inadvertently collected information from a child under 13,
            please contact us immediately.
        </p>
        <h3>Changes to this Privacy Policy</h3>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
            Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
        <h3>Contact Us</h3>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us on
            <NuxtLink to="/company/contact">here</NuxtLink>.
        </p>
    </CommonLayout>
</template>
<style scoped></style>