<script setup lang='ts'>
</script>
<template>
    <Header :auto="false"></Header>
    <WidgetsBreadCrumb style="margin-top: 100px;" />
    <slot></slot>
    <Footer></Footer>
</template>
<style scoped>
h1 {
    color: red;
}
</style>