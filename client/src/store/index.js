import Vue from "vue";
import Vuex from "vuex";

const modules = {};

const files = require.context("./modules/", false, /\.js$/);
files.keys().forEach(path => {
  const { moduleName } = path.match(/\.\/(?<moduleName>.*)\.js/).groups;
  modules[moduleName] = files(path).default;
});

Vue.use(Vuex);

const store = new Vuex.Store({
  modules
});

export default store;
