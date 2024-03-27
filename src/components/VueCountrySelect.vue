<template>
  <div
    class="vue-country-select"
    :class="{ disabled: disabled }"
  >
    <div
      class="dropdown"
      @click="toggleDropdown"
      v-click-outside="clickedOutside"
      :class="{ open: open }"
      tabindex="0"
    >
      <span class="current">
        <div
          v-if="enabledFlags"
          class="vti__flag"
          :class="activeCountry && activeCountry.iso2 ? activeCountry.iso2.toLowerCase() : null"
        ></div>
        <span
          v-if="enabledCountryCode"
          class="country-code"
          :style="{ 'width': showNameInput ? 'auto' : '100%' }"
          v-text="activeCountry && activeCountry.dialCode ? ` +${activeCountry.dialCode}` : null"
        ></span>
        <span
          v-if="showNameInput"
          :style="{ 'width': showNameInput ? '100%' : 'auto' }"
          class="country-name"
        >
          {{ activeCountry && activeCountry.name ? activeCountry.name : null }}
        </span>
        <span class="dropdown-arrow">{{ open ? "▲" : "▼" }}</span>
      </span>
      <span
        v-show="open"
        class="dropdown-container">
        <input
          v-if="enableSearchCountry"
          class="dropdown-search-input"
          ref="input"
          v-model="searchKey"
          placeholder="Country Name ..."
          type="text"
        />
        <ul
          ref="list"
          class="dropdown-list"
        >
          <li
            class="dropdown-item"
            v-for="(pb, index) in sortedCountries"
            :key="pb.iso2 + (pb.preferred ? '-preferred' : '')"
            @click="choose(pb)"
            :class="getItemClass(index, pb.iso2)"
            @mousemove="selectedIndex = index"
          >
            <div
              class="vti__flag"
              v-if="enabledFlags"
              :class="pb.iso2 && pb.iso2.toLowerCase()"
            ></div>
            <strong v-text="pb.name"></strong>
            <span
              v-if="dropdownOptions && !dropdownOptions.disabledDialCode"
              v-text="pb.dialCode && ` +${pb.dialCode}`"
            ></span>
          </li>
        </ul>
      </span>
    </div>
  </div>
</template>

<script>
import allCountries from "../utils/allCountries";
import getCountry from "../utils/defaultCountry";

export default {
  name: "vue-country-select",
  props: {
    disabledFetchingCountry: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledFormatting: {
      type: Boolean,
      default: false
    },
    defaultCountry: {
      // Default country code, ie: 'AU'
      // Will override the current country of user
      type: String,
      default: ""
    },
    defaultCountryByAreaCode: {
      // Default country code, ie: 'AU'
      // Will override the current country of user
      type: Number,
      default: 0
    },
    enabledCountryCode: {
      type: Boolean,
      default: false
    },
    enabledFlags: {
      type: Boolean,
      default: true
    },
    enablePreferredDivider: {
      type: Boolean,
      default: true
    },
    enableSearchCountry: {
      type: Boolean,
      default: true
    },
    preferredCountries: {
      type: Array,
      default: () => []
    },
    onlyCountries: {
      type: Array,
      default: () => []
    },
    ignoredCountries: {
      type: Array,
      default: () => []
    },
    dropdownOptions: {
      type: Object,
      default: () => ({})
    },
    selectedCountryCode: {
      type: Boolean,
      default: false
    },
    immediateCallSelectEvent: {
      type: Boolean,
      default: true
    },
    showNotSelectedOption: {
      type: Boolean,
      default: false
    },
    notSelectedOptionText: {
      type: String,
      default: ""
    },
    showNameInput: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.initializeCountry();
    if (this.immediateCallSelectEvent) {
      this.$emit("onSelect", this.activeCountry);
    }
  },
  data() {
    return {
      activeCountry: { iso2: "" },
      open: false,
      manualTrigger: false,
      selectedIndex: null,
      typeToFindInput: "",
      typeToFindTimer: null,
      searchKey: ""
    };
  },
  computed: {
    filteredCountries() {
      // List countries after filtered
      if (this.onlyCountries.length) {
        return this.getCountries(this.onlyCountries);
      }

      if (this.ignoredCountries.length) {
        return allCountries.filter(
          ({ iso2 }) =>
            !this.ignoredCountries.includes(iso2.toUpperCase()) &&
            !this.ignoredCountries.includes(iso2.toLowerCase())
        );
      }

      /** */
      if (!this.showNotSelectedOption) {
        const countries = allCountries.slice()
        // remove first element  
        countries.shift();
        return countries
      } else if (this.notSelectedOptionText !== "") {
        allCountries[0].name = this.notSelectedOptionText;
      }

      return allCountries;
    },
    sortedCountries() {
      // Sort the list countries: from preferred countries to all countries
      const preferredCountries = this.getCountries(
        this.preferredCountries
      ).map(country => ({ ...country, preferred: true }));
      return [...preferredCountries, ...this.filteredCountries.filter(({ iso2 }) => !this.preferredCountries.includes(iso2.toUpperCase()))].filter(country => country.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0)
    }
  },
  watch: {
    defaultCountry(newVal) {
      // check param typei can be string like "TR" or area code like 90
      const defaultCountry = this.findCountry(newVal);
      this.choose(defaultCountry);
    },
    defaultCountryByAreaCode(newVal) {
      // check param typei can be string like "TR" or area code like 90
      const defaultCountry = this.findCountryByAreaCode(newVal);
      this.choose(defaultCountry);
    }
  },
  methods: {
    initializeCountry() {
      /**
       * 1. Use default country if passed from parent
       */
      if (this.defaultCountry) {
        const defaultCountry = this.findCountry(this.defaultCountry);
        if (defaultCountry) {
          this.activeCountry = defaultCountry;
          return;
        }
      }

      if (this.defaultCountryByAreaCode) {
        const defaultCountryByAreaCode = this.findCountryByAreaCode(
          this.defaultCountryByAreaCode
        );
        if (defaultCountryByAreaCode) {
          this.activeCountry = defaultCountryByAreaCode;
          return;
        }
      }
      /**
       * 2. Use the first country from preferred list (if available) or all countries list
       */
      this.activeCountry =
        this.findCountry(this.preferredCountries[0]) ||
        this.filteredCountries[0];
      /**
       * 3. Check if fetching country based on user's IP is allowed, set it as the default country
       */
      if (!this.disabledFetchingCountry) {
        getCountry().then(res => {
          this.choose(this.findCountry(res) || this.activeCountry);
        });
      }
    },
    /**
     * Get the list of countries from the list of iso2 code
     */
    getCountries(list = []) {
      return list
        .map(countryCode => this.findCountry(countryCode))
        .filter(Boolean);
    },
    findCountry(iso = "") {
      return allCountries.find(country => country.iso2 === iso.toUpperCase());
    },
    findCountryByAreaCode(areaCode = 0) {
      return allCountries.find(
        country => country.dialCode === areaCode.toString()
      );
    },
    getItemClass(index, iso2) {
      const highlighted = this.selectedIndex === index;
      const lastPreferred = index === this.preferredCountries.length - 1;
      const preferred = !!~this.preferredCountries
        .map(c => c.toUpperCase())
        .indexOf(iso2);
      return {
        highlighted,
        "last-preferred": lastPreferred && this.enablePreferredDivider,
        preferred
      };
    },
    choose(country) {
      this.activeCountry = country;
      this.$emit("onSelect", this.activeCountry);
      this.searchKey = "";
    },
    toggleDropdown(e) {
      if (e.target.classList.contains('dropdown-search-input')) {
        return;
      }
      if (this.disabled) {
        return;
      }
      this.open = !this.open;
      if (this.open) this.$nextTick(() => { this.$refs.input.focus() })
    },
    // Method to enable programmatic trigger of the dropdown by an element in the DOM
    manualDropdown() {
      if (this.disabled) {
        return;
      }
      this.manualTrigger = true;
      this.$refs.input.focus()
      this.open = true;
    },
    clickedOutside() {
      // If this was caused by a programmatic trigger, allow it, then reset the manualTrigger
      if (this.manualTrigger) {
        this.manualTrigger = false;
        return;
      }
      this.open = false;
      this.searchKey = "";
    },
    reset() {
      this.selectedIndex = this.sortedCountries
        .map(c => c.iso2)
        .indexOf(this.activeCountry.iso2);
      this.open = false;
    }
  },
  directives: {
    // Click-outside from BosNaufal: https://github.com/BosNaufal/vue-click-outside
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          var compName = vNode.context.name;
          var warn =
            "[Vue-click-outside:] provided expression " +
            binding.expression +
            " is not a function, but has to be";
          if (compName) {
            warn += "Found in component " + compName;
          }
          console.warn(warn);
        }
        // Define Handler and cache it on the element
        var bubble = binding.modifiers.bubble;
        var handler = function(e) {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        // add Event Listeners
        document.addEventListener("click", handler);
      },
      unbind: function(el) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>

<style src="../assets/sprite.css"></style>
<style>
/* TODO: Find the right way to resolve alias in style block */
/* @import url("~@/assets/sprite.css"); */
.vue-country-select {
  border-radius: 3px;
  display: inline-block;
  border: 1px solid #bbb;
  text-align: left;
}
.vue-country-select:focus-within {
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  border-color: #66afe9;
}
.vue-country-select .dropdown {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  padding: 0.5em;
  position: relative;
  cursor: pointer;
}
.vue-country-select .dropdown.open {
  background-color: #f3f3f3;
}
.vue-country-select .dropdown:hover {
  background-color: #f3f3f3;
}
.vue-country-select .dropdown-container {
  z-index: 1;
  padding: 8px 14px;
  margin: 0;
  text-align: left;
  position: absolute;
  top: 100%;
  left: -1px;
  background-color: #fff;
  border: 1px solid #ccc;
  width: 390px;
}
.vue-country-select .dropdown-search-input {
  width: 100%;
  font-size: 16px;
  padding: 4px;
  box-sizing: border-box;
  -webkit-box-sizing:border-box;
  -moz-box-sizing: border-box;
}
.vue-country-select .dropdown-list {
  padding-left: 0;
  list-style: none;
  overflow-y: scroll;
  max-height: 200px;
}
.vue-country-select .dropdown-item {
  cursor: pointer;
  padding: 4px 0;
}
.vue-country-select .dropdown-item .iti-flag {
  display: inline-block;
  margin-right: 5px;
  margin-left: 5px;
}
.vue-country-select .dropdown-item.highlighted {
  background-color: #f3f3f3;
}
.vue-country-select .dropdown-item.last-preferred {
  border-bottom: 1px solid #cacaca;
}
.vue-country-select .dropdown-arrow {
  transform: scaleY(0.5);
  display: inline-block;
  color: #666;
}
.vue-country-select .current {
  font-size: 0.8em;
  display: flex;
  align-items: center;
  width: 100%;
}
.vue-country-select .country-code {
  color: #666;
  margin-right: 5px;
}
.vue-country-select .country-name {
  color: #000;
  margin-right: 5px;
}
.vue-country-select.disabled .current,
.vue-country-select.disabled .dropdown {
  cursor: no-drop;
}
</style>
