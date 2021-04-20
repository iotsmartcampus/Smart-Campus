<template>
    <div class="headerContainer">
        <span class="projectTitle">{{title}}</span>    
        <div class="userHeaderContainer">
            <span class="userName">{{userName}}</span>
            <v-icon name='user-circle' color="#c4c4c4" scale="2.5" class="userIcon" />
        </div>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            required:true
        },
        userName:{
            type:String,
            required:true,
        }
    }
}
</script>
<style  scoped>
    .headerContainer{
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: white;
        height: 10vh;
    }
    .projectTitle{
        font-weight: bold;
        font-size: 1.8rem;
        margin-top: 0.5%;
        margin-left: 1%;
        color: #002171;
        line-height: 50px;
    }
    .userHeaderContainer{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 20%;

    }
    .userName{
        color: #002171;
           font-weight: bold;

    }
    .userIcon{
        cursor: pointer;
    }

</style>