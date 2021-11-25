<template>
  <header class="header">
    <h1>todos</h1>
    <base-input
      v-model.trim="content"
      class="new-todo"
      placeholder="What needs to be done?"
      :autofocus="true"
      @blur="addNewTodo" 
      @keyup.enter="addNewTodo" 
    />
  </header>
</template>

<script>

import { ref } from 'vue';
import { useStore } from 'vuex';

import BaseInput from '@/components/base/BaseInput.vue';

import * as todoTypes from '@/store/modules/todo/mutation-types'

export default {
  name: 'TheHeader',
  components: { BaseInput },

  setup(){

    const content = ref('');

    const store = useStore();

    const addNewTodo = () => {
      if(content.value === '') return;

        store.commit(`todo/${todoTypes.ADD_TODO}`, content.value);

        content.value = '';
    }

    return {
      //data
      content,

      //method
      addNewTodo
    }
  },
};
</script>

<style>
.new-todo,
.edit {
	position: relative;
	margin: 0;
	width: 100%;
	font-size: 24px;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.4em;
	border: 0;
	color: inherit;
	padding: 6px;
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.new-todo {
	padding: 16px 16px 16px 60px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>
