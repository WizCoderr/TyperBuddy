<script setup>
import {saveLocal, getLocalData} from "~/lib/LocalStorageManager"
import { useProfileStore } from '~/store/profile';

const profileStore = useProfileStore()

onMounted(function(){
  console.log("hello")
})

</script>

<template>
  <NuxtPage/>
</template>
