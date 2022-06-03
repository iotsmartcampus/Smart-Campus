<template>
  <div class="loader-container" v-if="blockData.rooms.length === 0">
    <v-progress-circular
      :size="35"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
  <v-container id="dashboard" fluid tag="section" v-else>
    <v-row>
      <v-col
        v-for="statsItem in blockData.statsData"
        :key="statsItem.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <StatusItem :statsItem="statsItem" />
      </v-col>
      <v-col>
        <RoomTable :blockData="blockData" @onOpenDialog="openDialog" />
      </v-col>
    </v-row>
    <DevicesDialog
      @onClosed="closeDialog"
      :hasOpenendRoomDialog="hasOpenendRoomDialog"
      :devices="deviceList"
    />
  </v-container>
</template>

<script>
import DevicesDialog from "../../component/DevicesDialog";
import RoomTable from "./RoomTable.vue";
import StatusItem from "./StatusItem.vue";
export default {
  name: "Block",
  components: { DevicesDialog, RoomTable, StatusItem },
  created() {
    const fetchedBlock = this.$store.getters["block/getBlockById"](
      this.$route.params.id
    );
    let deviceCounter = 0;
    fetchedBlock.rooms.forEach((item) => {
      deviceCounter = deviceCounter + item.devices.length;
      this.blockData.rooms.push(item);
      // this.sockets.subscribe(`${item.id}_temperature_humildity`, (newData) => {
      //   const room = this.blockData.rooms.find(
      //     (item) => item.id === newData.id
      //   );
      //   if ("temperature" in newData) {
      //     room.temperature = newData.temperature.value;
      //   } else {
      //     room.humidity = newData.humidity.value;
      //   }
      //   this.blockData.rooms = this.blockData.rooms.filter(
      //     (item) => item.id === newData.id
      //   );
      // });
    });

    this.blockData.statsData = [
      {
        id: 1,
        icon: "mdi-flash",
        color: "#FED843",
        title: "consume",
        value: "1500 kWh",
      },
      {
        id: 2,
        value: deviceCounter,
        icon: "mdi-devices",
        color: "#22B35C",
        title: "Dispositivos",
      },
      {
        id: 3,
        icon: "mdi-google-classroom",
        color: "#002171",
        title: "Salas",
        value: this.blockData.rooms.length,
      },
    ];
  },
  data() {
    return {
      hasOpenendRoomDialog: false,
      deviceList: [],
      blockData: {
        rooms: [],
        statsData: [],
      },
      statsCardData: [
        {
          id: 1,
          icon: "mdi-flash",
          color: "#FED843",
          title: "consume",
          value: "1500 kWh",
        },
        {
          id: 2,
          icon: "mdi-devices",
          color: "#22B35C",
          title: "Dispositivos",
          value: "10",
        },
        {
          id: 3,
          icon: "mdi-google-classroom",
          color: "#002171",
          title: "Salas",
          value: "5",
        },
      ],
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
    };
  },

  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    },
    closeDialog() {
      this.hasOpenendRoomDialog = false;
    },
    openDialog(room) {
      console.log(`toggle room ${room.devices}`);
      this.deviceList = room.devices;
      this.hasOpenendRoomDialog = !this.hasOpenendRoomDialog;
    },
  },
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
