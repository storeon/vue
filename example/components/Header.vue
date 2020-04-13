<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      @keydown.enter="handleKeydown"
      placeholder="What needs to be done?"
      autofocus
    >
  </header>
</template>

<script>
import { mapState, mapDispatch } from '../../helpers'

export default {
  methods: {
    ...mapDispatch({
      addTodo: "todo/add"
    }),
    handleKeydown(event) {
      const value = event.target.value.trim();
      if (value) {
        this.addTodo(value);
        event.target.value = "";
      }
    }
  }
};
</script>
