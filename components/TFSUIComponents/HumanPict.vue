<template>
  <div>
    <canvas id="HumanPictCanvas"></canvas>
    <!-- <button v-on:click="nPerson++">追加</button>
    <button v-on:click="nPerson--">削除</button> -->
  </div>
</template>
<script>
import * as PIXI from "pixi.js";
import { Ease } from "pixi-ease";
global.PIXI = PIXI;
require("pixi-layers");

export default {
  data: function() {
    return {
      app: undefined,
      persons: [],
      VW: 1000,
      VH: 550,
      personTextureHeight: 256,
      personTextureWidth: 140
    };
  },
  props: {
    nPerson: { type: Number, default: 0 }
  },
  computed: {
    personXPos: function() {
      const XPos = [];
      // const med = this.nPerson == 1 ? 1 : this.nPerson / 2;
      const marginLeft = 100;
      for (let i = 0; i < this.nPerson; i++) {
        // XPos.push(this.VW / 2 + (i + 1 - med) * 150);
        XPos.push(this.personTextureWidth * (this.nPerson - i) + marginLeft);
      }
      return XPos;
    }
  },
  mounted: function() {
    this.initCanvas();
  },
  methods: {
    initCanvas: function() {
      const VW = 1500;
      const VH = 550;

      this.app = new PIXI.Application({
        width: VW,
        height: VH,
        antialias: true,
        view: document.getElementById("HumanPictCanvas"),
        backgroundColor: 0xffffff
      });

      //背景の家の追加
      const NHouseTexture = 2;
      const houses = [];
      const houseScale = 1.2;
      const margin = 10;

      const textureResolver = [];

      for (let i = 0; i < NHouseTexture; i++) {
        houses.push(PIXI.Sprite.from(`/house${i}.png`));
        textureResolver.push(
          new Promise((resolve, reject) => {
            houses[i].texture.baseTexture.addListener("loaded", () => {
              resolve(houses[i].texture.width * houseScale);
            });
          })
        );
      }

      Promise.all(textureResolver).then(widths => {
        let widthSum = 0;
        for (let i = 0; i < NHouseTexture; i++) {
          houses[i].scale.set(houseScale);
          houses[i].y = VH - houses[i].texture.height * houseScale;
          houses[i].x = widthSum;
          widthSum += widths[i] + margin;
        }
      });

      //ブロック塀の追加
      const blockTexture = PIXI.Texture.from("/block.png");
      const blockTextureHeight = 166;
      const block = new PIXI.TilingSprite(blockTexture, VW, blockTextureHeight);
      block.y = VH - blockTextureHeight;

      //電柱の追加
      const poleTexture = PIXI.Texture.from("/denchu.png");
      const poleTextureHeight = 700;
      const poleTextureScale = 0.75;

      const pole = new PIXI.TilingSprite(
        poleTexture,
        VW * (1 / poleTextureScale),
        poleTextureHeight
      );

      pole.anchor.y = 1;
      pole.scale.set(poleTextureScale);
      pole.anchor.y = 0;
      pole.y = VH - poleTextureHeight * poleTextureScale;

      //壁画
      for (let i = 0; i < NHouseTexture; i++) {
        this.app.stage.addChild(houses[i]);
      }
      this.app.stage.addChild(block);
      this.app.stage.addChild(pole);

      this.initPerson();
    },
    genPerson: function() {
      const personTextureHeight = 256;
      const personScale = 1.4;
      const personTexture = PIXI.Texture.from("/person.png");
      const person = new PIXI.Sprite(personTexture);
      person.anchor.set(0.5);
      person.scale.set(personScale);
      person.anchor.set(1, 0);
      person.y = this.VH - personTextureHeight * personScale;
      return person;
    },
    initPerson: function() {
      let person = undefined;
      for (let i = 0; i < this.nPerson; i++) {
        this.persons.push(this.genPerson());
        person = this.persons[i];
        person.x = this.personXPos[i];
        this.app.stage.addChild(person);
      }
    },
    relocatePerson: function() {
      const animator = new Ease({ duration: 200, ease: "easeInOutQuad" });
      let person = undefined;
      for (let i = 0; i < this.nPerson; i++) {
        person = this.persons[i];
        if (person) {
          animator.add(person, { x: this.personXPos[i] });
          // person.x = this.personXPos[i];
        }
      }
    },
    addPerson: function() {
      const animator = new Ease({ duration: 200, ease: "easeInOutQuad" });

      let person = this.genPerson();
      this.persons.push(person);

      let initY = person.y + this.personTextureHeight;
      let finY = person.y;

      person.x = this.personXPos[this.persons.length - 1];
      person.y = initY;

      this.app.stage.addChild(person);

      animator.add(person, { y: finY });
    },
    removePerson: function() {
      const animator = new Ease({ duration: 200, ease: "easeInOutQuad" });

      let person = this.persons.pop();

      let finY = person.y + this.personTextureHeight + 100;

      animator.add(person, { y: finY });
      animator.once("complete", () => {
        this.app.stage.removeChild(person);
      });
    }
  },
  watch: {
    nPerson: function(newN, oldN) {
      const diff = newN - oldN;
      const duration = 10;
      if (newN < 0) {
        return;
      }
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          setTimeout(() => {
            this.relocatePerson();
            this.addPerson();
          }, duration * i);
        }
      }
      if (diff < 0) {
        for (let i = 0; i < -diff; i++) {
          setTimeout(() => {
            this.removePerson();
            this.relocatePerson();
          }, duration * i);
        }
      }
    }
  }
};
</script>