function radialChart() {
  
  let width = 960,
      height = 500,
      textSize = 15;

  let data = null;

  let canvas;

  function chart(selection) {
    selection.each(function() {
      let svg = d3.select(this)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      canvas = svg.append('g');

      draw();
    });
  }

  // #region Chart drawing

  function draw() {
    console.log(canvas);
  }

  // #endregion

  // #region Helper functions
  // #endregion

  // #region Getters and Setters

  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;

    return chart;
  };

  chart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;

    return chart;
  };

  chart.textSize = function(value) {
    if (!arguments.length) {
      return textSize;
    }
    textSize = value;

    return chart;
  };

  chart.data = function(value) {
    if (!arguments.length) {
      return data;
    }
    data = value;

    return chart;
  };

  // #endregion

  return chart;
}

export { radialChart as default };
