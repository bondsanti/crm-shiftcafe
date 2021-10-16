<template>
  <v-text-field
    :label="label"
    :value="value"
    :placeholder="label"
    filled
    rounded
    dense
    :append-icon="icon"
  ></v-text-field>
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
