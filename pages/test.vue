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
      <TimeLabeledContent v-for="(item, idx) in timelineItem" :key="`tli${idx}`"></TimeLabeledContent>
    </TimeLine>

    <button v-on:click="addTimelineItem">追加</button>
  </div>
</template>
<script>
import TimeLabeledContent from "~/components/SharedUIComponents/TimeLabeledContent.vue";
import TimeLine from "~/components/SharedUIComponents/TimeLine.vue";

export default {
  components: { TimeLabeledContent, TimeLine },
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