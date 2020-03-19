<template>
  <div class="todoapp">
    <Header></Header>
    <Main></Main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";

export default {
  components: {
    Main,
    Header
  }
};
</script>
