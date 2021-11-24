<template>
  <footer
    v-show="hasTodos"
    class="footer"
  >
    <span class="todo-count"> {{ activeTodoCount }} {{ activeTodoCount === 1 ? 'item' : 'items' }} left </span>

    <ul class="filters">
      <li
        v-for="statusFilter in todoStatusFilters"
        :key="statusFilter"
      >
        <a
          href="#" 
          :class="{ selected : statusFilter === selectedStatusFilter }" 
          @click.prevent="changeListFilter(statusFilter)"
        >
          {{ toFirstCharUpperOnWord(statusFilter) }}
        </a>
      </li>
    </ul>
    
    <button 
      v-show="hasCompletedTodo" 
      class="clear-completed" 
      @click="deleteAllCompletedTodos"
    >
      Clear completed
    </button>
  </footer>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import * as todoTypes from '@/store/modules/todo/mutation-types';
import TODO_STATUS_FILTER from '@/constants/todo/todoStatusFilter';
import toFirstCharUpperOnWord from '@/utils/toFirstCharUpperOnWord';

export default {
    name: 'TodoFooter',
    setup(){
      
      const store = useStore();

      const selectedStatusFilter = computed( () => store.state.todo.todoStatusFilter );
      const hasTodos = computed( () => store.getters['todo/hasTodos'] );
      const getTodosCountByStatusFilter = store.getters['todo/getTodosCountByStatusFilter'];
    
      const activeTodoCount = computed( () => getTodosCountByStatusFilter(TODO_STATUS_FILTER.ACTIVE) );
      const hasCompletedTodo = computed( () => getTodosCountByStatusFilter(TODO_STATUS_FILTER.COMPLETED) > 0 );

      const todoStatusFilters = [TODO_STATUS_FILTER.ALL, TODO_STATUS_FILTER.ACTIVE, TODO_STATUS_FILTER.COMPLETED];
      
      return {
        todoStatusFilters,
        
        selectedStatusFilter,
        
        hasTodos,
        activeTodoCount,
        hasCompletedTodo,
        
        deleteAllCompletedTodos: () => store.commit(`todo/${todoTypes.DELETE_ALL_COMPLETED_TODOS}`),
        changeListFilter: (statusFilter) => store.commit(`todo/${todoTypes.CHANGE_LIST_FILTER}`, statusFilter),

        toFirstCharUpperOnWord
      }
    },
};
</script>

<style>
.footer {
	color: #777;
	padding: 10px 15px;
	height: 20px;
	text-align: center;
	border-top: 1px solid #e6e6e6;
}

.footer:before {
	content: '';
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 50px;
	overflow: hidden;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
	            0 8px 0 -3px #f6f6f6,
	            0 9px 1px -3px rgba(0, 0, 0, 0.2),
	            0 16px 0 -6px #f6f6f6,
	            0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
	float: left;
	text-align: left;
}

.todo-count strong {
	font-weight: 300;
}

.filters {
	margin: 0;
	padding: 0;
	list-style: none;
	position: absolute;
	right: 0;
	left: 0;
}

.filters li {
	display: inline;
}

.filters li a {
	color: inherit;
	margin: 3px;
	padding: 3px 7px;
	text-decoration: none;
	border: 1px solid transparent;
	border-radius: 3px;
}

.filters li a:hover {
	border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
	border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
	float: right;
	position: relative;
	line-height: 20px;
	text-decoration: none;
	cursor: pointer;
}

.clear-completed:hover {
	text-decoration: underline;
}

</style>