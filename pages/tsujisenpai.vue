<template>
  <div class="container">
    <div style="position: relative;">
      <HumanPict></HumanPict>
      <div style="width: 400px; position: absolute; right: 0; top: 0;">
        <div class="shadow bg-light p-2" style="width: 400px;">
          <FPSwitch class="m-0"></FPSwitch>
        </div>
        <div class="shadow bg-light p-3 my-4">
          <ValueCard label="検出人数" val="0人"></ValueCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ValueCard from "~/components/SharedUIComponents/ValueCard.vue";
import FPSwitch from "~/components/SharedUIComponents/FPSwitch.vue";
import HumanPict from "~/components/TFSUIComponents/HumanPict.vue";

export default {
  components: { ValueCard, FPSwitch, HumanPict }
};
</script>