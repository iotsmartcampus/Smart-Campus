import client from "../../client/resourceClient";
const state = {
  blocksData: [],
};

// actions
const actions = {
  fetchBlocks: async ({ commit }) => {
    const { data } = await client.get("/block");
    commit("SET_BLOCK_DATA", data);
  },
};

// getters
const getters = {
  getBlockById: (state) => (blockId) => {
    console.log(state);
    console.log(state.blocksData);
    return state.blocksData.find((block) => block.id === blockId);
  },
};

// mutations
const mutations = {
  SET_BLOCK_DATA: (state, payload) => {
    state.blocksData = [...payload];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
