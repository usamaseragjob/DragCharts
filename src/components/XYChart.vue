<template>
  <div style="height: 100%; padding-top: 26px">
    <div style="height: 100%" :id="id"></div>
  </div>
</template>

<script>
import AMcharts from "../charts/AMcharts";
export default {
  name: "LineChart",
  props: {
    id: String,
  },
  mounted() {
    AMcharts.XYChart(this.id);
  },
};
</script>

<style></style>
