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
    <div style="margin-top: -330px;">
      <TrainPict></TrainPict>
      <TimeLine style="margin-top: -70px;" :timebar="false">
        <TimeLabeledContent
          v-for="item in timelineBuffer"
          :key="`tli${item.id}`"
          :time="item.time"
          :icon="item.icon"
          :icon-text-color="item.iconTextColor"
        ></TimeLabeledContent>
      </TimeLine>
    </div>

    <!-- <div class="statusInfoCardLine">
          <transition-group name="fade">
            <TimeLabeledContent
              v-for="item in timeline"
              :key="`timelineitem${item.id}`"
              :time="item.time"
              :icon="item.icon"
              :icon-text-color="item.iconTextColor"
              :class="{'trans': trans}"
            ></TimeLabeledContent>
          </transition-group>
    </div>-->
  </div>
</template>
<script>
import Manager from "~/components/YTWManager.js";

import StatusInfo from "~/components/SharedUIComponents/StatusInfo.vue";
import TimeLine from "~/components/SharedUIComponents/TimeLine.vue";
import TimeLabeledContent from "~/components/SharedUIComponents/TimeLabeledContent.vue";
import TrainPict from "~/components/YTWUIComponents/TrainPict.vue";
import LiveMap from "~/components/YTWUIComponents/LiveMap.vue";
import AbnormalRangeMap from "~/components/YTWUIComponents/AbnormalRangeMap.vue";

export default {
  components: {
    StatusInfo,
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
      startPt: undefined,
      startDt: undefined,
      timeline: [],
      timelineBuffer: [],
      trans: false,
      fp: undefined,
      pfp: undefined
    };
  },
  /*
        {
          id: 34,
          time: "LIVE",
          icon: "●",
          iconTextColor: "green",
          contentAttr: { status: "正常" }
        },
        {
          id: 35,
          time: "17:45",
          icon: "▲",
          iconTextColor: "red",
          contentAttr: {
            status: "異物検知",
            detail: "車輪に異物が挟まっている可能性があります",
            detailImage: "wheelzoom.png",
            dlDataSet: {
              labels: ["針金", "抵抗", "アイテム3"],
              datas: [10, 81, 9],
              images: ["/針金.png", "/抵抗.jpg", "/針金.png"]
            },
            rangeDataSet: {
              startPos: [136.90104246139526, 35.142985260896246],
              endPos: [136.91048383712769, 35.12066327340687]
            }
          }
        },
        {
          id: 36,
          time: "13:21",
          icon: "▲",
          iconTextColor: "red",
          contentAttr: {
            status: "異物検知",
            detail: "車輪に異物が挟まっている可能性があります",
            detailImage: "wheelzoom.png",
            dlDataSet: {
              labels: ["針金", "抵抗", "アイテム3"],
              datas: [90, 7, 3],
              images: ["/針金.png", "/抵抗.jpg", "/針金.png"]
            },
            rangeDataSet: {
              startPos: [136.94571733474731, 35.12073347792679],
              endPos: [136.95884943008423, 35.13508903084878]
            }
          }
        }
        */
  methods: {
    addItem(item) {
      return new Promise((resolve, reject) => {
        this.trans = true;
        const self = this;
        let id = this.id;
        this.id += 1;
        setTimeout(function() {
          self.trans = false;
          self.timeline.unshift(item);
          resolve();
        }, 250);
      });
    }
  },
  watch: {
    timelineBuffer: function(newTL, oldTL) {
      for (let i = this.latestId + 1; i < this.timelineBuffer.length; i++) {
        const item = this.timelineBuffer[i];

        //TODO: 故障検知区間は将来追加されるであろうリアクティブオブジェクトにデータを追加する必要があるため、非常にややこしい。解決の目処が立たないため、開発を保留する。

        //正常->異常
        // if (
        //   i > 0 &&
        //   this.timelineBuffer[i - 1].status == 0 &&
        //   item.status == 1
        // ) {
        //   this.startPt = this.$refs.map.dotPosition;
        //   this.startDt = new Date();
        // }

        //故障->正常
        // if (
        //   i > 0 &&
        //   this.timelineBuffer[i - 1].status == 1 &&
        //   item.status == 0
        // ) {
        //   this.$set(this.timelineBuffer[i-1]["contentAttr"]["rangeDataSet"], {
        //     startPos: this.startPt,
        //     endPos: this.$refs.map.dotPosition
        //   });
        // }

        // if (!this.fp) {
        //   this.fp = this.addItem(item);
        // } else {
        //   //TODO: ここの動きの解明
        //   let self = this;
        //   this.fp = this.fp.then(function() {
        //     return self.addItem(item);
        //   });
        // }
      }
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