<template>
  <div class="sideBarContainer">
    <ul class="listContainerMenu">

      <li 
        v-for="tab in tabs"
        v-bind:key="tab.tabName"
        v-bind:class="{ active: currentTab === tab.componentToLoad }"
        class="itemContainer"
        v-on:click="setContent"
        :id='tab.componentToLoad'
      >
        <v-icon class="icon" :name='tab.tabIcon' color="white" scale="2" />
        <span class="itemText">{{tab.tabName}}</span>
      </li>

    </ul>
  </div>
</template>
<script>
export default {

  data: function () {
    return {
      currentTab: 'Home',
      tabs: [{
        "tabName": "Iniciar",
        "tabIcon": "home",
        "componentToLoad":"Home"
      },
      {
        "tabName": "Usuarios",
        "tabIcon": "users",
        "componentToLoad":"Users"
      },

      {
        "tabName": "Energia",
        "tabIcon": "bolt",
        "componentToLoad":"Energy"
      },
      ]
    };
  },

  methods: {
    setContent: function (e) {
      this.currentTab = e.target.id;
      this.$emit('setMainContent', this.currentTab);
    },
  },
};
</script>
<style scoped>
.sideBarContainer {
  height: 100vh;
  width: 14%;
  background-color: #04194d;
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  margin: 0;
  width: 100%;
  padding: 0;
  height: 100%;
}
.icon{
  margin-left: 3%;
}
.itemContainer {
  display: flex;
  flex-direction: row;
  height: 10%;
  align-items: center;

  cursor: pointer;
}
.listContainerMenu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.itemText {
  color: white;
  font-weight: bold;
  margin-left: 5%;
  margin-top: 4%;
}
.active {
    width: 100%;
    position: relative;
}
.active:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #c4c4c4;
 filter: opacity(38%);

}
</style>
