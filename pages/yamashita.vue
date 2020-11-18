<template>
  <div class="container-fluid py-3 px-5">
    <!-- <button v-on:click="add">追加</button> -->
    <LiveMap
      class="primaryMap"
      width="100%"
      style="height: 600px; width: 100%; z-index: -1;"
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
          :time="item.datetime"
          :icon="STATUS[item.status].icon"
          :icon-text-color="STATUS[item.status].iconTextColor"
        >
          <div class="p-3 m-1 bg-light shadow" style="width: 400px;">
            <StatusInfo
              :status="STATUS[item.status].status"
              :detail="STATUS[item.status].detail"
              :detailImage="STATUS[item.status].detailImage"
            ></StatusInfo>

            <DLResultView
              v-if="item.obstacle"
              :labels="DL.labels"
              :images="DL.images"
              :datas="item.obstacle"
            ></DLResultView>
          </div>
        </TimeLabeledContent>
        <TimeLabeledContent
          time="--：--"
          icon="●"
          icon-text-color="black"
          key="tlifirst"
        >
          <div class="p-3 m-1" style="width: 400px; height: 200px; border: 2px black dashed;">
            <div class="row justify-content-center" style="height: 100%">
              <div class="col align-self-center" style="font-size: x-large;" align="center">
                分類結果はここに表示されます
              </div>
            </div>
          </div>
        </TimeLabeledContent>
      </TimeLine>
    </div>
  </div>
</template>
<script>
import * as YTW from "~/components/YTWManager.js";

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
  data() {
    return {
      id: 0,
      latestId: -1,
      manager: new YTW.YTWManager(),
      DL: YTW.DL,
      STATUS: YTW.STATUS
    };
  },
  computed: {
    timelineBuffer: function() {
      return this.manager.data["ytwStatus"].slice().reverse();
    }
  },
  watch: {
    timelineBuffer: function(newTL, oldTL) {
      this.latestId = this.timelineBuffer.length - 1;
    }
  },
  mounted: function() {
    // this.manager.run();
    this.manager.saveData("ytwStatus", [
      {
        "id": 0,
        "datetime": "2019-11-01 06:00:00.000",
        "status": 0
      },
    ]);
    window.setTimeout(() => {
      this.manager.saveData("ytwStatus", [
        {
          "id": 1,
          "datetime": "2019-11-01 06:00:05.000",
          "status": 1,
          "obstacle": [80, 10, 10]
        }
      ])
    }, 5000);
    window.setTimeout(() => {
      this.manager.saveData("ytwStatus", [
        {
          "id": 2,
          "datetime": "2019-11-01 06:00:10.000",
          "status": 0
        }
      ])
    }, 10000);
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