<template>
  <div class="timeLabeledContent">
    <div class="row">
      <div class="col-auto timeLabeledContent__icon">●</div>
      <div class="col timeLabeledContent__time">LIVE</div>
    </div>
    <Component :is="content"></Component>
  </div>
</template>
<style lang="scss">
.statusInfoCard {
}

.timeLabeledContent {
  width: 400px;
  height: 200px;
  float: left;

  &::before {
    content: "";
    height: 50px;
    border-left: 3px solid black;
    position: relative;
    left: 45px;
    top: 5px;
    display: inline-block;
  }

  &__time {
    padding-right: 0;
    font-size: 24px;
  }

  &__icon {
    padding-right: 0;
    font-size: 24px;
    color: green;
  }
}

.timeLabeledContent + .timeLabeledContent {
  margin-left: 5px;
}
</style>
<script>
import StatusInfo from "~/components/StatusInfo.vue";

export default {
  components: {
    StatusInfo
  },

  props: {
    content: { default: "div" }
  }
};
</script>