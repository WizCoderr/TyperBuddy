<script setup lang='ts'>
import queryString from 'query-string';
import Api from '~/lib/api';

const router = useRouter();

onMounted(async function(){
    const code = queryString.parseUrl(location.href).query.code
    if(code){
        const result = await Api.signup(code.toString(), 'github')
        if(result.statusText == 'OK'){
            saveToken(result.data.access_token)
        }
    }else{
        alert('Something went wrong!')
    }

    router.back();
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