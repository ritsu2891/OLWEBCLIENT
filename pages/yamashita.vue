<template>
  <div class="container">
    <div class="timelineContainer">
      <div class="timeline">
        <canvas id="canvas"></canvas>
        <div class="statusInfoCardLine">
          <TimeLabeledContent time="LIVE" content="StatusInfo"></TimeLabeledContent>
          <TimeLabeledContent time="17:45" content="StatusInfo" icon="▲" icon-text-color="red"></TimeLabeledContent>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as PIXI from "pixi.js";

import StatusInfo from "~/components/StatusInfo.vue";
import TimeLabeledContent from "~/components/TimeLabeledContent.vue";

export default {
  components: {
    StatusInfo, TimeLabeledContent
  },
  mounted: function() {
    let app = new PIXI.Application({
      width: 1300,
      height: 380,
      antialias: true,
      view: document.getElementById("canvas"),
      //   backgroundColor: 0xdddddd,
      backgroundColor: 0xffffff
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
  }
};
</script>
<style lang="scss">
.timelineContainer {
  overflow: scroll;
  height: 700px;
}

.timeline {
  width: 1500px;
}

.statusInfoCardLine {
  position: relative;
  top: -65px;
}
</style>