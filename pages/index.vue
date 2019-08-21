<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-auto">
        <canvas id="rawdataGraph"></canvas>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // components: {
  //   Logo
  // },
  data: function() {
    return {
      mydata: [],
      mylabel: [],
      myChart: NaN
    };
  },
  mounted() {
    var ctx = document.getElementById('rawdataGraph').getContext('2d');
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.mylabel,
        datasets: [{
          label: '# of Votes',
          data: this.mydata,
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

    this.$axios.$get('http://localhost:8025/rawdata').then((res) => {
      var n = res.data.length;
      for (var i = 0; i < n; i++) {
        this.mylabel.push('');
        this.mydata.push(res.data[i]);
      }
      this.myChart.update();
    });

    // let self = this;
    window.setInterval(() => {
      this.mylabel = [];
      this.myChart.data.datasets[0].data = [];
      this.$axios.$get('http://localhost:8025/rawdata').then((res) => {
        var n = res.data.length;
        for (var i = 0; i < n; i++) {
          this.mylabel.push('');
          this.myChart.data.datasets[0].data.push(res.data[i]);
        }
        this.myChart.update();
      });
    }, 5000);
  }
}
</script>
<style lang="scss">
  #container {
    width: 100%;
    height: 100%;
  }

  #rawdataGraph {
    width: 1000px;
    height: 600px;
    // background-color: aqua;
  }
</style>