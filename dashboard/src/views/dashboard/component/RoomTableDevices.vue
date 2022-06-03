<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
          <tr v-for="head in devicesTableData.header" :key="head.title">
         <th class="text-left">
            <div class="">
                <span class="grey--text font-weight-light">
                    {{ head.title }}
                </span>
                <v-icon class="mr-2" large :color="head.color">
                    {{ head.icon }}
                </v-icon>
                </div>
          </th>
      </thead>
      <tbody>
        <tr
          v-for="item in devicesTableData.items"
          :key="item.id"
        >
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

  <script>

    export default {
        name: "RoomTableDevices",
        props: {
            devices: {
                required: true,
            }
        },
        data() {
            return {
                devicesTableData: {
                    header:[],
                    items: []
                }
            }
        },
    }
  </script>
  <style></style
