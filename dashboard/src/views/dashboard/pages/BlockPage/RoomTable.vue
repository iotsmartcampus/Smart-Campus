<template>
  <base-material-card icon="mdi-clipboard-text" title="Salas" class="px-5 py-3">
    <v-simple-table>
      <thead>
        <tr>
          <th class="primary--text">Nome</th>
          <th class="primary--text">Average Consume</th>
          <th class="primary--text">Temperature</th>
          <th class="primary--text">Humidity</th>
          <th class="text-right primary--text">Devices</th>
          <th class="text-right primary--text">Vizualizar</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="roomData in blockData.rooms" :key="roomData.id">
          <td>{{ roomData.name }}</td>
          <td>1500 kWh</td>
          <td>{{ roomData.temperature }}</td>
          <td>{{ roomData.humidity }}</td>
          <td class="text-right">{{ roomData.devices.length }}</td>
          <td class="text-right">
            <v-btn
              color="primary"
              @click="openDeviceDialog(roomData)"
              class="icon_table--style"
              small
              :disabled="roomData.devices.length === 0"
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
</template>

<script>
export default {
  props: {
    blockData: {
      required: true,
    },
  },
  methods: {
    openDeviceDialog(roomData) {
      this.$emit("onOpenDialog", roomData);
    },
  },
};
</script>

<style></style>
