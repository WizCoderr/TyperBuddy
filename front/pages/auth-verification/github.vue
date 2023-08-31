<script setup lang='ts'>
import queryString from 'query-string';
import { resourceLimits } from 'worker_threads';
import Api from '~/lib/api';


onMounted(async function(){
    const code = queryString.parseUrl(location.href).query.code
    if(code){

        const result = await Api.signup(code.toString(), 'github')
    }else{
        alert('Something went wrong!')
    }
})

</script>
<template>
    <section>
        <p>Please wait...</p>
    </section>
</template>
<style scoped>

</style>