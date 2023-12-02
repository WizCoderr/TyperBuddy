<script setup>
import {saveLocal, getLocalData, getSimpleData, saveSimpleData} from "~/lib/LocalStorageManager"
import { useProfileStore } from '~/store/profile';
import { uid } from "uid";
import { NuxtPage } from "#build/components";

const profileStore = useProfileStore()

onMounted(function(){
  if(getSimpleData("multiplayerId") == null){
    saveSimpleData("multiplayerId", uid(16))
  }
})

</script>

<template>
  <NuxtPage/>
</template>
