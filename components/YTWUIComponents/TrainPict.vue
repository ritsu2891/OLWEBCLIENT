<template>
  <canvas id="TrainPict">

  </canvas>
</template>
<script>
import * as PIXI from "pixi.js";

export default {
  data: function() {
    return {
      el: "TrainPict",
      VW: 5000,
      VH: 380,
      app: undefined,
      railwayWidth: 400,
      sprite: {
        wheels: [],
        train: undefined,
        railways: []
      }
    };
  },
  methods: {
    initCanvas() {
      this.app = new PIXI.Application({
        width: this.VW,
        height: this.VH,
        antialias: true,
        view: document.getElementById(this.el),
        transparent: true
      });
    },
    renderWheel() {
      const wheelPoseY = 315;
      const wheelPoses = [
        [85, wheelPoseY],
        [160, wheelPoseY],
        [320, wheelPoseY],
        [395, wheelPoseY]
      ];
      for (let pos of wheelPoses) {
        const wheel = PIXI.Sprite.from("/wheel.png");
        wheel.position.set(...pos);
        wheel.height = 50;
        wheel.width = 50;
        wheel.anchor.set(0.5);
        this.sprite.wheels.push(wheel);
        this.app.stage.addChild(wheel);
      }
    },
    renderTrain() {
      const train = PIXI.Sprite.from("/train2.png");
      train.position.set(10, 10);
      this.sprite.train = train;
      this.app.stage.addChild(train);
    },
    renderRailway() {
      const railway = new PIXI.Graphics();
      railway.beginFill(0x000000);
      railway.drawRect(-this.railwayWidth, 340, this.railwayWidth, 10);
      railway.closePath();
      railway.endFill();
      this.app.stage.addChild(railway);
      this.sprite.railways.unshift(railway);
    },
    setAnimation() {
      const self = this;
      this.app.ticker.add(function(delta) {
        for (let wheel of self.sprite.wheels) {
          wheel.rotation -= 5 * PIXI.DEG_TO_RAD;
        }
        self.sprite.train.y = 10 + (Math.random() - 0.5) * 2;
        self.sprite.railways.forEach((railway, index) => {
          railway.x += delta * 3;
          if (railway.x > self.app.screen.width + self.railwayWidth) {
            self.app.stage.removeChild(railway);
            self.sprite.railways.splice(index, 1);
          }
        });
        if (self.sprite.railways[0].x > self.railwayWidth + 10) {
          self.renderRailway();
        }
      });
    },
    render() {
      this.initCanvas();
      this.renderWheel();
      this.renderTrain();
      this.renderRailway();
      this.setAnimation();
    }
  },
  mounted: function() {
    this.render();
  }
};
</script>