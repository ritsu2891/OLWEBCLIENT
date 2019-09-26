<template>
  <div class="container">
    <div style="position: relative;">
      <HumanPict :nPerson="live.data ? live.data : 0"></HumanPict>
      <div style="width: 400px; position: absolute; right: 0; top: 0;">
        <div class="shadow bg-light p-2" style="width: 400px;">
          <FPSwitch class="m-0" v-model="currentStatus" :items="switchConfig"></FPSwitch>
        </div>
        <div class="shadow bg-light p-3 my-4">
          <ValueCard label="検出人数" :val="live.data" unit="人"></ValueCard>
        </div>
      </div>
      <div style="width: 100%; overflow-x: scroll;">
        <TimeLine>
          <TimeLabeledContent
            v-for="item in aleratTimeline"
            :key="`tli${item.id}`"
            :time="item.datetime"
            icon="▲"
            icon-text-color="red"
          >
            <div class="shadow bg-light p-3">
              <ValueCard label="検出人数" :val="item.data" unit="人"></ValueCard>
            </div>
          </TimeLabeledContent>
        </TimeLine>
      </div>
      <div class="mt-3"></div>
    </div>
  </div>
</template>
<script>
import TimeLabeledContent from "~/components/SharedUIComponents/TimeLabeledContent.vue";
import TimeLine from "~/components/SharedUIComponents/TimeLine.vue";
import ValueCard from "~/components/SharedUIComponents/ValueCard.vue";
import FPSwitch from "~/components/SharedUIComponents/FPSwitch.vue";
import HumanPict from "~/components/TFSUIComponents/HumanPict.vue";

import * as TFS from "~/components/TFSManager.js";

export default {
  components: { TimeLine, TimeLabeledContent, ValueCard, FPSwitch, HumanPict },
  data: function() {
    return {
      manager: undefined,
      timeline: [{id: 'd', data: undefined}],
      currentStatus: 1,
      switchConfig: TFS.STATUS,
    };
  },
  computed: {
    live: function() {
      return this.timeline[0];
    },
    aleratTimeline: function() {
      return this.timeline.filter(function(item) {
        return item.status == 0;
      });
    }
  },
  watch: {
    currentStatus: function() {
      this.manager.status = this.currentStatus;
    }
  },
  mounted: function() {
    this.manager = new TFS.TFSManager(this.currentStatus, this);
    this.manager.getAll();
    window.setInterval(() => {
      this.manager.getNew();
    }, 1000);
  }
};
</script>