<script setup lang='ts'>
import { useSeoMeta } from '#imports';
import CommonLayout from '@/layouts/CommonLayout.vue';

useSeoMeta({
    title: 'About Us',

})


</script>
<template>
    <CommonLayout>
        <h1>About Us</h1>
        <p>Welcome to TyperBuddy, your ultimate destination for honing your typing skills and mastering the art of keyboard
            proficiency!</p>

        <p>At TyperBuddy, we believe that efficient typing is an essential skill in today's fast-paced digital world.
            Whether you're a student, professional, or simply someone looking to enhance your typing speed and accuracy,
            TyperBuddy is here to support you on your journey to typing excellence.</p>

        <h3>Our Mission</h3>
        <p>Our mission at TyperBuddy is simple: to provide a fun, engaging, and effective platform for users to improve
            their typing skills. We aim to empower individuals of all ages and backgrounds to become more efficient and
            productive typists, ultimately enabling them to succeed in both personal and professional endeavors.</p>

        <h3>What We Offer</h3>
        <ul>
            <li><b>Typing Games and Exercises</b>: Explore a wide range of typing games and exercises designed to make
                learning
                enjoyable and interactive. From classic typing drills to fun-filled games, there's something for everyone to
                enjoy while sharpening their typing skills.</li>
            <li><b>Multiplayer Typing Races:</b> Challenge yourself against friends or strangers in exhilarating multiplayer
                typing
                races. Put your skills to the test in real-time competitions and see who emerges victorious as the fastest
                typist.</li>
            <li><b>Comprehensive Progress Tracking</b>: Track your typing progress with detailed insights into your speed,
                accuracy, and performance over time. Monitor your improvement and celebrate your achievements as you
                strive
                towards typing mastery.</li>
            <li><b>Community Engagement</b>: Join a vibrant community of fellow typists who share your passion for typing.
                Connect
                with like-minded individuals, share tips and tricks, and participate in friendly competitions to keep your
                motivation levels high.</li>
        </ul>

        <h3>Our Commitment</h3>
        <p>At TyperBuddy, we are committed to providing an exceptional user experience and continuously enhancing our
            platform to meet the evolving needs of our users. We value transparency, accessibility, and inclusivity, and we
            strive to foster a supportive environment where everyone feels welcome and encouraged to improve their typing
            skills.</p>

        <h3>Contact Us</h3>
        <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us on
            <NuxtLink to="/company/contact">here</NuxtLink>.
        </p>
        <br>
        <p>Thank you for choosing TyperBuddy as your trusted partner on your typing journey. Let's type our way to success
            together!</p>
        <!-- <p>Last updated:10-feb-2024 </p> -->
    </CommonLayout>
</template>
<style scoped>
</style>
