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
export default {
  methods: {
    handleKeydown(event) {
      const value = event.target.value.trim();
      if (value) {
        this.$storeon.dispatch("todo/add", value);
        event.target.value = "";
      }
    }
  }
};
</script>
