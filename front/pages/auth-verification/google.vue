<script setup lang='ts'>
import queryString from 'query-string';
import Api from '~/lib/api';


onMounted(function(){
    const code = queryString.parseUrl(location.href).query.code
    if(code){

        const res = Api.signup(code.toString(), 'google')
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