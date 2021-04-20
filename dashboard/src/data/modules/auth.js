/* eslint-disable */

import {RepositoryFactory}  from "../../repositories/RepositoryFactory"
console.log(RepositoryFactory)
const authRepository  = RepositoryFactory.get('authentication');

// state
const state = {
    token: localStorage.getItem("token"),
    token_update_date: new Date(localStorage.getItem("token_update_date")),
    tokenExpirado: false,
    permissoes: null,
    unidadeLotacao: null,
    username:localStorage.getItem('nome')
};

// actions
const actions = {

    login ({commit, dispatch}, authData) {
        return new Promise((resolve, reject) => {
            authRepository.login(
                authData.email,
                authData.password
            )
            .then(res => {
                const date = new Date();
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('token_update_date', date);
                localStorage.setItem('nome', res.data.username);
                
                commit('AUTHENTICATE', {token: res.data.token, date,username:res.data.username });
            })
            .catch(error => console.log(error))
            .finally(() => resolve())
        })
    },

    updateToken({commit}, tokenData) {
        const date = new Date();
        localStorage.setItem('token', tokenData.token);
        localStorage.setItem('token_update_date', date);
        commit('UPDATE_AUTH_DATA', {token: tokenData.token, date});
    },

    removeToken({commit}) {
        localStorage.removeItem('token');
        localStorage.removeItem('token_update_date');
        commit('CLEAR_AUTH_DATA')
    },

    getUnidadeLotacao({commit}) {
        // Busca o unidade de lotação do usuário
        axios.get('/auth/unidade').then(res => {
            commit('SET_UNIDADE_LOTACAO', res.data)
        })
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