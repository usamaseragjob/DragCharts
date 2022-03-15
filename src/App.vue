<template>
  <div id="app">
    <DragAndDrop />
  </div>
</template>

<script>
import DragAndDrop from "./components/DragAndDrop.vue";
export default {
  name: "App",
  components: {
    DragAndDrop,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
