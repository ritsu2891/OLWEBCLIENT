<template>
  <div class="container">
    <div class="timelineContainer">
      <div class="timeline">
        <canvas id="canvas"></canvas>
        <div class="statusInfoCardLine">
          <div class="statusInfoCard">
            <div class="row">
              <div class="col-auto statusInfoCard__icon">●</div>
              <div class="col statusInfoCard__time">LIVE</div>
            </div>
            <div class="statusInfo shadow">
              <div class="statusInfo__status">問題なし</div>
              <div class="statusInfo__description">列車に異常は検知されていません</div>
            </div>
          </div>

          <div class="statusInfoCard" style="margin-left: 200px;">
            <div class="row">
              <div class="col-auto statusInfoCard__icon">▲</div>
              <div class="col statusInfoCard__time">14:52</div>
            </div>
            <div class="statusInfo shadow">
              <div class="statusInfo__status">問題なし</div>
              <div class="statusInfo__description">列車に異常は検知されていません</div>
            </div>
          </div>

          <div class="statusInfoCard" style="margin-left: 20px;">
            <div class="row">
              <div class="col-auto statusInfoCard__icon">▲</div>
              <div class="col statusInfoCard__time">12:25</div>
            </div>
            <div class="statusInfo shadow">
              <div class="statusInfo__status">問題なし</div>
              <div class="statusInfo__description">列車に異常は検知されていません</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as PIXI from "pixi.js";

export default {
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
.statusInfoCard {
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

.statusInfo {
  margin-left: 30px;
  padding: 25px;
  background-color: rgb(245, 245, 245);

  &__status {
    font-size: 60px;
    text-align: center;
  }
  &__description {
    font-size: 30px;
  }
}

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

.statusInfoCard {
  &::before {
    content: "";
    height: 50px;
    border-left: 3px solid black;
    position: relative;
    left: 45px;
    top: 5px;
    display: inline-block;
  }
  //   background-color: green;
  width: 400px;
  height: 200px;
  float: left;
}

.statusInfoCard + .statusInfoCard {
  margin-left: 5px;
}
</style>