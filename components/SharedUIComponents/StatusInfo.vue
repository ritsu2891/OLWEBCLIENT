<template>
  <div class="statusInfo">
    <div v-if="status" class="statusInfo__status">{{status}}</div>
    <hr v-if="status && detail" />
    <div class="row align-items-center" v-if="detail">
      <div class="col-auto pr-3" v-if="detailImage">
        <img class="statusInfo__image" :src="detailImage" />
      </div>
      <div class="col">
        <div class="statusInfo__description">{{detail}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import DLResultView from "~/components/SharedUIComponents/DLResultView.vue";
import AbnormalRangeMap from "~/components/YTWUIComponents/AbnormalRangeMap.vue";

export default {
  components: { DLResultView, AbnormalRangeMap },
  props: {
    status: { type: String },
    detail: { type: String }, //車輪に異物が挟まっている可能性があります
    detailImage: { type: String }, ///wheelzoom.png
  }
};
</script>
<style lang="scss">
.statusInfo {
  &__status {
    font-size: 60px;
    text-align: center;
  }
  &__description {
    font-size: 30px;
  }
  &__image {
    width: 90px;
  }
  & hr {
    margin: {
      top: 5px;
      bottom: 5px;
    }
    border-top: {
      color: black;
    }
  }
}
</style>