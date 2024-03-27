#### This is a forked repository. The original repo is [here.](https://github.com/ahmetaltun/vue-country-dropdown) I'm just added some new features.

# Vue Country Select 2

Country selection dropdown for vue 2.

![Uploading vue-country-select-2.png…]()

## Installation

- **yarn**:
  ```bash
    yarn add vue-country-select-2
  ```
- **npm**:
  ```bash
    npm i --save vue-country-select-2
  ```

## Usage

- Install as a global component:

  ```js
  import Vue from "vue";
  import VueCountrySelect from "vue-country-select-2";

  Vue.use(VueCountrySelect);
  ```
- Or use in a specific component

  ```js
  import VueCountrySelect from 'vue-country-select-2'

  export default {
    components: {
      VueCountrySelect
    }
  }
  ```

- In your component:

  ```js
  <template>
  ...
    <vue-country-select
      @onSelect="onSelect"
      <!-- example props -->
      :preferredCountries="['TR', 'US', 'GB']">
      :disabledFetchingCountry="true"
      :defaultCountryByAreaCode="90"
      :immediateCallSelectEvent="true"
      :enabledFlags="true"
      :enabledCountryCode="true"
      :showNameInput="true"
      :showNotSelectedOption="true"
      :notSelectedOptionText="'Not Selected'"
    </vue-country-select>
  ...
  <template>
  <script>
  export default {
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
    <vue-country-select
      ref="vcd"
      @onSelect="onSelect"
    </vue-country-select>
    <button @click="manualTrigger">Manual Trigger</button>
  ...
  <template>
  <script>
  export default {
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

| Property value             | Type      | Default value                 | Description                                                                                        |
| -------------------------- | --------- | ----------------------------- | -------------------------------------------------------------------------------------------------- |
| `defaultCountry`           | `string`  | `''`                          | Default country, will override the country fetched from IP address of user                         |
| `disabledFetchingCountry`  | `Boolean` | false                         | Disable fetching current country based on IP address of user                                       |
| `enabledFlags`             | `Boolean` | `true`                        | Enable flags in the input                                                                          |
| `enabledCountryCode`       | `Boolean` | `false`                       | Enable country code in the input                                                                   |
| `showNameInput`            | `Boolean` | `false`                       | Shows the name of the selected country                                                             |
| `preferredCountries`       | `Array`   | `[]`                          | Preferred countries list, will be on top of the dropdown. ie `['AU', 'BR']`                        |
| `onlyCountries`            | `Array`   | `[]`                          | List of countries will be shown on the dropdown. ie `['AU', 'BR']`                                 |
| `ignoredCountries`         | `Array`   | `[]`                          | List of countries will NOT be shown on the dropdown. ie `['AU', 'BR']`                             |
| `dropdownOptions`          | `Object`  | `{ disabledDialCode: false }` | Options for dropdown, supporting `disabledDialCode`                                                |
| `defaultCountryByAreaCode` | `Number`  | `0`                           | Same as default country option. finds the default country from list by area code.                  |
| `showNotSelectedOption`    | `Boolean` | `false`                       | The `Not Selected` option is added to the top of the list. The Iso2 and area code value are empty. |
| `notSelectedOptionText`    | `String`  | `Not Selected`                | Replace `Not Selected` text with another string.                                                   |
| `immediateCallSelectEvent` | `Boolean` | `true`                        | Call the `onSelect` event when the component is mounted.                                           |
| `enablePreferredDivider`   | `Boolean` | `true`                        | Enable divider line under the preferred countries list                                             |
| `enableSearchCountry`      | `Boolean` | `true`                        | Enable search country by name                                                                      |


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

Forked and updated by [tryexcept0](https://github.com/tryexcept0).
