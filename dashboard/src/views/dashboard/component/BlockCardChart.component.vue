<template>
  <base-material-chart-card
    :data="blockData.data"
    :options="blockData.options"
    :responsive-options="blockData.responsiveOptions"
    :color="blockData.blockColor"
    hover-reveal
    type="Bar"
  >
    <template v-slot:reveal-actions>
      <v-tooltip bottom>
        <template v-slot:activator="{ attrs, on }">
          <v-btn v-bind="attrs" color="info" icon v-on="on">
            <v-icon color="info"> mdi-refresh </v-icon>
          </v-btn>
        </template>

        <span>Refresh</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ attrs, on }">
          <v-btn v-bind="attrs" light icon v-on="on">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>

        <span>Change Date</span>
      </v-tooltip>
    </template>

    <h4 class="card-title font-weight-medium mt-2 ml-2">
      {{ blockData.blockName }}
    </h4>

    <p class="d-inline-flex font-weight-light ml-2 mt-1">
      Last Campaign Performance
    </p>

    <template v-slot:actions>
      <div class="">
        <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
        <span class="caption grey--text font-weight-light"
          >updated 10 minutes ago
        </span>
      </div>
      <v-btn small class="btn-container" color="primary">
        <span>Vizualizar</span>
      </v-btn>
    </template>
  </base-material-chart-card>
</template>

<script>
export default {
  props: {
    blockData,
  },
};
</script>