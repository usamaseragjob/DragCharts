<template>
  <div style="height: 100%" :id="id"></div>
</template>

<script>
import AMcharts from "../charts/AMcharts";
export default {
  name: "PieChart",
  props: {
    id: String,
  },
  mounted() {
    AMcharts.ColumnChart(this.id);
  },
};
</script>

<style></style>
