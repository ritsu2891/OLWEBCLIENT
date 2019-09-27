<template>
  <div class="container">
    <h1>TimeLabeledContent</h1>
    <TimeLabeledContent time="LIVE" icon="●" icon-text-color="green">
      <div class="border border-dark p-5">ライブのコンテンツ</div>
    </TimeLabeledContent>
    <TimeLabeledContent :time="new Date()" icon="▲" icon-text-color="red">
      <div class="border border-dark p-5">昔のコンテンツ</div>
    </TimeLabeledContent>

    <hr />
    <h1>TimeLine</h1>
    <TimeLine>
      <TimeLabeledContent v-for="(item, idx) in timelineItem" :key="`tli${idx}`">
        <ValueCard class="shadow bg-light m-3" :val="timelineItem[idx]"></ValueCard>
      </TimeLabeledContent>
    </TimeLine>

    <button v-on:click="addTimelineItem">追加</button>
    <button v-on:click="changeValue">変更</button>

    <hr />
    <h1>ValueCrad</h1>
    <ValueCard
      label="呼吸間隔"
      val="29.2"
      unit="s"
      class="shadow bg-light m-3"
      style="width: 400px; display: inline-block;"
    ></ValueCard>
    <ValueCard
      label="推定人数"
      val="1"
      unit="人"
      class="shadow bg-light m-3"
      style="width: 400px; display: inline-block;"
    ></ValueCard>

    <div class="shadow bg-light m-3" style="width: 400px; display: inline-block;">
      <ValueCard label="呼吸間隔" val="29.2" unit="s" :small="true"></ValueCard>
    </div>
    <div class="shadow bg-light m-3" style="width: 400px; display: inline-block;">
      <ValueCard label="推定人数" val="1" unit="人" :small="true"></ValueCard>
    </div>

    <hr />
    <h1>StatusInfo</h1>
    <StatusInfo
      status="正常"
      class="shadow bg-light m-3 p-2"
      style="width: 400px; display: inline-block;"
    ></StatusInfo>
    <StatusInfo
      status="正常"
      class="shadow bg-success text-white m-3 p-2"
      style="width: 400px; display: inline-block;"
    ></StatusInfo>
    <StatusInfo
      status="正常"
      detail="今のところ、特に問題は無いようです。"
      class="shadow bg-light m-3 p-2"
      style="width: 400px; display: inline-block;"
    ></StatusInfo>
    <StatusInfo
      status="正常"
      detail="今のところ、特に問題は無いようです。"
      detailImage="check.png"
      class="shadow bg-light m-3 p-2"
      style="width: 400px; display: inline-block;"
    ></StatusInfo>

    <hr />
    <h1>Switch</h1>
    <FPSwitch v-model="switchSelect" :items="switchConfig"></FPSwitch>
    <FPSwitch v-model="switchSelect2" :items="switchConfig2"></FPSwitch>
    <FPSwitch v-model="switchSelect3" :items="switchConfig2" :vertical="true"></FPSwitch>

    <hr />
    <h1>DLResultView</h1>
    <div class="shadow bg-light m-3 p-3" style="width: 400px; display: inline-block;">
      <DLResultView :labels="dl.labels" :images="dl.images" :datas="[80, 10, 10]"></DLResultView>
    </div>
    <div class="shadow bg-light m-3 p-3" style="width: 400px; display: inline-block;">
      <DLResultView :labels="dl.labels" :images="dl.images" :datas="[15, 75, 10]"></DLResultView>
    </div>

    <hr />
    <H1>TFS</H1>
    <h2>HumanPict</h2>

    <HumanPict :nPerson="nPerson"></HumanPict>
    <div>
      <button @click="nPerson++">追加</button>
      <button @click="nPerson--">削除</button>
    </div>

    <div style="margin-bottom: 2000px"></div>
  </div>
</template>
<script>
import TimeLabeledContent from "~/components/SharedUIComponents/TimeLabeledContent.vue";
import TimeLine from "~/components/SharedUIComponents/TimeLine.vue";
import ValueCard from "~/components/SharedUIComponents/ValueCard.vue";
import StatusInfo from "~/components/SharedUIComponents/StatusInfo.vue";
import FPSwitch from "~/components/SharedUIComponents/FPSwitch.vue";
import DLResultView from "~/components/SharedUIComponents/DLResultView.vue";
import HumanPict from "~/components/TFSUIComponents/HumanPict.vue";

export default {
  components: {
    TimeLabeledContent,
    TimeLine,
    StatusInfo,
    ValueCard,
    FPSwitch,
    HumanPict,
    DLResultView
  },
  data: function() {
    return {
      timelineItem: [1, 2, 3],
      switchSelect: 0,
      switchSelect2: 0,
      switchSelect3: 0,
      nPerson: 0,
      switchConfig: [
        {
          id: 0,
          label: "警戒",
          color: "linear-gradient(135deg, #ff3019 0%,#cf0404 100%)"
        },
        {
          id: 1,
          label: "解除",
          color: "linear-gradient(135deg, #22b09c 0%, #00b050 100%)"
        }
      ],
      switchConfig2: [
        {
          id: 0,
          label: "生波形",
          color: "linear-gradient(135deg, #e481ef 0%,#ab24b7 100%)"
        },
        {
          id: 1,
          label: "ARS",
          color: "linear-gradient(135deg, #80b1ed 0%,#2774c6 100%)"
        },
        {
          id: 2,
          label: "FFT",
          color: "linear-gradient(135deg, #67a31a 0%,#24b58e 100%)"
        }
      ],
      dl: {
        labels: ["抵抗", "針金", "その他"],
        images: ["/抵抗.jpg", "/針金.png", ""]
      }
    };
  },
  methods: {
    addTimelineItem: function() {
      this.timelineItem.unshift(9);
    },
    changeValue: function() {
      this.timelineItem.splice(1, 1, 10);
      console.log(this.timelineItem);
    }
  }
};
</script>