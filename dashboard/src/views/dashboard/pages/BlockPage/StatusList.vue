<template>
  <div>
    <v-col
      v-for="statsItem in blockData.statsData"
      :key="statsItem.id"
      cols="12"
      sm="6"
      lg="4"
    >
      <StatusItem />
    </v-col>
  </div>
</template>

<script>
import StatusItem from "./StatusItem.vue";
export default {
  components: {
    StatusItem,
  },
  props: {
    blockData: {
      required: true,
    },
  },
};
</script>

<style></style>
