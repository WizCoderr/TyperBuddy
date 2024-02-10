<script setup lang='ts'>
</script>
<template>
    <Header :auto="false"></Header>
    <WidgetsBreadCrumb style="margin-top: 100px;" />
    <section>
        <div class="page">
            <div class="content">
                <div id="content-area">
                    <slot></slot>
                </div>
                <TableOfContent />
            </div>
        </div>
    </section>
    <Footer></Footer>
</template>
<style scoped>
.content {
    display: grid;
    grid-template-columns: 1fr 250px;
    gap: 1em;
    padding-bottom: 200px;
}

@media only screen and (max-width: 900px) {
    .content {
        grid-template-columns: 1fr 200px;
    }
}

@media only screen and (max-width: 700px) {
    .content {
        margin-top: 32px;
        display: flex;
        flex-direction: column-reverse;
    }
}
</style>

<style>
.dev {
    padding: 3em;
    background-color: rgb(235, 235, 235);
}
</style>