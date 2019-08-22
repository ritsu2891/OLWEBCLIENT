<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-auto">
        <chart-js-graph></chart-js-graph>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <value-card label="ARS"></value-card>
    </div>
    <div style="height: 20px;"></div>
  </div>
</template>
<script>
import ChartJsGraph from '~/components/ChartJsGraph.vue';
import ValueCard from '~/components/ValueCard.vue';

export default {
  components: {
    ChartJsGraph,
    ValueCard
  },
}
</script>
<style lang="scss">
  #container {
    width: 100%;
    height: 100%;
  }
</style>