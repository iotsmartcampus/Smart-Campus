<template>
    <div class="headerBlockContent" :style="styleObject">
        <span class="mainText">{{name}}</span>
    </div>
</template>

<script>
export default {
    props:{
        color:{
            type:String,
            required: true
        },
        name:{
            type:String,
            required: true
        }
    },
    data: function(){
        return {
            styleObject:{
                'background-color': this.color
            }
        }
    }
}
</script>
<style>
    .headerBlockContent{
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #cccccc;
        margin-bottom: 5%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .mainText{
        font-size: 3rem;
        color: white;
        font-weight: bold;

    }
</style>