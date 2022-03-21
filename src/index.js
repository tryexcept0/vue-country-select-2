import VueCountryDropdown from "./components/VueCountryDropdown.vue";

export default {
  ...VueCountryDropdown,
  install: Vue => {
    Vue.component(VueCountryDropdown.name, VueCountryDropdown);
    return Vue;
  }
};
