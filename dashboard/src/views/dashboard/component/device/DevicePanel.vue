<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-expansion-panels>
          <v-expansion-panel v-for="device in mapDevices()" :key="device.type">
            <v-expansion-panel-header>
              {{ device.type }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col
                  v-for="item in device.data"
                  :key="item.id"
                  cols="12"
                  sm="6"
                  lg="6"
                  md="4"
                >
                  <DeviceItem :deviceStyle="deviceStyle" :item="item" />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { extractDevicesAllowedToShow } from "../../../../helpers/devices";
import DeviceItem from "./DeviceItem.vue";
export default {
  computed: {
    computedDevices: function() {
      return this.mapDevices();
    },
  },
  components: {
    DeviceItem,
  },
  props: {
    title: {
      required: true,
    },
    devices: {
      required: true,
    },
  },
  data() {
    return {
      mappedDevices: [],

      deviceStyle: {
        RelayDevice: {
          color: "#002171",
          icon: "mdi-lamp",
        },
        InfraredDevice: {
          color: "#FED843",
          icon: "mdi-air-conditioner",
        },
      },
    };
  },
  methods: {
    mapDevices() {
      const mappedDevices = [];
      const devicesType = new Set();
      //Loop through the devices array and add each device on the set
      const allowedDevices = extractDevicesAllowedToShow(this.devices);
      allowedDevices.forEach((device) => devicesType.add(device.type));

      devicesType.forEach((type) => {
        const data = allowedDevices.filter((item) => item?.type === type);
        const modifedData = data.map((item) => {
          return {
            ...item,
            status: "on",
          };
        });
        mappedDevices.push({ type, data: modifedData });
      });
      console.log(mappedDevices);
      return mappedDevices;
    },
  },
};
</script>

<style></style>
