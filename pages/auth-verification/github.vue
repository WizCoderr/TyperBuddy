<script setup lang='ts'>
import queryString from 'query-string';
import { AxiosResult } from '~/lib/DataType';
import ApiAuth from '~/lib/api/ApiAuth';
import { useToast } from 'vue-toast-notification';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const $toast = useToast();

const router = useRouter();

onMounted(async function(){
    const code = queryString.parseUrl(location.href).query.code
    console.log({code})
    if(code){
        const result = await ApiAuth.signup<{access_token: string}>(code.toString(), 'github')
        if(result.isOk){
            saveToken(result.data!!.access_token)
            $toast.success("Successfully signup done", {position: "bottom"})
        }else{
            console.log(result)
            $toast.error("Failed to signup, please try again later!", {position: "bottom"})
        }
    }else{
        $toast.error("Failed to signup, please try again later!", {position: "bottom"})
    }

    router.push({ path: '/', replace: true })
})



function saveToken(token: string){
    localStorage.setItem('access_token', token)
}

</script>
<template>
    <section>
        <p>Please wait...</p>
    </section>
</template>
<style scoped>

</style>