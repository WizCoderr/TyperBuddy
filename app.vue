<script setup>
import { saveLocal, getLocalData, getSimpleData, saveSimpleData } from "~/lib/LocalStorageManager"
import { useProfileStore } from '~/store/profile';
import { uid } from "uid";
import { onMounted } from 'vue';
import { NuxtPage, NuxtLayout, NuxtLoadingIndicator } from "#components";
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

const profileStore = useProfileStore()

onMounted(function () {
  if (getSimpleData("multiplayerId") == null) {
    saveSimpleData("multiplayerId", uid(16))
  }
})

</script>

<template>
  <NuxtLoadingIndicator color="#D33396" />
  <NuxtLayout>
    <NuxtPage />
    <SpeedInsights />
  </NuxtLayout>
</template>
