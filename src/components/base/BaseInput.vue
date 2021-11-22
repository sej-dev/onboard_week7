<template>
  <input
    ref="baseInput"
    :value="value"
    v-on="listeners"
  >
</template>

<script>
export default {
    name: "BaseInput",
    props: ["value"],
    computed: {
        listeners: function () {
            const vm = this;
            return Object.assign({}, this.$listeners, {
                input: function (evt) {
                    vm.$emit("input", evt.target.value.trim());
                },
            });
        },
    },
    updated() {
        this.$refs.baseInput.focus();
    },
};
</script>

<style>
</style>
