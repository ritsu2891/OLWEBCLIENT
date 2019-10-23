<template>
  <div :id="elid"></div>
</template>
<script>
import * as turf from "@turf/turf";

import BaseMap from "~/components/YTWUIComponents/BaseMap.vue";

export default {
  extends: BaseMap,
  data() {
    return {
      dotSize: 150,
      dotPositionData: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [136.929865, 35.157141]
            }
          }
        ]
      },
      distance: 0 //金山が始点 [km]
    };
  },
  computed: {
    dotPosition: {
      get: function() {
        return this.dotPositionData.features[0].geometry.coordinates;
      },
      set: function(newPos) {
        this.dotPositionData.features[0].geometry.coordinates = newPos;
      }
    }
  },
  methods: {
    renderInitDot() {
      const self = this;
      self.map.on("load", function() {
        self.map.addSource("currentPoint", {
          type: "geojson",
          data: self.dotPositionData
        });

        const size = self.dotSize;
        const pulsingDot = {
          width: size,
          height: size,
          data: new Uint8Array(size * size * 4),

          onAdd: function() {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext("2d");
          },

          render: function() {
            var duration = 1500;
            var t = (performance.now() % duration) / duration;

            var radius = (size / 2) * 0.3;
            var outerRadius = (size / 2) * 0.7 * t + radius;
            var context = this.context;

            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
              this.width / 2,
              this.height / 2,
              outerRadius,
              0,
              Math.PI * 2
            );
            context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
            context.fill();

            // draw inner circle
            context.beginPath();
            context.arc(
              this.width / 2,
              this.height / 2,
              radius,
              0,
              Math.PI * 2
            );
            context.fillStyle = "rgba(255, 100, 100, 1)";
            context.strokeStyle = "white";
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // update this image's data with data from the canvas
            this.data = context.getImageData(
              0,
              0,
              this.width,
              this.height
            ).data;

            // keep the map repainting
            self.map.triggerRepaint();

            // return `true` to let the map know that the image was updated
            return true;
          }
        };

        self.map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

        self.map.addLayer({
          id: "points",
          type: "symbol",
          source: "currentPoint",
          layout: {
            "icon-image": "pulsing-dot"
          }
        });

        self.animate();
      });
    },
    animate() {
      const options = {
        units: "meters"
      };
      const line = turf.lineString(this.routeLine);
      const length = turf.length(line, options);
      if (this.distance > length) {
        this.distance = 0;
      }
      this.dotPositionData.features[0] = turf.along(
        line,
        this.distance,
        options
      );

      this.map.getSource("currentPoint").setData(this.dotPositionData);
      this.distance += 0.5;
      requestAnimationFrame(this.animate);
    }
  },
  mounted() {
    this.dotPosition = this.routeLine[0];
    this.renderInitDot();
  }
};
</script>