function radialChart() {
  
  let width = 960,
      height = 500,
      margin = {top: 10, left: 10, bottom: 10, right: 10},
      textSize = 15,
      arcPadding = 16,
      colors = undefined,
      backgroundArcColor = '#f7f7f7',
      arcWidth,
      chartRadius;

  let data = null,
      pointValue = (point) => point.value,
      pointKey = (point) => point.key;

  let canvas,
      arc,
      scale;

  const PI = Math.PI,
        arcMinRadius = 30;

  function chart(selection) {
    selection.each(function() {
      let svg = d3.select(this)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      canvas = svg.append('g')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      scale = d3.scaleLinear()
        .domain([0, getMaxDataValue()])
        .range([0, 2 * PI]);

      arc = d3.arc()
        .innerRadius((d, i) => getInnerRadius(i))
        .outerRadius((d, i) => getOuterRadius(i))
        .startAngle(0)
        .endAngle((d) => scale(d));

      chartRadius = calculateChartRadius();
      arcWidth = (chartRadius - data.length * arcPadding) / data.length;
      
      if (!colors) {
        colors = getRandomColorPalette(data.length);
      }

      draw();
    });
  }

  // #region Chart drawing

  function draw() {
    drawBackgroundArcs();
    drawDataArcs();
  }

  function drawBackgroundArcs() {
    let backgroundArcs = canvas.append('g')
      .attr('class', 'background-arc')
      .selectAll('path')
      .data(getBackgroundArcsData())
      .enter()
      .append('path')
      .attr('class', 'arc')
      .style('fill', () => backgroundArcColor);

    backgroundArcs.transition()
      .delay((d, i) => i * 200)
      .duration(1000)
      .attrTween('d', arcTween);
  }

  function drawDataArcs() {
    let dataArcs = canvas.append('g')
      .attr('class', 'data')
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'arc')
      .attr('data-key', function(d) { return pointKey(d); })
      .style('fill', (d, i) => colors[i]);

    dataArcs
      .on('mouseover', highlight)
      .on('mouseleave', function() {
        d3.selectAll('.arc').attr('opacity', 1);
      });

    dataArcs.transition()
      .delay((d, i) => i * 200)
      .duration(1000)
      .attrTween('d', arcTween);
  }

  // #endregion

  // #region Helper functions

  function calculateChartRadius() {
    let chartWidth = width - margin.left - margin.right;
    let chartHeight = height - margin.top - margin.bottom;

    if (chartWidth < chartHeight) {
      return width / 2 - margin.left - margin.right;
    } else {
      return height / 2 - margin.top - margin.bottom;
    }
  }

  function getBackgroundArcsData() {
    let backgroundArcsData = [];
    let maxDataValue = getMaxDataValue();

    for (let i = 0; i < data.length; ++i) {
      backgroundArcsData.push({
        value: maxDataValue
      });
    }

    return backgroundArcsData;
  }

  function getMaxDataValue() {
    let max = 0;
    for (let i = 0; i < data.length; ++i) {
      let current = data[i];
      let currentValue = pointValue(current);
      if (currentValue > max) {
        max = currentValue;
      }

      return max;
    }
  }

  function arcTween(d, i) {
    let interpolate = d3.interpolate(0, pointValue(d));
    return t => arc(interpolate(t), i);
  }

  function getInnerRadius(index) {
    return arcMinRadius + (data.length - (index + 1)) * (arcWidth + arcPadding);
  }

  function getOuterRadius(index) {
    return getInnerRadius(index) + arcWidth;
  }

  function getRandomColorPalette(length) {
    let palette = [];
    
    let letters = '0123456789ABCDEF';
    for (let i = 0; i < length; ++i) {
      let color = '#';
      for (let j = 0; j < 6; ++j) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      palette.push(color);
    }

    return palette;
  }

  function highlight(d) {
    $('.arc[data-key != "' + pointKey(d) + '"]').attr('opacity', 0.3);
    $('text[data-key != "' + pointKey(d) + '"]').attr('opacity', 0.3);
  }

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

  chart.margin = function(value) {
    if (!arguments.length) {
      return margin;
    }
    margin = value;

    return chart;
  };

  chart.textSize = function(value) {
    if (!arguments.length) {
      return textSize;
    }
    textSize = value;

    return chart;
  };

  chart.arcPadding = function(value) {
    if (!arguments.length) {
      return arcPadding;
    }
    arcPadding = value;

    return chart;
  };

  chart.colors = function(value) {
    if (!arguments.length) {
      return colors;
    }
    colors = value;

    return chart;
  };

  chart.backgroundArcColor = function(value) {
    if (!arguments.length) {
      return backgroundArcColor;
    }
    backgroundArcColor = value;

    return chart;
  };

  chart.data = function(value) {
    if (!arguments.length) {
      return data;
    }
    data = value;

    return chart;
  };

  chart.pointValue = function(value) {
    if (!arguments.length) {
      return pointValue;
    }
    pointValue = value;

    return chart;
  };

  chart.pointKey = function(value) {
    if (!arguments.length) {
      return pointKey;
    }
    pointKey = value;

    return chart;
  };

  // #endregion

  return chart;
}

export { radialChart as default };
