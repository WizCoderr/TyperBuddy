<script setup lang='ts'>
import queryString from 'query-string';
import { AxiosResult } from '~/lib/DataType';
import ApiAuth from '~/lib/api/ApiAuth';

const router = useRouter();

onMounted(async function(){
    const code = queryString.parseUrl(location.href).query.code
    if(code){
        const result = await ApiAuth.signup<{access_token: string}>(code.toString(), 'github')
        if(result.isOk){
            saveToken(result.data!!.access_token)
        }else{
            alert(result.error)
        }
    }else{
        alert('Something went wrong!')
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