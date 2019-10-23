<template>
  <canvas id="CylinderPictCanvas"></canvas>
</template>
<script>
import * as PIXI from "pixi.js";

export default {
  data() {
    return {
      app: undefined,
      VW: 1000,
      VH: 550,
    }
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      this.app = new PIXI.Application({
        width: this.VW,
        height: this.VH,
        antialias: true,
        view: document.getElementById("CylinderPictCanvas"),
        backgroundColor: 0xffffff
      });
    },
    genArm() {
      const arm = new PIXI.Graphics();
      railway.beginFill(0x000000);
      railway.drawRect(-this.railwayWidth, 340, this.railwayWidth, 10);
      railway.closePath();
      railway.endFill();
      this.app.stage.addChild(railway);
      this.sprite.railways.unshift(railway);
    }
  }
}
</script>