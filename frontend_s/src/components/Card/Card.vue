<template>
    <div class="card">
        <CardHeader color="#0D47A1" title="Smart Campus"/>
        <slot></slot>
    </div>
</template>
<script>
import CardHeader from './CardHeader'
export default {    
    props:{
        
    },
    components:{
        CardHeader,
        
    }
}
</script>

<style>
    .card{
        background-color: white;
        border-radius: 1px;
        position: absolute;
        width: 30%;
        top: 10%;
        left: 35%;
        height: 80%;
        padding: 0;
    }
</style>