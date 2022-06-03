import Vue from "vue";
import Vuex from "vuex";

import settings from "./modules/settings";
import block from "./modules/block";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    block,
  },
});
