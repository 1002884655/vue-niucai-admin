/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
export const modules = {
  common: () => require('./common/index').default,
  index: () => require('./index/index').default,
  user: () => require('./user/index').default
}

Object.keys(modules).forEach((modKey) => {
  const modNS = modKey.split('/')
  const getMod = modules[modKey]
  store.registerModule(...modNS, getMod())
})

export default store
