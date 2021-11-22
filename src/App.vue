<template>
  <div id="app">
    <section class="todoapp">
      <todo-input />
      <todo-container />
    </section>

    <the-footer />
  </div>
</template>

<script>
import TheFooter from '@/components/layout/TheFooter.vue';
import TodoContainer from '@/components/todo/TodoContainer.vue';
import TodoInput from '@/components/todo/TodoInput.vue';

export default {
  name: 'App',
  components: { TheFooter, TodoContainer, TodoInput },
}
</script>

<style>
  .todoapp {
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}

.todoapp input::input-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}

.todoapp h1 {
	position: absolute;
	top: -155px;
	width: 100%;
	font-size: 100px;
	font-weight: 100;
	text-align: center;
	color: rgba(175, 47, 47, 0.15);
	-webkit-text-rendering: optimizeLegibility;
	-moz-text-rendering: optimizeLegibility;
	text-rendering: optimizeLegibility;
}
</style>
