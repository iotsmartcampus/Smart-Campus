<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col
        v-for="statsCard in statsCardData"
        :key="statsCard.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          :color="statsCard.color"
          :icon="statsCard.icon"
          :title="statsCard.title"
          :value="statsCard.value"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>
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
      <v-col>
        <base-material-card
          icon="mdi-clipboard-text"
          title="Salas"
          class="px-5 py-3"
        >
          <v-simple-table>
            <thead>
              <tr>
                <th class="primary--text">ID</th>
                <th class="primary--text">Average Consume</th>
                <th class="primary--text">Temperature</th>
                <th class="primary--text">Humidity</th>
                <th class="text-right primary--text">Devices</th>
                <th class="text-right primary--text">Vizualizar</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="roomData in blockData.rooms" :key="roomData.id">
                <td>{{roomData.id }}</td>
                <td>1500 KmH</td>
                <td>{{roomData.temperature}}</td>
                <td>{{roomData.humidity}}</td>
                <td class="text-right">5</td>
                <td class="text-right">
                  <v-btn
                    color="primary"
                    @click="toogleRoomDialog"
                    class="icon_table--style"
                    small
                  >
                    <v-icon class="mr-1" small color="white">
                      mdi-magnify
                    </v-icon></v-btn
                  >
                </td>
              </tr>

            </tbody>
          </v-simple-table>
        </base-material-card>
      </v-col>
    </v-row>
    <RoomDialogComponent
      @onClosed="toogleRoomDialog"
      :hasOpenendRoomDialog="hasOpenendRoomDialog"
    />
  </v-container>
</template>

<script>
import RoomDialogComponent from "../component/BlockRoomDialog.component";
import BlockRepository from "../../../repositories/BlockRepository"

export default {
  name: "Block",
  components: { RoomDialogComponent },
  created(){
  //Search for block's room
  //Set up the events
  const blockID = "urn:ngsi-ld:Block:001"
  BlockRepository.getAllRoomsByBlockId(blockID)
  .then(({data})=>{
      data.forEach(item=>{
        this.blockData.rooms.push(item)
          this.sockets.subscribe(`${item.id}_temperature_humildity`, (newData) => {
              const room = this.blockData.rooms.find(item=>item.id ===newData.id)
              console.log(room)
              if('temperature' in newData){
                room.temperature = newData.temperature.value
              }  
              else{
                room.humidity = newData.humidity.value
              }
              this.blockData.rooms = this.blockData.rooms.filter(item=> item.id === newData.id)
          });
      })
  })
  .catch(err=>{
      console.log(err)
  })
  },
  data() {
    return {
      hasOpenendRoomDialog: false,
      blockData:{
        rooms:[]
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
      emailsSubscriptionChart: {
        data: {
          // labels: [
          //   "Ja",
          //   "Fe",
          //   "Ma",
          //   "Ap",
          //   "Mai",
          //   "Ju",
          //   "Jul",
          //   "Au",
          //   "Se",
          //   "Oc",
          //   "No",
          //   "De",
          // ],
          labels: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
          ],
          series: [
            [
              2.523438,
              7.148438,
              7.533125,
              6.891563,
              2.363437,
              -1.340313,
              -4.125625,
              -7.656875,
              -7.520313,
              -6.79875,
              -5.352813,
              -0.68125,
              1.509375,
              3.04625,
              6.194688,
              6.945,
              7.586875,
              6.351562,
              1.7325,
              -1.70125,
              -4.744063,
              -8.048438,
              -7.417813,
              -6.877813,
              -4.712813,
              0.010313,
              1.934063,
              3.635,
              6.502813,
              7.5475,
              5.78,
              1.149375,
              -1.98,
              -5.32625,
              -8.239375,
              -7.313438,
              -6.87125,
              -3.859688,
              0.561875,
              2.222187,
              4.29875,
              6.686563,
              6.542187,
              7.392188,
              5.065313,
            ],
          ],
        },
        options: {
          axisX: {
            showGrid: true ,
          },
          low: -10,
          high: 10,
          chartPadding: {
            top: 0,
            right: 3,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
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
    toogleRoomDialog() {
      this.hasOpenendRoomDialog = !this.hasOpenendRoomDialog;
    },
  },
};
</script>
