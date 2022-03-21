
## This is a forked repository. The original repo is [here.](https://hantrongbinh.github.io/vue-country-code/) I'm just added some new features.

# vue-country-dropdown

Country Code Select with Vue.

## Installation

- **yarn**:
  ```bash
    yarn add vue-country-dropdown
  ```
- **npm**:
  ```bash
    npm i --save vue-country-dropdown
  ```

## Usage

- Install as a global component:

  ```javascript
  import Vue from "vue";
  import VueCountryDropdown from "vue-country-dropdown";

  Vue.use(VueCountryDropdown);
  ```

- In your component:

  ```js
  <template>
  ...
     <vue-country-dropdown
                    @onSelect="onSelect"
                    <!-- optional -->
                    :preferredCountries="['vn', 'us', 'gb']">
     </vue-country-dropdown>
  ...
  <template>
  <script>
  export default {
    data() {
      return {
      };
    },
    methods: {
       onSelect({name, iso2, dialCode}) {
         console.log(name, iso2, dialCode);
       },
    },
  }
  </script>
  ```

- Manual Trigger:
    ```js
  <template>
  ...
     <vue-country-dropdown
                    ref="vcd"
                    @onSelect="onSelect"
     </vue-country-code>
     <button @click="manualTrigger">Manual Trigger</button>
  ...
  <template>
  <script>
  export default {
    data() {
      return {
      };
    },
    methods: {
       onSelect({name, iso2, dialCode}) {
         console.log(name, iso2, dialCode);
       },
       manualTrigger() {
         this.$refs.vcd.manualDropdown();
       }
    },
  }
  </script>
  ```

### Props

| Property value            | Type      | Default value                 | Description                                                                 |
| ------------------------- | --------- | ----------------------------- | --------------------------------------------------------------------------- |
| `defaultCountry`          | `string`  | `''`                          | Default country, will override the country fetched from IP address of user  |
| `disabledFetchingCountry` | `Boolean` | false                         | Disable fetching current country based on IP address of user                |
| `enabledCountryCode`      | `Boolean` | `false`                       | Enable country code in the input                                            |
| `enabledFlags`            | `Boolean` | `true`                        | Enable flags in the input                                                   |
| `preferredCountries`      | `Array`   | `[]`                          | Preferred countries list, will be on top of the dropdown. ie `['AU', 'BR']` |
| `onlyCountries`           | `Array`   | `[]`                          | List of countries will be shown on the dropdown. ie `['AU', 'BR']`          |
| `ignoredCountries`        | `Array`   | `[]`                          | List of countries will NOT be shown on the dropdown. ie `['AU', 'BR']`      |
| `dropdownOptions`         | `Object`  | `{ disabledDialCode: false }` | Options for dropdown, supporting `disabledDialCode`                         |
| `defaultCountryByAreaCode`         | `Number`  | `0` | Same as default country option. finds the default country from list by area code.|
| `showNotSelectedOption`         | `Boolean`  | `false` | The `Not Selected` option is added to the top of the list. The Iso2 and area code value are empty.|
| `notSelectedOptionText`         | `String`  | `Not Selected` | Replace `Not Selected` text with another string.|
| `immediateCallSelectEvent`         | `Boolean`  | `true` | Call the `onSelect` event when the component is mounted.|


### Events

| Property value | Arguments | Description                                                                                      |
| -------------- | --------- | ------------------------------------------------------------------------------------------------ |
| `onSelect`     | `Object`  | Fires when the input changes with the argument is the object includes `{ name, iso2, dialCode }` |

## Highlights & Credits

- Original repository [hantrongbinh/vue-country-code](https://hantrongbinh.github.io/vue-country-code/).
- Forked from [EducationLink/vue-tel-input](https://github.com/EducationLink/vue-tel-input).
- Vue app created by [vue-cli](https://github.com/vuejs/vue-cli).
- Telephone Number parsing, validation by [libphonenumber-js](https://catamphetamine.github.io/libphonenumber-js/).
- Country Codes data from [intl-tel-input](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/data.js).
- Country Flags by [behdad/region-flags](https://github.com/behdad/region-flags).
- User's Location by [get-json](https://www.npmjs.com/package/get-json) and [ipifo.io](https://ipinfo.io/json)

## Demo Usage

```bash

# install dependencies
$ yarn/npm install

# compile demo and start serve for development
$ yarn/npm dev

# build
$ yarn/npm build

```

Made by [Mon](https://github.com/hantrongbinh).
Forked and updated by [Ahmet ALTUN](https://github.com/ahmetaltun).
