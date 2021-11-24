<template>
  <input
    ref="baseInputRef"
    :value="modelValue"
    @input="$emit('update:model-value', $event.target.value)"
  >
</template>

<script>

import { ref, onUpdated } from 'vue';

export default {
    name: "BaseInput",
    props: ["modelValue"],
    setup(){
      const baseInputRef = ref(null);
      
      onUpdated(() => {
        baseInputRef.value.focus();
      });
      
      return {
        baseInputRef
      }
    }
};

</script>

<style>
</style>
