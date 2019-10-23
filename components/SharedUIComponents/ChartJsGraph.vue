<template>
    <canvas id="graph"></canvas>
</template>

<script>
import { Chart } from "chart.js";
require('~/components/chartjs-chart-stem.js')

import API from '~/components/API'
import GraphDataManager from '~/components/GraphDataManager.js'

export default {
  nsme: 'chart-js-graph',
  data: function() {
    return {
      myChart: undefined
    };
  },
  mounted() {
    GraphDataManager.init();

    var ctx = document.getElementById('graph').getContext('2d');
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '波形',
          data: [],
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: 'rgba(255, 99, 132, 1)',
          pointRadius: 0,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
                drawOnChartArea: false
            }
          }],
          yAxes: [{
            gridLines: {
                drawOnChartArea: false
            }
          }]
        },
      }
    });

    GraphDataManager.startManage(this.myChart, 'rawSignal', 'replaceAll');
  }
}
</script>