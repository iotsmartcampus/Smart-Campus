<template>
  <base-material-stats-card
    :color="statsItem.color"
    :icon="statsItem.icon"
    :title="statsItem.title"
    :value="statsItem.value"
    sub-icon="mdi-clock"
    sub-text="Just Updated"
  />
</template>

<script>
export default {
  props: {
    statsItem: {
      required: true,
    },
  },
};
</script>

<style></style>
