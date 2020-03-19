<template>
  <section class="main" v-if="$state.todos.length > 0">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      @change="handleCompleteAll"
      :checked="numCompleted === $state.todos.length"
    >
    <label for="toggle-all">Mark all as complete</label>

    <ul class="todo-list">
      <TodoItem
        v-for="todo in filtered"
        v-bind:key="todo.id"
        :todo="todo"
        @delete="handleDelete"
        @edit="handleEdit"
        @complete="handleComplete"
      ></TodoItem>
    </ul>
    <Footer></Footer>
  </section>
</template>

<script>
import Footer from "./Footer.vue";
import TodoItem from "./TodoItem.vue";
import { SHOW_ALL, SHOW_COMPLETED } from "../constants/TodoFilters";

export default {
  components: {
    Footer,
    TodoItem
  },
  computed: {
    numCompleted() {
      return this.$state.todos.filter(todo => todo.completed).length;
    },
    filtered() {
      return this.$state.filter === SHOW_ALL
        ? this.$state.todos
        : this.$state.filter === SHOW_COMPLETED
        ? this.$state.todos.filter(todo => todo.completed)
        : this.$state.todos.filter(todo => !todo.completed);
    }
  },
  methods: {
    handleDelete(id) {
      this.$storeon.dispatch("todo/delete", id);
    },
    handleEdit(event) {
      this.$storeon.dispatch("todo/edit", { ...event });
    },
    handleComplete(id) {
      this.$storeon.dispatch("todo/complete", id);
    },
    handleCompleteAll() {
      this.$storeon.dispatch("todo/complete_all");
    }
  }
};
</script>
