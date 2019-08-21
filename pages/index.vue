<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-auto">
        <chart-js-graph></chart-js-graph>
      </div>
    </div>
  </div>
</template>
<script>
import ChartJsGraph from '~/components/ChartJsGraph.vue';

export default {
  components: {
    ChartJsGraph,
  },
}
</script>
<style lang="scss">
  #container {
    width: 100%;
    height: 100%;
  }
</style>