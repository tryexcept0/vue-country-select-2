<template>
  <div id="app">
    <h1 style="color: #000">Telephone Country Select</h1>
    <h2 style="color: #000">made with &#x2764; by Mon.</h2>
    <div style="margin: 20px auto">
      <vue-country-dropdown
        @onSelect="onSelect"
        :disabledFetchingCountry="true"
        :defaultCountryByAreaCode="90"
        :immediateCallSelectEvent="true"
        :enabledFlags="true"
        :enabledCountryCode="true"
        :showNameInput="true"
        :showNotSelectedOption="true"
        :notSelectedOptionText="'Not Selected'"
      ></vue-country-dropdown>
    </div>
    <div>
      <code style="color: #000">{{ selectedCountry }}</code>
    </div>
  </div>
</template>

<script>
import VueCountryDropdown from "./components/VueCountryDropdown";
export default {
  name: "app",
  components: {
    VueCountryDropdown
  },
  data() {
    return {
      selectedCountry: null
    };
  },
  methods: {
    onSelect(data) {
      this.selectedCountry = data;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
