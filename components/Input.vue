<template>
  <v-text-field
    :type="type"
    :label="label"
    :value="value"
    :placeholder="label"
    :rules="rules"
    filled
    rounded
    dense
    :autocomplete="autocomplete"
    :append-icon="icon"
    @input="$emit('input', $event)"
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
    rules: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
