<template>
  <li :class="{ completed: props.todoStatus, editing: state.isEditing }">
    <div class="view">
      <input
        :checked="props.todoStatus"
        class="toggle"
        type="checkbox"
        @change="toggleStatus"
      >
      <label @dblclick="editContent">{{ state.editedContent }}</label>
      <button
        class="destroy"
        @click="deleteTodo"
      />
    </div>
    <base-input
      v-show="state.isEditing"
      v-model.trim="state.editedContent"
      class="edit"
      @blur="updateTodo"
      @keyup.enter="updateTodo($event)"
    />
  </li>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';

import BaseInput from '@/components/base/BaseInput.vue';

import TODO_STATUS from '@/constants/todo/todoStatus';
import * as todoTypes from '@/store/modules/todo/mutation-types'

const props = {
  todoId: {
    type: Number,
    required: true,
    default: 0,
  },
  todoContent: {
    type: String,
    default: '',
  },
  todoStatus: {
    validator: function (value) {
      return TODO_STATUS[value] !== null;
    },
    required: true,
    default: TODO_STATUS.ACTIVE,
  },
};

export default {
  name: "TodoItem",
  components: { BaseInput },
  props,
  setup(props){

    const state = reactive({
      editedContent: props.todoContent,
      isEditing: false,
    });
    
    const store = useStore();
    
    const deleteTodo = () => store.commit(`todo/${todoTypes.DELETE_TODO_BY_ID}`, props.todoId);
    const updateTodoById = (payload) => store.commit(`todo/${todoTypes.UPDATE_TODO_BY_ID}`, payload);

    const editContent = () => state.isEditing = true;
      
    const toggleStatus = () => updateTodoById({
      id: props.todoId,
      content: state.editedContent,
      status: !props.todoStatus
    });
    
    const updateTodo = () => {
      if(state.isEditing === false) return;

      if(state.editedContent === ''){
        deleteTodo();
      } 
      else {
        updateTodoById({
          id: props.todoId,
          content: state.editedContent,
          status: props.todoStatus,
        });
      }

      state.isEditing = false;
    };

    return {
      state, 
      props,

      editContent,
      toggleStatus,
      updateTodo,
      deleteTodo
      
    }
  },
};
</script>

<style>
.todo-list li {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
	border-bottom: none;
}

.todo-list li.editing {
	border-bottom: none;
	padding: 0;
}

.todo-list li.editing .edit {
	display: block;
	width: 506px;
	padding: 12px 16px;
	margin: 0 0 0 43px;
}

.todo-list li.editing .view {
	display: none;
}

.todo-list li .toggle {
	text-align: center;
	width: 40px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}

.todo-list li .toggle {
	opacity: 0;
}

.todo-list li .toggle + label {
	/*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
	background-repeat: no-repeat;
	background-position: center left;
}

.todo-list li .toggle:checked + label {
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

.todo-list li label {
	word-break: break-all;
	padding: 15px 15px 15px 60px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
}

.todo-list li.completed label {
	color: #d9d9d9;
	text-decoration: line-through;
}

.todo-list li .destroy {
	display: none;
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
	color: #af5b5e;
}

.todo-list li .destroy:after {
	content: '×';
}

.todo-list li:hover .destroy {
	display: block;
}

.todo-list li .edit {
	display: none;
}

.todo-list li.editing:last-child {
	margin-bottom: -1px;
}

</style>
