<template>
  <div class="container">
    <div style="position: relative;">
      <HumanPict :nPerson="live.data"></HumanPict>
      <div style="width: 400px; position: absolute; right: 0; top: 0;">
        <div class="shadow bg-light p-2" style="width: 400px;">
          <FPSwitch class="m-0" v-model="currentStatus"></FPSwitch>
        </div>
        <div class="shadow bg-light p-3 my-4">
          <ValueCard label="検出人数" :val="`${live.data}人`"></ValueCard>
        </div>
      </div>
      <TimeLine>
        <TimeLabeledContent
          v-for="item in aleratTimeline"
          :key="`tli${item.id}`"
          :time="item.datetime"
          icon="▲"
          icon-text-color="red"
        >
          <div class="shadow bg-light p-3">
            <ValueCard label="検出人数" :val="`${item.data}人`"></ValueCard>
          </div>
        </TimeLabeledContent>
      </TimeLine>
    </div>
  </div>
</template>
<script>
import TimeLabeledContent from "~/components/SharedUIComponents/TimeLabeledContent.vue";
import TimeLine from "~/components/SharedUIComponents/TimeLine.vue";
import ValueCard from "~/components/SharedUIComponents/ValueCard.vue";
import FPSwitch from "~/components/SharedUIComponents/FPSwitch.vue";
import HumanPict from "~/components/TFSUIComponents/HumanPict.vue";

import { TFSManager } from "~/components/TFSManager.js";

export default {
  components: { TimeLine, TimeLabeledContent, ValueCard, FPSwitch, HumanPict },
  data: function() {
    return {
      manager: undefined,
      timeline: [
        { id: "a", status: 0, data: 1, datetime: new Date() },
        { id: "b", status: 1, data: 2, datetime: new Date() }
      ],
      currentStatus: 1,
    };
  },
  computed: {
    live: function() {
      return this.timeline[0];
    },
    aleratTimeline: function () {
      return this.timeline.filter(function (item) {
        return item.status == 0;
      })
    }
  },
  watch: {
    currentStatus: function() {
      this.manager.status = this.currentStatus;
    },
  },
  mounted: function() {
    this.manager = new TFSManager(this.currentStatus, this);
    this.manager.getAll();
    window.setInterval(() => {this.manager.getNew()}, 1000);
    
  }
};
</script>