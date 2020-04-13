<template>
  <section class="main" v-if="todosLength > 0">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      @change="handleCompleteAll"
      :checked="numCompleted === todosLength"
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
import { mapState, mapDispatch } from '../../helpers'
import Footer from "./Footer.vue";
import TodoItem from "./TodoItem.vue";
import { SHOW_ALL, SHOW_COMPLETED } from "../constants/TodoFilters";

export default {
  components: {
    Footer,
    TodoItem
  },
  computed: mapState({
    todosLength: state => state.todos.length,
    numCompleted: state => state.todos.filter(todo => todo.completed).length,
    filtered: state => state.filter === SHOW_ALL
      ? state.todos
      : state.filter === SHOW_COMPLETED
      ? state.todos.filter(todo => todo.completed)
      : state.todos.filter(todo => !todo.completed),
  }),
  methods: mapDispatch({
    handleDelete: "todo/delete",
    handleEdit: "todo/edit",
    handleComplete: "todo/complete",
    handleCompleteAll: "todo/complete_all"
  })
};
</script>
