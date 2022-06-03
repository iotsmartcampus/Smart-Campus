<template>
  <v-row>
    <v-col class="block-header" cols="12" lg="12">
      <h1 class="text-h2 black--text mb-2">Blocos</h1>
    </v-col>

    <v-col v-for="block in blocksData" v-bind:key="block.id" cols="12" lg="6">
      <BlockItem :block="block" />
    </v-col>
  </v-row>
</template>

<script>
import BlockItem from "./BlockItem.vue";
export default {
  components: {
    BlockItem,
  },
  props: {
    blocksData: [],
  },
};
</script>

<style></style>
