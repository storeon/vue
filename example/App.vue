<template>
  <div>
    <h1>The count is {{count}}</h1>
    <button @click="dec">-</button>
    <button @click="inc">+</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    count () {
      return this.$storeon.state.count
    }
  },
  methods: {
    inc() {
      this.$storeon.dispatch('inc')
    },
    dec() {
      this.$storeon.dispatch('dec')
    }
  }
};
</script>

<style scoped>
div {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
