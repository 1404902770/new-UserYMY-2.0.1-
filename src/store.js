import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socketData: [],
    countData: []
  },
  mutations: {
    setsocketData(state, sdata) {
      state.socketData = sdata;
    },
    setcountData(state, cdata) {
      state.countData = cdata;
      for (var i = 0; i < state.countData.length; i++) {
        for (var j = i + 1; j < state.countData.length; j++) {
          if (state.countData[i].mid == state.countData[j].mid && state.countData[i].nid == state.countData[j].nid) {
            state.countData.splice(j, 1)
          }
        }
      }
    }
  },
  actions: {}
});
