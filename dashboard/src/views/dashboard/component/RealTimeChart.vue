<template>
  <v-row>
    <v-col cols="12" lg="12">
      <base-material-chart-card
        :data="emailsSubscriptionChart.data"
        :options="emailsSubscriptionChart.options"
        :responsive-options="emailsSubscriptionChart.responsiveOptions"
        color="#000"
        hover-reveal
        type="Line"
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
          Consumo em real time
        </h4>
        <template v-slot:actions>
          <div>
            <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
            <span class="caption grey--text font-weight-light"
              >updated 10 minutes ago
            </span>
          </div>
        </template>
      </base-material-chart-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: function() {
    return {
      emailsSubscriptionChart: {
        data: {
          labels: [, 2, 3, 4, 5, 6, 7, 8],
          series: [[5, 9, 7, 8, 5, 3, 5, 4]],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 10,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 6,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },
};
</script>

<style></style>
