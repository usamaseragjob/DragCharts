<template>
  <div style="height: 100%">
    <div style="height: 100%" :id="id"></div>
  </div>
</template>

<script>
import AMcharts from "../charts/AMcharts";
export default {
  name: "PieChart",
  props: {
    id: String,
  },
  mounted() {
    AMcharts.PieChart(this.id);
  },
};
</script>

<style></style>
