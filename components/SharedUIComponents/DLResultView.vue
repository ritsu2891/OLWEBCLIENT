<template>
  <div>
    <div style="position: relative;" align="center">
      <img :src="maxItem.image" style="max-width: 80%; max-height: 150px;" />
      <div class="primaryDLResultImageLabel">{{maxItem.label}}</div>
    </div>
    <template v-if="showGraph">
      <div class="row align-items-center" v-for="(_, index) in datas" :key="index">
        <div :class="{'col-4': true, 'primaryDLResult': index == maxItemKey}">{{labels[index]}}</div>
        <div class="col-8">
          <canvas :id="`canvas${id}${index}`" width="100%" height="20px"></canvas>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { Chart } from "chart.js";

export default {
  props: {
    labels: {},
    datas: {},
    images: {},
    showGraph: { type: Boolean, default: true }
  },
  data() {
    return {
      id: this._uid
    };
  },
  mounted() {
    if (this.showGraph) {
      this.initGraph();
    }
  },
  methods: {
    initGraph() {
      var dataLabelPlugin = {
        afterDatasetsDraw: function(chart, easing) {
          // To only draw at the end of animation, check for easing === 1
          var ctx = chart.ctx;

          chart.data.datasets.forEach(function(dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function(element, index) {
                var fontSize = 16;
                var fontStyle = "normal";
                var fontFamily = "Helvetica Neue";
                ctx.font = Chart.helpers.fontString(
                  fontSize,
                  fontStyle,
                  fontFamily
                );

                // Just naively convert to string for now
                var data = dataset.data[index];
                var dataString = data.toString();

                if (data < 80) {
                  var xOffset = 20;
                  ctx.fillStyle = "rgb(0, 0, 0)";
                } else {
                  var xOffset = -20;
                  ctx.fillStyle = "rgb(255, 255, 255)";
                }

                // Make sure alignment settings are correct
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                var position = element.tooltipPosition();
                ctx.fillText(
                  dataString + "%",
                  position.x + xOffset,
                  position.y
                );
              });
            }
          });
        }
      };

      for (let i = 0; i < this.datas.length; i++) {
        const ctx = document
          .getElementById(`canvas${this.id}${i}`)
          .getContext("2d");
        new Chart(ctx, {
          plugins: [dataLabelPlugin],
          type: "horizontalBar",
          data: {
            labels: [""],
            datasets: [
              {
                label: "推定確率",
                data: [this.datas[i]],
                backgroundColor: "rgba(255, 0, 0, 1)",
                pointRadius: 0
              }
            ]
          },
          options: {
            tooltips: {
              enabled: false
            },
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  ticks: { min: 0, max: 100 },
                  gridLines: {
                    drawOnChartArea: false
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  gridLines: {
                    drawOnChartArea: false
                  }
                }
              ]
            }
          }
        });
      }
    }
  },
  computed: {
    maxItemKey() {
      return this.datas.indexOf(Math.max(...this.datas));
    },
    maxItem() {
      const key = this.maxItemKey;
      return {
        label: this.labels[key],
        data: this.datas[key],
        image: this.images[key]
      };
    }
  }
};
</script>
<style lang="scss">
.primaryDLResult,
.primaryDLResultImageLabel {
  font-size: 30px;
  font-weight: 700;
}

.primaryDLResultImageLabel {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: xx-large;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
}
</style>