Chart.defaults.stem = Chart.defaults.line;
Chart.elements.Stem = Chart.elements.Line.extend({
  draw: function () {
    var me = this;
    var vm = me._view;
    var ctx = me._chart.ctx;
    var spanGaps = vm.spanGaps;
    var points = me._children.slice(); // clone array
    var globalDefaults = Chart.defaults.global;
    var globalOptionLineElements = globalDefaults.elements.line;
    var lastDrawnIndex = -1;
    var closePath = me._loop;
    var index, previous, currentVM;
    var helpers = Chart.helpers;
    var valueOrDefault = helpers.valueOrDefault;

    if (me._loop && points.length) {
      for (index = 0; index < points.length; ++index) {
        previous = helpers.previousItem(points, index);
        // If the line has an open path, shift the point array
        if (!points[index]._view.skip && previous._view.skip) {
          points = points.slice(index).concat(points.slice(0, index));
          closePath = spanGaps;
          break;
        }
      }
      // If the line has a close path, add the first point again
      if (closePath) {
        points.push(points[0]);
      }
    }

    ctx.save();

    // Stroke Line Options
    ctx.lineCap =
      vm.borderCapStyle || globalOptionLineElements.borderCapStyle;

    // IE 9 and 10 do not support line dash
    if (ctx.setLineDash) {
      ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
    }

    ctx.lineDashOffset = valueOrDefault(
      vm.borderDashOffset,
      globalOptionLineElements.borderDashOffset
    );
    ctx.lineJoin =
      vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
    ctx.lineWidth = valueOrDefault(
      vm.borderWidth,
      globalOptionLineElements.borderWidth
    );
    ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;

    // Stroke Line
    ctx.beginPath();
    lastDrawnIndex = -1;

    for (index = 0; index < points.length; ++index) {
      previous = helpers.previousItem(points, index);
      currentVM = points[index]._view;

      previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex];

      if (!currentVM.skip) {
        if ( /*lastDrawnIndex !== index - 1 &&*/ spanGaps) {
          // There was a gap and this is the first point after the gap
          ctx.moveTo(currentVM.x, currentVM.y);
        } else {
          ////////////////////////////////////////////////////////
          ctx.moveTo(currentVM.x, me._scale.getPixelForValue(0));
          ctx.lineTo(currentVM.x, currentVM.y);
          ////////////////////////////////////////////////////////
        }
        // lastDrawnIndex = index;
      }
    }

    if (closePath) {
      ctx.closePath();
    }

    ctx.stroke();
    ctx.restore();
  }
});

Chart.controllers.stem = Chart.controllers.line.extend({
  datasetElementType: Chart.elements.Stem
});