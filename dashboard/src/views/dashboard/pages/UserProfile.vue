<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      icon="mdi-clipboard-text"
      title="Users"
      class="px-5 py-3"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">ID</th>
            <th class="primary--text">Name</th>
            <th class="primary--text">Country</th>
            <th class="primary--text">City</th>
            <th class="text-right primary--text">Salary</th>
            <th class="text-right primary--text">Editar</th>
            <th class="text-right primary--text">Excluir</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Dakota Rice</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td class="text-right">$36,738</td>
            <td class="text-right">
              <v-btn
                color="#2893F7"
                @click="toogleEditButton"
                class="icon_table--style"
                small
              >
                <v-icon class="mr-1" small color="white">
                  mdi-pencil
                </v-icon></v-btn
              >
            </td>
            <td class="text-right">
              <v-btn color="#FA2F2F" small>
                <v-icon class="mr-1" small color="white"> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Minverva Hooper</td>
            <td>Curaçao</td>
            <td>Sinaas-Waas</td>
            <td class="text-right">$23,789</td>

            <td class="text-right">
              <v-btn color="#2893F7" class="icon_table--style" small>
                <v-icon class="mr-1" small color="white">
                  mdi-pencil
                </v-icon></v-btn
              >
            </td>
            <td class="text-right">
              <v-btn color="#FA2F2F" small>
                <v-icon class="mr-1" small color="white"> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Sage Rodriguez</td>
            <td>Netherlands</td>
            <td>Baileux</td>
            <td class="text-right">$56,142</td>
            <td class="text-right">
              <v-btn color="#2893F7" class="icon_table--style" small>
                <v-icon class="mr-1" small color="white">
                  mdi-pencil
                </v-icon></v-btn
              >
            </td>
            <td class="text-right">
              <v-btn color="#FA2F2F" small>
                <v-icon class="mr-1" small color="white"> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>Philip Chaney</td>
            <td>Korea, South</td>
            <td>Overland Park</td>
            <td class="text-right">$38,735</td>
            <td class="text-right">
              <v-btn color="#2893F7" class="icon_table--style" small>
                <v-icon class="mr-1" small color="white">
                  mdi-pencil
                </v-icon></v-btn
              >
            </td>
            <td class="text-right">
              <v-btn color="#FA2F2F" small>
                <v-icon class="mr-1" small color="white"> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>

          <tr>
            <td>5</td>
            <td>Doris Greene</td>
            <td>Malawi</td>
            <td>Feldkirchen in Kärnten</td>
            <td class="text-right">$63,542</td>
            <td class="text-right">
              <v-btn color="#2893F7" class="icon_table--style" small>
                <v-icon class="mr-1" small color="white">
                  mdi-pencil
                </v-icon></v-btn
              >
            </td>
            <td class="text-right">
              <v-btn color="#FA2F2F" small>
                <v-icon class="mr-1" small color="white"> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>

          <tr>
            <td>6</td>
            <td>Mason Porter</td>
            <td>Chile</td>
            <td>Gloucester</td>
            <td class="text-right">$78,615</td>
            <td class="text-right">
              <v-btn color="#2893F7" class="icon_table--style" small>
                <v-icon class="mr-1" small color="white">
                  mdi-pencil
                </v-icon></v-btn
              >
            </td>
            <td class="text-right">
              <v-btn color="#FA2F2F" small>
                <v-icon class="mr-1" small color="white"> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
    <FormUserDialog
      :dialogData="dialogData"
      @onCloseDialog="toogleEditButton"
    />
  </v-container>
</template>
<script>
import FormUserDialog from "../component/FormUserDialog";
export default {
  components: { FormUserDialog },
  data: function () {
    return {
      dialogData: false,
    };
  },
  methods: {
    toogleEditButton() {
      this.dialogData = !this.dialogData;
    },
  },
};
</script>
<style scoped>
</style>

