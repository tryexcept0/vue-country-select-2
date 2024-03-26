import VueCountrySelect from "./components/VueCountrySelect.vue";

export default {
  ...VueCountrySelect,
  install: Vue => {
    Vue.component(VueCountrySelect.name, VueCountrySelect);
    return Vue;
  }
};
