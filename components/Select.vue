<template>
  <v-select
    :label="label"
    :value="value"
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
  },
}
</script>
