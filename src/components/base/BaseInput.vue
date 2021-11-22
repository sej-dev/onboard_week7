<template>
  <input
    ref="baseInput"
    :value="value"
  >
</template>

<script>
export default {
    name: "BaseInput",
    props: ["value"],
    updated() {
        this.$refs.baseInput.focus();
    },
};
</script>

<style>
</style>
