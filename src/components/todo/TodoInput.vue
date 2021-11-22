<template>
  <header class="header">
    <h1>todos</h1>
    <base-input
      v-model="content"
      class="new-todo"
      placeholder="What needs to be done?"
      :autofocus="true"
      @blur="addNewTodo" 
      @keyup.enter="addNewTodo" 
      v-on="$listeners"
    />
  </header>
</template>

<script>
import BaseInput from '@/components/base/BaseInput.vue';

import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('todo');

export default {
  name: 'TheHeader',
  components: { BaseInput },
  data: function(){
    return {
      content: ''
    }
  },
  methods: {
    ...mapMutations(['addTodo']),
    
    addNewTodo(){
      
      if(this.content === '') return;

      this.addTodo(this.content);

      this.content = '';
    }
  }
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
