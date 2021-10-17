<template>
  <v-select
    :label="label"
    :value="value"
    :items="items"
    :disabled="disabled"
    dense
    filled
    rounded
    :prepend-inner-icon="icon"
  ></v-select>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
