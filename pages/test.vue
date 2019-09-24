<template>
  <div class="container">
    <h1>TEST</h1>
    <h2>TimeLabeledContent</h2>
    <TimeLabeledContent time="LIVE" icon="●" icon-text-color="green">
      <div class="border border-dark p-5">ライブのコンテンツ</div>
    </TimeLabeledContent>
    <TimeLabeledContent :time="new Date()" icon="▲" icon-text-color="red">
      <div class="border border-dark p-5">昔のコンテンツ</div>
    </TimeLabeledContent>

    <h1>TimeLine</h1>
    
    <TimeLine>
      <TimeLabeledContent v-for="(item, idx) in timelineItem" :key="`tli${idx}`">
        <ValueCard class="shadow bg-light m-3"></ValueCard>
      </TimeLabeledContent>
    </TimeLine>

    <button v-on:click="addTimelineItem">追加</button>

    <h1>ValueCrad</h1>

    <ValueCard :label="テスト項目" val="129.2s"></ValueCard>
    <ValueCard :label="テスト項目" val="29.2s" class="shadow bg-light m-3" style="width: 400px; display: inline-block;"></ValueCard>
    <ValueCard :label="テスト項目" val="29.2s" class="shadow bg-light m-3" style="width: 400px; display: inline-block;"></ValueCard>
  </div>
</template>
<script>
import TimeLabeledContent from "~/components/SharedUIComponents/TimeLabeledContent.vue";
import TimeLine from "~/components/SharedUIComponents/TimeLine.vue";
import ValueCard from "~/components/SharedUIComponents/ValueCard.vue";

export default {
  components: { TimeLabeledContent, TimeLine, ValueCard },
  data: function() {
    return {
      timelineItem: [1, 2, 3]
    };
  },
  methods: {
    addTimelineItem: function () {
      this.timelineItem.push(9);
    }
  }
};
</script>