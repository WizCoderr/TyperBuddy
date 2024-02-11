<script setup lang="ts">
import { useSeoMeta } from "#imports";
import CommonLayout from "@/layouts/CommonLayout.vue";

useSeoMeta({
    title: "FAQ",
});
</script>
<template>
    <CommonLayout>
        <h1>FAQ - Frequently Asked Questions</h1>
        <FaqBox />
    </CommonLayout>
</template>
<style scoped></style>
