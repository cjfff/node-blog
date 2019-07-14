import { checkLogin, logout } from "@/http/api";
import { Message } from "element-ui";

const state = {
  userInfo: {}
};

const mutations = {
  update(state, payload) {
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        state[key] = payload[key];
      }
    }
  }
};

const actions = {
  async checkLogin({ commit }) {
    try {
      const result = await checkLogin();
      commit("update", {
        userInfo: result.payload
      });
      return result;
    } catch (error) {
      return false;
    }
  },
  logout({ commit }) {
    return logout().then(() => {
      Message.success("登出成功");
      commit("update", { userInfo: {} });
    });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
