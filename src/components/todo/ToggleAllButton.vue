<template>
  <div v-show="hasTodos">
    <input 
      id="toggle-all" 
      class="toggle-all" 
      type="checkbox"
      :checked="isAllTodoCompleted"
      @change="toggleAllTodosStatus"
    >        
    <label for="toggle-all">Mark all as complete</label>
  </div>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex'

import TODO_STATUS_FILTER from '@/constants/todo/todoStatusFilter';
import * as todoTypes from '@/store/modules/todo/mutation-types';

export default {
  name: 'ToggleAllButton',

  setup () {

    const store = useStore();
    
    const hasTodos = computed( () => store.getters['todo/hasTodos'] );
    const isAllTodoCompleted = computed( () => {
      const getTodosCountByStatusFilter = store.getters['todo/getTodosCountByStatusFilter'];
      return getTodosCountByStatusFilter(TODO_STATUS_FILTER.ALL) === getTodosCountByStatusFilter(TODO_STATUS_FILTER.COMPLETED)
    } );

    return {
      hasTodos,
      isAllTodoCompleted,
      toggleAllTodosStatus: () => store.commit(`todo/${todoTypes.TOGGLE_ALL_TODOS_STATUS}`),
    }
  }
}
</script>

<style>
.toggle-all {
	width: 1px;
	height: 1px;
	border: none; /* Mobile Safari */
	opacity: 0;
	position: absolute;
	right: 100%;
	bottom: 100%;
}

.toggle-all + label {
	width: 60px;
	height: 34px;
	font-size: 0;
	position: absolute;
	top: -52px;
	left: -13px;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}

.toggle-all + label:before {
	content: '❯';
	font-size: 22px;
	color: #e6e6e6;
	padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
	color: #737373;
}
</style>