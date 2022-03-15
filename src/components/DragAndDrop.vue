<template>
  <div class="darg-and-drop__container">
    <div>
      <div
        v-for="chart in typeOfCharts"
        :key="chart.id"
        @drag="drag(chart.type)"
        @dragend="dragend(chart.type)"
        class="droppable-element"
        draggable="true"
        unselectable="on"
      >
        {{ chart.type }}
      </div>
    </div>

    <div id="content">
      <grid-layout
        ref="gridlayout"
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="true"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :type="item.type"
        >
          <ChartMenu :key="item.i" @ClickForDelete="handleDelete(item.i)" />
          <XYChart v-if="item.type == 'XYChart'" :id="item.i.toString()" />
          <PieChart
            v-else-if="item.type == 'pieChart'"
            :id="item.i.toString()"
          />
          <ColumnChart
            v-else-if="item.type == 'columnChart'"
            :id="item.i.toString()"
          />
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout";
import XYChart from "./XYChart.vue";
import PieChart from "./Pie_Chart.vue";
import ColumnChart from "./ColumnChart.vue";
import ChartMenu from "./ChartMenu.vue";

let mouseXY = { x: null, y: null };
let DragPos = { x: null, y: null, w: 1, h: 1, i: null, type: null };

export default {
  components: {
    GridLayout,
    GridItem,
    XYChart,
    PieChart,
    ColumnChart,
    ChartMenu,
  },
  data() {
    return {
      layout: [],
      i: 1,
      typeOfCharts: [
        { id: 1, type: "XYChart" },
        { id: 2, type: "pieChart" },
        { id: 3, type: "columnChart" },
      ],
    };
  },

  mounted() {
    document.addEventListener(
      "dragover",
      function (e) {
        mouseXY.x = e.clientX;
        mouseXY.y = e.clientY;
      },
      false
    );
  },
  methods: {
    handleDelete(id) {
      const newList = this.layout.filter((item) => item.i !== id);
      this.layout = newList;
    },
    drag: function (type) {
      let parentRect = document
        .getElementById("content")
        .getBoundingClientRect();
      let mouseInGrid = false;
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true;
      }
      if (
        mouseInGrid === true &&
        this.layout.findIndex((item) => item.i === this.i) === -1
      ) {
        this.layout.push({
          x: (this.layout.length * 2) % (this.colNum || 12),
          y: this.layout.length + (this.colNum || 12), // puts it at the bottom
          w: 4,
          h: 7,
          i: this.i,
          type: type,
        });
        console.log(type);
      }
      let index = this.layout.findIndex((item) => item.i === this.i);
      if (index !== -1) {
        try {
          this.$refs.gridlayout.$children[
            this.layout.length
          ].$refs.item.style.display = "block";
        } catch (e) {
          console.log(e);
        }
        let el = this.$refs.gridlayout.$children[index];
        el.dragging = {
          top: mouseXY.y - parentRect.top,
          left: mouseXY.x - parentRect.left,
        };
        let new_pos = el.calcXY(
          mouseXY.y - parentRect.top,
          mouseXY.x - parentRect.left
        );

        if (mouseInGrid === true) {
          this.$refs.gridlayout.dragEvent(
            "dragstart",
            this.i,
            new_pos.x,
            new_pos.y,
            0,
            0
          );
          DragPos.i = String(index);
          DragPos.x = this.layout[index].x;
          DragPos.y = this.layout[index].y;
        }
        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent(
            "dragend",
            this.i,
            new_pos.x,
            new_pos.y,
            4,
            7
          );
          // this.layout = this.layout.filter((obj) => obj.i !== "drop");
        }
      }
    },
    dragend: function () {
      console.log(this.layout);
      let parentRect = document
        .getElementById("content")
        .getBoundingClientRect();
      let mouseInGrid = false;
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true) {
        this.$refs.gridlayout.dragEvent(
          "dragend",
          this.i,
          DragPos.x,
          DragPos.y,
          4,
          7
        );
        this.i++;
        // this.layout = this.layout.filter((obj) => obj.i !== "drop");

        // UNCOMMENT below if you want to add a grid-item
        /*
                this.layout.push({
                    x: DragPos.x,
                    y: DragPos.y,
                    w: 1,
                    h: 1,
                    i: DragPos.i,
                });
                this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,1,1);
                try {
                    this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display="block";
                } catch {
                }
                */
      }
    },
  },
};
</script>

<style scoped>
.darg-and-drop__container {
  display: flex;
  width: 100%;
  height: 100%;
}
.droppable-element {
  width: 150px;
  text-align: center;
  background: rgb(226, 127, 127);
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
}

.vue-grid-layout {
  background: rgb(228, 224, 224);
  height: 100% !important;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: rgb(255, 255, 255);
  border: 1px solid rgb(180, 180, 180);
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
#content {
  width: 100%;
  height: 100%;
}
</style>
