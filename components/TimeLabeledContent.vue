<template>
  <div class="timeLabeledContent">
    <div class="row align-items-center">
      <div class="col-auto timeLabeledContent__icon" :style="{color: iconTextColor}">{{icon}}</div>
      <div class="col timeLabeledContent__time">{{time}}</div>
    </div>
    <Component :is="content" v-bind="contentAttr"></Component>
  </div>
</template>
<style lang="scss">
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
    padding-left: 8px;
    font-size: 24px;
  }

  &__icon {
    padding-right: 0;
    font-size: 50px;
    line-height: 1;
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
    content: { default: "div" },
    contentAttr: {},
    time: { Type: String, default: "不明な時刻" },
    icon: { Type: String, default: "●" },
    iconTextColor: { type: String },
  },
};
</script>