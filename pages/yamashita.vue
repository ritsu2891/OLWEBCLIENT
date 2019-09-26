<template>
  <div class="container">
    <!-- <button v-on:click="add">追加</button> -->
    <LiveMap
      class="primaryMap"
      width="100%"
      style="height: 600px; width: 100%;"
      :mapCenter="[136.893865, 35.157141]"
      :zoom="11.8"
      ref="map"
    ></LiveMap>
    <div style="margin-top: -330px; width: 100%; overflow-x: scroll;">
      <TrainPict></TrainPict>
      <TimeLine style="margin-top: -70px;" :timebar="false">
        <TimeLabeledContent
          v-for="item in timelineBuffer"
          :key="`tli${item.id}`"
          :time="item.time"
          :icon="item.icon"
          :icon-text-color="item.iconTextColor"
          class="mr-3"
        >
          <div class="p-3 m-1 bg-light shadow" style="width: 400px;">
            <StatusInfo
              :status="item.contentAttr.status"
              :detail="item.contentAttr.detail"
              :detailImage="item.contentAttr.detailImage"
            ></StatusInfo>

            <DLResultView v-if="item.contentAttr.dlDataSet" v-bind="item.contentAttr.dlDataSet"></DLResultView>
          </div>
        </TimeLabeledContent>
      </TimeLine>
    </div>
  </div>
</template>
<script>
import Manager from "~/components/YTWManager.js";

import StatusInfo from "~/components/SharedUIComponents/StatusInfo.vue";
import DLResultView from "~/components/SharedUIComponents/DLResultView.vue";
import TimeLine from "~/components/SharedUIComponents/TimeLine.vue";
import TimeLabeledContent from "~/components/SharedUIComponents/TimeLabeledContent.vue";
import TrainPict from "~/components/YTWUIComponents/TrainPict.vue";
import LiveMap from "~/components/YTWUIComponents/LiveMap.vue";
import AbnormalRangeMap from "~/components/YTWUIComponents/AbnormalRangeMap.vue";

export default {
  components: {
    StatusInfo,
    DLResultView,
    TimeLabeledContent,
    TimeLine,
    TrainPict,
    LiveMap,
    AbnormalRangeMap
  },
  mounted: function() {
    Manager.init(this);
  },
  data() {
    return {
      id: 0,
      latestId: -1,
      timelineBuffer: [],
    };
  },
  watch: {
    timelineBuffer: function(newTL, oldTL) {
      this.latestId = this.timelineBuffer.length - 1;
    }
  }
};
</script>
<style lang="scss">
.timelineContainer {
  overflow-x: scroll;
}

.trans {
  transition: all 200ms 0s ease;
  transform: translateX(405px);
}

.timeline {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
}

.statusInfoCardLine {
  position: relative;
  top: -65px;
  height: 830px;
}

.primaryMap .mapboxgl-canvas {
  z-index: -1;
}
</style>