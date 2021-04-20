<template>
    <div>
        <MainHeaderBar :title="titleProject" v-bind:userName="userName" />
        <div class="content">

        <MainSiderBar @setMainContent='setMainContent' />
            <div class="tabContent">

            <component v-bind:is='currentTab' > </component>
            </div>
        </div>
        
    </div>
</template>

<script>
import MainHeaderBar from '../components/header/MainHeaderBar'
import MainSiderBar from '../components/SideBar/MainSideBar'
import Users from '../components/SideBar/Users/Users'
import Energy from '../components/SideBar/Energy/Energy'
import Home from '../components/SideBar/Home/Home'

export default {
    components:{
        MainHeaderBar,
        MainSiderBar,
        Users,
        Home,
        Energy
    },
    data: function(){
        return {
            userName: "Joao Igor Matos da Silva",
            titleProject: "Smart Campus",
            currentTab: 'Home'
        }
    }
    ,methods:{
        setMainContent:function(currentTab){
            this.currentTab = currentTab
        }
    }
}
</script>
<style>
    .content{
        display: flex;
        
    }
    .tabContent{
        width: 100%;
    }
</style>