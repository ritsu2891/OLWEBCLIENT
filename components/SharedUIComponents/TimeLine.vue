<template>
  <div style="width: 5000px">
    <div :class="{'timeLine': true, 'timeLine--withbar': timebar}">
      <transition-group name="fade">
        <slot></slot>
      </transition-group>
    </div>
  </div>
</template>
<style lang="scss">
$pinLngth: 50px;

.timeLine {
  &--withbar {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: $pinLngth / 2;
      width: 100%;
      display: block;
      border-top: 5px solid black;
    }
  }

  & > * > * {
    float: left;
    transition: transform 200ms 0s ease, opacity 200ms 100ms ease;

    &::before {
      content: "";
      height: $pinLngth;
      border-left: 3px solid black;
      position: relative;
      left: 20px;
      top: 5px;
      display: inline-block;
    }

    &.disableAnimate {
      opacity: 0;
      transition: none;
    }

    &.animate {
      transform: translateX(-405px);
      transition: none;
    }
  }
}
</style>
<script>
export default {
  data: function() {
    return {
      nItems: 0
    };
  },
  props: {
    timebar: { type: Boolean, default: true }
  },
  computed: {
    items: function() {
      return this.$children[0].$children;
    },
  },
  mounted: function() {
    this.nItems = this.items.length;
  },
  updated: function() {
    const latestItem = this.items[this.items.length-1];
    if (this.items.length > this.nItems) {
      const self = this;
      var classChanger = function() {
        self.items.forEach((item, index) => {
          if (index == 0) {
            item.$el.classList.toggle("disableAnimate");
          } else {
            item.$el.classList.toggle("animate");
          }
        });
      };
      var higlighter = function() {
        latestItem.$el.classList.toggle("tlhilightEl");
      }
      classChanger();
      setTimeout(classChanger, 10);
      setTimeout(higlighter, 50);
      // setTimeout(higlighter, 1080);
    }
    this.nItems = this.items.length;
  }
};
</script>