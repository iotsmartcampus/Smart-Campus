<template>
    <div class="contentHome">
        
        
        <button class="btnAdd">
            Adicionar
            <v-icon  name='plus' color="white" scale="1" ></v-icon>
        </button>

        <ul class="blockContent">
            <li class="blockCard" v-for="block in blocks" v-bind:key="block.name">
                <BlockHeader :color='block.color' :name='block.name' />
                <div class="iconContainer">
                     <v-icon name="bolt" color="#FED843"/>
                <span>{{block.energyConsume}} KwH</span>
                </div>
                <div class="iconContainer">
                <v-icon name="microchip" color="#22B35C" />
                <span>{{block.devicesQuantity}} dispositivos </span>
                </div>
                <div class="iconContainer">
                    <v-icon name="chalkboard" color="#002171" />
                    <span>{{block.activeRoom}} salas </span>
                </div>
            </li>
        </ul>

        
    </div>
</template>
<script>
import BlockHeader from './BlockHeader'
export default {
    components:{
        BlockHeader
    },
    data: function(){
        return {

            blocks: [{
                color: '#3126A7',
                name: 'B1',
                energyConsume: 1500,
                devicesQuantity: 6,
                activeRoom: 10
                
            },
            {   
                color: '#22B35C',
                name: 'B2',
                energyConsume: 1500,
                devicesQuantity: 6,
                activeRoom: 10
            },
            
            {   
                color: '#637FD9',
                name: 'B3',
                energyConsume: 1500,
                devicesQuantity: 6,
                activeRoom: 10
            },
            {   
                color: '#F97373',
                name: 'B4',
                energyConsume: 1500,
                devicesQuantity: 6,
                activeRoom: 10
            },
            ]
        }
    }
}
</script>
<style  >

    .contentHome{
        display: flex;
        flex-direction: column;
    }
    .btnAdd{
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: white;
        font-weight: 700;
        background-color: #22B35C ;
        border: none;
        width: 8rem;
        padding: 0.7rem;
        border-radius: 10px;
        text-transform: uppercase;
        align-self: flex-end;
        margin-right: 1.5rem;
        margin-top: 2rem;
        cursor: pointer;
    }
    .blockContent{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        margin: 0;
        font-weight: bold;
    }

    .blockCard{
        background-color: white;
        height: 50%;
        width: 20%;
      
        margin: 7%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .iconContainer{
        margin-bottom: 5%;
    }
</style>
