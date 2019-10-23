<template>
  <div class="timeLabeledContent">
    <div class="row align-items-center">
      <div class="col-auto timeLabeledContent__icon" :style="{color: iconTextColor}">{{icon}}</div>
      <div class="col timeLabeledContent__time">{{timeText}}</div>
    </div>
    <div class="timeLabeledContent__content">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss">
.timeLabeledContent {
  // width: 400px;
  // height: 200px;
  // float: left;

  &__icon {
    padding-right: 0;
    font-size: 50px;
    line-height: 1;
  }

  &__time {
    padding-left: 8px;
    font-size: 24px;
  }

  &__content {
    margin-left: 8px;
  }
}

.timeLabeledContent + .timeLabeledContent {
  margin-left: 5px;
}
</style>
<script>
import { DateTime } from "luxon";

import StatusInfo from "~/components/SharedUIComponents/StatusInfo.vue";

export default {
  components: {
    StatusInfo
  },

  props: {
    time: { default: "不明な時刻" },
    icon: { Type: String, default: "●" },
    iconTextColor: { type: String }
  },

  computed: {
    timeText() {
      if (this.time instanceof Date) {
        return new DateTime(this.time).toLocaleString(DateTime.TIME_24_SIMPLE);
      } else {
        return this.time;
      }
    }
  }
};
</script>