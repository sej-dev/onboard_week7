<template>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Written by <a href="http://twitter.com/lukeed05">Luke Edwards</a></p>
    <p>Refactored by <a href="https://github.com/xorgy">Aaron Muir Hamilton</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<script>
export default {
    name: 'TheFooter',
}
</script>

<style>
.info {
	margin: 65px auto 0;
	color: #bfbfbf;
	font-size: 10px;
	text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
	text-align: center;
}

.info p {
	line-height: 1;
}

.info a {
	color: inherit;
	text-decoration: none;
	font-weight: 400;
}

.info a:hover {
	text-decoration: underline;
}
</style>
