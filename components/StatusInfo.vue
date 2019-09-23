<template>
  <div class="statusInfo shadow">
    <div class="statusInfo__status">{{status}}</div>
    <hr v-if="detail" />
    <div class="row align-items-center" v-if="detail">
      <div class="col-auto pr-3" v-if="detailImage">
        <img class="statusInfo__image" :src="detailImage" />
      </div>
      <div class="col pl-0">
        <div class="statusInfo__description">{{detail}}</div>
      </div>
    </div>
    <hr v-if="dlDataSet" />
    <DLResultView v-bind="dlDataSet" v-if="dlDataSet"></DLResultView>
    <hr v-if="rangeDataSet" />
    <AbnormalRangeMap
      :zoom="10"
      style="height: 200px;"
      :start-pos="rangeDataSet.startPos"
      :end-pos="rangeDataSet.endPos"
      v-if="rangeDataSet"
    ></AbnormalRangeMap>
  </div>
</template>
<script>
import DLResultView from "~/components/DLResultView.vue";
import AbnormalRangeMap from "~/components/AbnormalRangeMap.vue";

export default {
  components: { DLResultView, AbnormalRangeMap },
  props: {
    status: { type: String, default: "状況不明" },
    detail: { type: String }, //車輪に異物が挟まっている可能性があります
    detailImage: { type: String }, ///wheelzoom.png
    dlDataSet: {},
    rangeDataSet: {}
  }
};
</script>
<style lang="scss">
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