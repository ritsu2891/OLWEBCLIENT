<template>
  <div class="row valueCard">
    <div class="col align-self-center" style>
      <div class="valueCard__label">{{label}}</div>
      <div class="valueCard__val" :id="`value-${label}`">
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
    unit: { default: "" }
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
  }
  &__unit {
    font-size: 50px;
  }
}
</style>