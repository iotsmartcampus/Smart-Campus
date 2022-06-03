<template>
  <div class="loader-container" v-if="blocksData.length === 0">
    <v-progress-circular
      :size="35"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
  <v-container id="dashboard" fluid tag="section" v-else>
    <!--Realtime Chart-->
    <RealTimeChart />
    <!--Block section--->
    <BlockList :blocksData="chartBlockData" />
  </v-container>
</template>

<script>
import BlockList from "./component/block/BlockList.vue";
import RealTimeChart from "./component/RealTimeChart.vue";
export default {
  name: "DashboardDashboard",
  components: {
    BlockList,
    RealTimeChart,
  },
  mounted() {
    this.$store.dispatch("block/fetchBlocks").then(() => {
      this.blocksData = this.$store.state.block.blocksData;
    });
  },
  computed: {
    chartBlockData: function() {
      const blockDataWithChartInformation = this.blocksData.map((block) => {
        return {
          ...block,
          chart: {
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
        };
      });
      return blockDataWithChartInformation;
    },
  },
  data() {
    return {
      blocksData: [],
    };
  },

  methods: {},
};
</script>

<style>
.btn-container {
  margin: 0;
}
.loader-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
</style>
