<template>
  <ul
    v-show="hasTodos"
    class="todo-list"
  >
    <todo-item 
      v-for="todo in todosFiltered"
      :key="todo.id"
      v-bind="todo" 
    />
  </ul>
</template>

<script>
import TodoItem from '@/components/todo/TodoItem.vue';

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapGetters } = createNamespacedHelpers('todo');

export default {
    name: 'TodoList',
    components: { TodoItem },
    computed: {
        ...mapState({
            curFilter: state => state.listFilter,
        }),
        ...mapGetters(['hasTodos', 'getTodosByFilter']),

        todosFiltered(){
          return this.getTodosByFilter(this.curFilter);
        }
    },
}
</script>

<style>
.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>