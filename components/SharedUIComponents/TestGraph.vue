<template>
  <div style="width: 800px; height: 400px;" class="m-5">
    <canvas id="TestGraph"></canvas>
  </div>
</template>
<script>
import { Chart } from "chart.js";
require('~/components/chartjs-chart-stem.js')

export default {
  mounted() {
    var ctx = document.getElementById("TestGraph").getContext("2d");
    this.myChart = new Chart(ctx, {
      type: "stem",
      data: {
        labels: ["", "", "", "", "", "", "", ""],
        datasets: [
          {
            label: "波形",
            data: [null, -1, 2, 3, 4, 5, 6, null],
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 10,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: -2
              }
            }
          ]
        },
        animation: {
          duration: 0
        }
      }
    });
  }
};
</script>