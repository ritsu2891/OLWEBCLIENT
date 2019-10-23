<template>
  <div class="container-fluid py-2 px-5">
    <div class="row" style="height: calc(100vh - 76px);">
      <div class="col-auto align-self-center">
        <FPSwitch
          v-model="switchSelect"
          :items="switchConfig"
          :vertical="true"
          style="width: 450px;"
          class="mr-3 mb-3"
        ></FPSwitch>

        <div class="p-3 mr-3 mb-1 shadow bg-light" v-for="(vc, index) in valueCard" :key="index">
          <ValueCard :label="vc.label" :val="25.6" unit="s" :small="true"></ValueCard>
        </div>
      </div>
      <div class="col align-self-center">
        <transition name="fade">
          <!-- <h1 v-if="switchSelect == 0">生波形</h1> -->
          <chart-js-graph
            v-if="switchSelect == 0"
            style="height: calc(100vh - 76px - 6rem); width: 100%"
          ></chart-js-graph>
        </transition>
      </div>
    </div>
    <!-- <div class="row justify-content-md-center">
      <value-card label="1人目 (呼吸間隔)"></value-card>
      <value-card label="2人目 (呼吸間隔)" :n="2"></value-card>
    </div>-->
  </div>
</template>
<script>
import ChartJsGraph from "~/components/SharedUIComponents/ChartJsGraph.vue";
import ValueCard from "~/components/SharedUIComponents/ValueCard.vue";
import FPSwitch from "~/components/SharedUIComponents/FPSwitch.vue";

export default {
  components: {
    ChartJsGraph,
    ValueCard,
    FPSwitch
  },
  data: function() {
    return {
      switchSelect: 0,
      switchConfig: [
        {
          id: 0,
          label: "生波形",
          color: "linear-gradient(135deg, #e481ef 0%,#ab24b7 100%)"
        },
        {
          id: 1,
          label: "ARS・FFT",
          color: "linear-gradient(135deg, #80b1ed 0%,#2774c6 100%)"
        }
      ],
      valueCard: [
        {
          label: "ARS<br />1人目<br />呼吸間隔",
        },
        {
          label: "ARS<br />2人目<br />呼吸間隔",
        },
        {
          label: "FFT<br />1人目<br />呼吸間隔",
        },
        {
          label: "FFT<br />2人目<br />呼吸間隔",
        },
      ]
    };
  }
};
</script>
<style lang="scss">
#container {
  width: 100%;
  height: 100%;
}
</style>