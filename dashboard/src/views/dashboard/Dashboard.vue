<template>
  <v-container id="dashboard" fluid tag="section">
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
    <v-row>
      <v-col class="block-header" cols="12" lg="12">
        <h1 class="text-h2 black--text mb-2">Blocos</h1>
      </v-col>
      <v-col v-for="chart in chartData" v-bind:key="chart" cols="12" lg="6">
        <base-material-chart-card
          :data="chart.data"
          :options="chart.options"
          :responsive-options="chart.responsiveOptions"
          :color="chart.blockColor"
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
            {{ chart.blockName }}
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Campaign Performance
          </p>
          <div class="mx-1">
            <div class="">
              <v-icon class="mr-1" small color="#FED843"> mdi-flash </v-icon>
              <span class="grey--text font-weight-light">
                {{ chart.blockConsume }} kWh
              </span>
            </div>
            <div class="">
              <v-icon class="mr-1" small color="#22B35C"> mdi-devices </v-icon>
              <span class="grey--text font-weight-light">
                {{ chart.blockDevices }} despositivos
              </span>
            </div>

            <div class="">
              <v-icon class="mr-1" small color="#002171">
                mdi-google-classroom
              </v-icon>
              <span class="grey--text font-weight-light">
                {{ chart.blockActiveRooms }} salas
              </span>
            </div>
          </div>

          <template v-slot:actions>
            <div class="">
              <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
              <span class="caption grey--text font-weight-light"
                >updated 10 minutes ago
              </span>
            </div>
            <v-btn
              @click="navigate(chart.id)"
              small
              class="btn-container"
              color="primary"
            >
              <span>Vizualizar</span>
            </v-btn>
          </template>
        </base-material-chart-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardDashboard",

  data() {
    return {
      chartData: [
        {
          id: 1,
          blockName: "Bloco 01",
          blockColor: "#22B1F0",
          blockConsume: 1500,
          blockDevices: 10,
          blockActiveRooms: 5,
          data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [[5, 9, 7, 8, 5, 3, 5, 4]],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            showArea: true,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        {
          id: 2,
          blockName: "Bloco 02",
          blockColor: "#E32B59",
          blockConsume: 1500,
          blockDevices: 20,
          blockActiveRooms: 5,
          data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [[5, 9, 7, 8, 5, 3, 5, 4]],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            showArea: true,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        {
          id: 3,
          blockName: "Bloco 03",
          blockColor: "#F05D51",
          blockConsume: 2000,
          blockDevices: 5,
          blockActiveRooms: 5,
          data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [[5, 9, 7, 8, 5, 3, 5, 4]],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            showArea: true,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        {
          id: 4,
          blockName: "Bloco 04",
          blockColor: "#4D3354",
          blockConsume: 3000,
          blockDevices: 6,
          blockActiveRooms: 5,

          data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [[5, 9, 7, 8, 5, 3, 5, 4]],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            showArea: true,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
      ],
      dailySalesChart: {
        id: 1,
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          series: [[5, 9, 7, 8, 5, 3, 5, 4]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          showArea: true,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
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
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },

  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    },
    navigate: function (id) {
      this.$router.push({ path: `/block/${id}` });
    },
  },
};
</script>

<style>
.btn-container {
  margin: 0;
}
</style>