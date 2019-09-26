<template>
  <div class="row valueCard">
    <div
      :class="{'col-5': small, 'col-12': !small, 'align-self-center': true}"
    >
      <div class="valueCard__label">{{label}}</div>
    </div>
    <div :class="{'col-7': small, 'col-12': !small, 'align-self-center': true}">
      <div :class="{'valueCard__val': true, 'valueCard__val--small': small}" :id="`value-${label}`">
        {{val ? val : "---"}}
        <span class="valueCard__unit">{{unit}}</span>
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
    small: { type: Boolean, default: false }
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
  &__val {
    font-size: 150px;
    &--small {
      font-size: 80px;
    }
  }
  &__unit {
    font-size: 50px;
  }
}
</style>