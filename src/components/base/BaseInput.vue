<template>
  <input
    ref="baseInput"
    :value="modelValue"
    @input="$emit('update:model-value', $event.target.value)"
  >
</template>

<script>
export default {
    name: "BaseInput",
    props: ["modelValue"],
    updated() {
      this.$refs.baseInput.focus();
    },

};
</script>

<style>
</style>
