<template>
  <li :class="{ completed: todo.completed, editing }">
    <div class="view">
      <input class="toggle" type="checkbox" :checked="todo.completed" @change="handleComplete">
      <label @dblclick="editing = true">{{todo.text}}</label>
      <button @click="handleDelete" class="destroy"></button>
    </div>
    <input
      v-if="editing"
      v-focus
      :value="todo.text"
      id="edit"
      class="edit"
      @keydown.enter="handleEdit"
      @keydown.esc="editing = false"
      @blur="handleSubmit"
    >
  </li>
</template>

<script>
export default {
  props: ["todo"],
  data() {
    return {
      editing: false
    };
  },
  methods: {
    handleComplete() {
      this.$emit("complete", this.todo.id);
    },
    handleDelete() {
      this.$emit("delete", this.todo.id);
    },
    handleEdit(event) {
      event.target.blur();
    },
    handleSubmit(event) {
      this.$emit("edit", { id: this.todo.id, text: event.target.value });
      this.editing = false;
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
};
</script>
