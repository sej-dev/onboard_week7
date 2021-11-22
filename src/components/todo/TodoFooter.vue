<template>
  <footer
    v-show="hasTodos"
    class="footer"
  >
    <span class="todo-count"> {{ activeTodoCount }} {{ activeTodoCount === 1 ? 'items' : 'item' }} left </span>

    <ul class="filters">
      <li
        v-for="filter in filters"
        :key="filter"
      >
        <a
          href="#" 
          :class="{ selected : filter === curFilter }" 
          @click.prevent="changeListFilter(filter)"
        >
          {{ filter | mapFirstCharUpper }}
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
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('todo');

import LIST_FILTER from '@/constants/todo/listFilter';

export default {
    name: 'TodoFooter',
    data: function(){
        return {
            filters: [LIST_FILTER.ALL, LIST_FILTER.ACTIVE, LIST_FILTER.COMPLETED],
        }
    },
    computed: {
        ...mapState({
            curFilter: state => state.listFilter,
        }),
        ...mapGetters(['hasTodos', 'getTodosCountByFilter']),

        activeTodoCount(){
          return this.getTodosCountByFilter(LIST_FILTER.ACTIVE);
        },
        hasCompletedTodo(){
            return this.getTodosCountByFilter(LIST_FILTER.COMPLETED) > 0;
        }
    },
    methods: {
        ...mapMutations(['deleteAllCompletedTodos', 'changeListFilter']),
    }
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