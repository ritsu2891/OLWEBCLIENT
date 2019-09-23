<template>
  <div class="container">
    <button v-on:click="add">追加</button>
    <div class="timeline">
      <LiveMap
        class="primaryMap"
        width="100%"
        style="height: 600px; width: 100%;"
        :mapCenter="[136.893865, 35.157141]"
        :zoom="11.8"
      ></LiveMap>
      <div style="width: 5000px">
        <canvas id="canvas" style="margin-top: -340px;"></canvas>
        <div class="statusInfoCardLine">
          <transition-group name="fade">
            <TimeLabeledContent
              v-for="(item, index) in timeline"
              :key="`timelineitem${item.id}`"
              :time="item.time"
              content="StatusInfo"
              :contentAttr="item.contentAttr"
              :icon="item.icon"
              :icon-text-color="item.iconTextColor"
              :class="{'trans': trans}"
            ></TimeLabeledContent>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as PIXI from "pixi.js";

import StatusInfo from "~/components/StatusInfo.vue";
import TimeLabeledContent from "~/components/TimeLabeledContent.vue";
import MapTest from "~/components/MapTest.vue";
import BaseMap from "~/components/BaseMap.vue";
import LiveMap from "~/components/LiveMap.vue";
import AbnormalRangeMap from "~/components/AbnormalRangeMap.vue";

export default {
  components: {
    StatusInfo,
    TimeLabeledContent,
    MapTest,
    BaseMap,
    LiveMap,
    AbnormalRangeMap
  },
  mounted: function() {
    let app = new PIXI.Application({
      width: 1300,
      height: 380,
      antialias: true,
      view: document.getElementById("canvas"),
      //   backgroundColor: 0xdddddd,
      // backgroundColor: 0xffffff
      transparent: true
    });

    function addWheel(x, y) {
      const wheel = PIXI.Sprite.from("/wheel.png");
      wheel.x = x;
      wheel.y = y;
      wheel.height = 50;
      wheel.width = 50;
      wheel.anchor.set(0.5, 0.5);
      app.stage.addChild(wheel);

      app.ticker.add(delta => {
        wheel.rotation -= 5 * PIXI.DEG_TO_RAD;
      });
    }

    addWheel(85, 315);
    addWheel(160, 315);
    addWheel(320, 315);
    addWheel(395, 315);

    const sprite = PIXI.Sprite.from("./train2.png");
    sprite.x = 10;
    sprite.y = 10;
    app.stage.addChild(sprite);

    app.ticker.add(delta => {
      sprite.y = 10 + (Math.random() - 0.5) * 2;
    });

    const railwayWidth = 400;

    function addRailway() {
      const railway = new PIXI.Graphics();
      railway.beginFill(0x000000);
      railway.drawRect(-railwayWidth, 340, railwayWidth, 10);
      railway.closePath();
      railway.endFill();
      app.stage.addChild(railway);
      return railway;
    }

    var railways = [];
    railways.push(addRailway());

    app.ticker.add(delta => {
      railways.forEach((railway, index) => {
        railway.x += delta * 3;
        if (railway.x > app.screen.width + railwayWidth) {
          app.stage.removeChild(railway);
          railways.splice(index, 1);
        }
      });
      if (railways[0].x > railwayWidth + 10) {
        railways.unshift(addRailway());
      }
    });

    console.log(app.screen.width);

    // app.stage.interactive = true;
    // app.stage.on("pointermove", () => {
    //   var x = app.renderer.plugins.interaction.mouse.global.x;
    //   var y = app.renderer.plugins.interaction.mouse.global.y;
    //   console.log(`${x}, ${y}`);
    // });
  },
  data() {
    return {
      timeline: [
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
      ],
      trans: false
    };
  },
  methods: {
    add() {
      this.trans = true;
      const self = this;
      setTimeout(function() {
        self.trans = false;
        self.timeline.unshift({
          id: 31,
          time: "LIVE",
          icon: "●",
          iconTextColor: "green",
          contentAttr: { status: "正常" }
        });
      }, 300);
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