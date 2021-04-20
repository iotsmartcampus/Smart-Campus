import blockRepository from '../../repositories/BlockRepository'
const state = {
    averageConsume: null,
    devicesQuantity:null,
    consumeChart: [],
    rooms: []
};

// actions
const actions = {

    init ({commit, dispatch}, blockID) {

        return new Promise((resolve, reject) => {
            //SearchBlockData
            //SearchRoomData
            //SetUpEvents
            //temperatureRoomChangeEvent
            //humidityRoomChangeEvent
            //AverageRoomConsumeEvent
        
            resolve()
        })
    },

    searchBlock({commit}, blockID) {
        return new Promise((resolve, reject) =>{

        })

    },

    searchAllRoomsByBlockID({commit}, ) {
        
    },


};

// getters
const getters = {
    isAuthenticated (state) {
        return state.token !== null
    },

    token(state) {
        return state.token
    },

    isValidDateToken(state) {
        const MINUTOS_VALIDADE_TOKEN = 60;
        const minutos = parseInt(((new Date() - state.token_update_date) / 1000) / 60);
        return minutos < MINUTOS_VALIDADE_TOKEN;
    },

    getUnidadeLotacao(state) {
        return state.unidadeLotacao
    },
    getUserName(state){
        return state.username
    }
};

// mutations
const mutations = {
    AUTHENTICATE: (state, authUser) => {
        state.token = authUser.token;
        state.token_update_date = authUser.date;
        state.username = authUser.username
    },
    CLEAR_AUTH_DATA: (state) => {
        state.token = null;
        state.token_update_date = null;
    },
    UPDATE_AUTH_DATA: (state, tokenData) => {
        state.token = tokenData.token;
        state.token_update_date = tokenData.date;
    },
    SET_UNIDADE_LOTACAO: (state, unidade) => {
        state.unidadeLotacao = unidade
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}