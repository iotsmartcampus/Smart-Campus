<template>
  <v-row justify="center">
    <v-dialog v-model="hasOpenendRoomDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Dispositivos da Sala</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                v-for="deviceData in devicesData"
                :key="deviceData.id"
                cols="12"
                sm="6"
                lg="6"
                md="4"
              >
                <div class="">
                  <v-icon class="mr-2" large :color="deviceData.color">
                    {{ deviceData.icon }}
                  </v-icon>
                  <span class="grey--text font-weight-light">
                    {{ deviceData.title }}
                  </span>
                </div>

                <v-switch
                  :label="deviceData.status? 'Desligar': 'Ligar' "
                  color="red"
                  value="red"
                  hide-details
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" color="blue darken-1" text> Close </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>




export default {

  name: "RoomDialogComponent",
  created(){


  
  },
  props: {
    hasOpenendRoomDialog: {
      type: Boolean,
      default: false,
      required: true,
    },
    decicesIds:{
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      devicesData: [
        {
          id: "0001",
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
        {
          id: "003",
          title: "Projetor",
          icon: "mdi-projector",
          color: "#0B0C0F",
        },
      ],
    };
  },
  methods: {
    closeDialog() {
      this.$emit("onClosed");
    },
  },
};
</script>