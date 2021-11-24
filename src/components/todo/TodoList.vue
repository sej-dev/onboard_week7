<template>
  <ul
    v-show="hasTodos"
    class="todo-list"
  >
    <todo-item 
      v-for="todo in todosFiltered"
      :key="todo.id"
      :todo-id="todo.id"
      :todo-content="todo.content"
      :todo-status="todo.status"
    />
  </ul>
</template>

<script>
import TodoItem from '@/components/todo/TodoItem.vue';

import { computed } from 'vue';
import { useStore } from 'vuex'

export default {
  name: 'TodoList',
  components: { TodoItem },
  
  setup () {
    const store = useStore();

    const todosFiltered = computed( () => {
      const curTodoStatusFilter = store.state.todo.todoStatusFilter;
      const getTodosByStatusFilter = store.getters['todo/getTodosByStatusFilter'];
      
      return getTodosByStatusFilter(curTodoStatusFilter);
    } );
    const hasTodos = computed( () => store.getters['todo/hasTodos'] );

    return {
      hasTodos,
      todosFiltered
    }
  }
}
</script>

<style>
.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>