<template>
  <v-row justify="center">
    <v-dialog v-model="hasOpenendRoomDialog" max-width="900px">
      <DevicePanel :devices="devices" title="Dispositivos da sala" />
    </v-dialog>
  </v-row>
</template>
<script>
import DevicePanel from "./device/DevicePanel.vue";
export default {
  name: "DevicesDialog",
  components: {
    DevicePanel,
  },
  props: {
    hasOpenendRoomDialog: {
      type: Boolean,
      default: false,
      required: true,
    },
    devices: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      devicesData: [
        {
          id: "0001",
          type: "AirConditioner",
          title: "Arcondionados",
          icon: "mdi-air-conditioner",
          color: "#FED843",
          devices: [
            {
              id: "0000102",
              status: "on",
            },
            {
              id: "0000103",
              status: "on",
            },
            {
              id: "0000104",
              status: "on",
            },
          ],
        },
        {
          id: "002",
          title: "Lampadas",
          icon: "mdi-lamp",
          color: "#002171",
        },
      ],
    };
  },
};
</script>
