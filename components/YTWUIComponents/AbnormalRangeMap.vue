<template>
  <div :id="elid"></div>
</template>
<script>
import * as turf from "@turf/turf";

import BaseMap from "~/components/YTWUIComponents/BaseMap.vue";

export default {
  extends: BaseMap,
  props: ["startPos", "endPos"],
  data() {
    return {
      rangeLineColor: "#F7455D",
      rangeLineWidth: 10
    };
  },
  computed: {
    slicedRouteLine() {
      const line = turf.lineString(this.routeLine);
      const sliced = turf.lineSlice(this.startPos, this.endPos, line);
      sliced.properties = {
        color: this.rangeLineColor
      };
      return sliced;
    }
  },
  methods: {
    renderRangeLine() {
      const self = this;
      this.map.on("load", function() {
        self.map.addLayer({
          id: "AbnormalRangeLine",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [self.slicedRouteLine]
            }
          },
          paint: {
            "line-width": self.rangeLineWidth,
            "line-color": ["get", "color"]
          }
        });
      });
    }
  },
  mounted() {
    this.renderRangeLine();
  }
};
</script>