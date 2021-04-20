<template>
    <div class="header" :style="bgColor">
        <h1 class="title" >{{title}}</h1>
    </div>
</template>
<script>
export default {
    props:{
        title: String,
        color: String
    },
    computed:{
        bgColor(){
            return 'background-color:'+this.color
        }
    }
}
</script>
<style >
    .title{
        color: white;
        margin: 0;
        font-size: 2rem;
    }
    .header{
        height: 20%;
        margin:0;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>