<template>
  <div>
    <div class="">
      <v-icon class="mr-2" large :color="deviceStyle[item.type].color">
        {{ deviceStyle[item.type].icon }}
      </v-icon>
      <span class="grey--text font-weight-light">
        {{ item.type === 'InfraredDevice' ? 'Ar Condicionado' :  'Lampada' }}
      </span>
    </div>

    <v-switch
      :label="deviceStatus === 'on' ? 'Ligar' : 'Desligar'"
      color="red"
      value="red"
      hide-details
      @click="handleToggle()"
      :disabled="requestSender !== 'toggle' && requestSender !== null"
      :input-value="statusToggle"
      @change="change()"
      v-model="statusToggle"
    ></v-switch>
    <v-btn
      v-if="item.type === 'InfraredDevice'"
      class="mr-2"
      depressed
      small
      outlined
      plain
      color="indigo"
      v-on:click="sendCommand(deviceData)"
      :disabled="requestSender !== 'plus' && requestSender !== null"
      :loading="requestSender === 'plus'"
      >+</v-btn
    >
    <v-btn
      color="indigo"
      v-if="item.type === 'InfraredDevice'"
      depressed
      small
      outlined
      plain
      :disabled="requestSender !== 'minus' && requestSender !== null"
      :loading="requestSender === 'minus'"
      >-</v-btn
    >
  </div>
</template>

<script>
import { sendCommand } from '../../../../services/api.js';

export default {
  props: {
    deviceStyle: {
      required: true,
    },
    item: {
      required: true,
    },
  },
  data() {
    return {
      deviceStatus: this.item.status,

      isProcessingRequest: false,
      requestSender: null,
      statusToggle: false
    };
  },
  methods: {
    handleToggle() {
      this.deviceStatus = this.deviceStatus === "on" ? "off" : "on";
      this.deviceStatusConnectivity = this.deviceStatus === "off";
      this.requestSender = "toggle";
      //Send the command
      console.log(this.item)
      console.log(this.deviceStatus)
      // :label="deviceStatus === 'on' ? 'Ligar' : 'Desligar'"
      status = this.item.status === 'on' ? "off" : "on";
      console.log(status)
  
      // sendCommand(status, this.item.type, this.item.id );
    },
     change(){
      console.log("change");
      this.statusToggle = this.item.status === 'on' ? true : false;
    }
  },
};
</script>

<style></style>
