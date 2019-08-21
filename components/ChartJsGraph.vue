<template>
    <div>
        <canvas id="graph"></canvas>
    </div>
</template>

<script>
import API from '~/components/API'

export default {
  nsme: 'chart-js-graph',
  data: function() {
    return {
      myChart: NaN
    };
  },
  mounted() {
    var ctx = document.getElementById('graph').getContext('2d');
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '波形',
          data: [],
          backgroundColor: 'rgba(0, 0, 0, 0)',
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

    var chartUpdateFn = (res) => {
      var n = res.data.length;
      for (var i = 0; i < n; i++) {
        this.myChart.data.labels.push('');
        this.myChart.data.datasets[0].data.push(res.data[i]);
      }
      this.myChart.update();
    };

    API.requestDBData('rawSignal').then(chartUpdateFn);

    // window.setInterval(() => {
    //   API.requestDBData('rawSignal', chartUpdateFn);
    // }, 5000);
  }
}
</script>
<style lang="scss" scoped>
#graph {
    width: 1000px;
    height: 500px;
}
</style>