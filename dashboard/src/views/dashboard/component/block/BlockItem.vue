<template>
  <base-material-chart-card
    :data="block.chart.data"
    :options="block.chart.options"
    :responsive-options="block.chart.responsiveOptions"
    :color="block.chart.blockColor"
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
      {{ block.name }}
    </h4>

    <div class="mx-1">
      <div class="">
        <v-icon class="mr-1" small color="#FED843"> mdi-flash </v-icon>
        <span class="grey--text font-weight-light">
          <!--//TODO: Get the real value-->
          1500 kWh
        </span>
      </div>
      <div class="">
        <v-icon class="mr-1" small color="#22B35C"> mdi-devices </v-icon>
        <span class="grey--text font-weight-light">
          <!--TODO: Calculate the number of devices base on the number of rooms-->
          {{ devicesNumber }}
        </span>
      </div>

      <div class="">
        <v-icon class="mr-1" small color="#002171">
          mdi-google-classroom
        </v-icon>
        <span class="grey--text font-weight-light">
          {{ roomsNumber }}
        </span>
      </div>
    </div>

    <template v-slot:actions>
      <div class="">
        <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
        <!--Get the timestamp-->
        <span class="caption grey--text font-weight-light"
          >updated 10 minutes ago
          <!--//TODO: See how to implement it-->
        </span>
      </div>
      <v-btn
        @click="navigate(block.id)"
        small
        class="btn-container"
        color="primary"
      >
        <span>Vizualizar</span>
      </v-btn>
    </template>
  </base-material-chart-card>
</template>

<script>
export default {
  props: {
    block: Object,
  },
  computed: {
    devicesNumber: function() {
      let countDevices = 0;
      this.block.rooms.forEach((room) => {
        countDevices += room.devices.length;
      });
      return countDevices > 1
        ? `${countDevices} despositivos`
        : `${countDevices} depositivo`;
    },
    roomsNumber: function() {
      const rooms = this.block.rooms.length;
      return rooms > 1 ? `${rooms} salas` : `${rooms} sala`;
    },
  },
  methods: {
    navigate: function(id) {
      this.$router.push({ path: `/block/${id}` });
    },
  },
};
</script>

<style></style>
