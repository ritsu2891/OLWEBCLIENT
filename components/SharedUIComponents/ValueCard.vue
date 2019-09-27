<template>
  <div>
    <div class="valueCard" v-if="!small">
      <div class="row">
        <div class="col align-self-center">
          <div class="valueCard__label" :style="{'text-align': badge ? 'left' : ''}">{{label}}</div>
        </div>
        <div class="col-auto">
          <div
            v-if="badge"
            :style="{color: badge.color, border: `3px solid ${badge.color}`}"
            class="valueCard__badge"
          >{{badge.label}}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 align-self-center">
          <div class="valueCard__val" :id="`value-${label}`">
            {{val ? val : "---"}}
            <span class="valueCard__unit">{{unit}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row valueCard" v-if="small">
      <div class="col-5 align-self-center">
        <div class="valueCard__label">{{label}}</div>
      </div>
      <div class="col-7 align-self-center">
        <div class="valueCard__val valueCard__val--small" :id="`value-${label}`">
          {{val ? val : "---"}}
          <span class="valueCard__unit">{{unit}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GraphDataManager from "~/components/GraphDataManager.js";

export default {
  name: "value-card",
  props: {
    label: {
      type: String,
      default: "ARS"
    },
    val: { default: undefined },
    unit: { default: "" },
    small: { type: Boolean, default: false },
    badge: {}
  }
};
</script>
<style lang="scss">
.valueCard {
  // border: 1px solid #cccccc;
  & * {
    text-align: center;
  }
  &__label,
  &__val {
    text-align: center;
    width: 100%;
  }
  &__label {
    font-size: 30px;
  }
  &__badge ~ &__label {
    text-align: left;
  }
  &__val {
    font-size: 150px;
    &--small {
      font-size: 80px;
    }
  }
  &__unit {
    font-size: 50px;
  }
  &__badge {
    padding: 5px 10px;
    font-size: 20px;
    font-weight: 700;
    border-radius: 5px;
  }
}
</style>