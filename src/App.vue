<template>
  <div id="app">
    <h1 style="color: #000">Vue Country Select 2</h1>
    <h2 style="color: #000">made with &#x2764; by Ivane.</h2>
    <div style="margin: 20px auto">
      <vue-country-select
        @onSelect="onSelect"
        :preferredCountries="['IE', 'GB']"
        :disabledFetchingCountry="true"
        defaultCountry="IE"
        :defaultCountryByAreaCode="90"
        :immediateCallSelectEvent="true"
        :enabledFlags="true"
        :enabledCountryCode="false"
        :enablePreferredDivider="false"
        :showNameInput="false"
        :showNotSelectedOption="false"
        :dropdownOptions="{disabledDialCode: true}"
        :notSelectedOptionText="'Not Selected'"
      ></vue-country-select>
    </div>
    <div>
      <code style="color: #000">{{ selectedCountry }}</code>
    </div>
  </div>
</template>

<script>
import VueCountrySelect from "./components/VueCountrySelect";
export default {
  name: "app",
  components: {
    VueCountrySelect
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
