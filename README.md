# d3-radial-chart

D3 plugin allowing to create radial bar chart from a flat data set.

The plugin aims to follow the convention for developing D3 plugins described in [Towards Reusable Charts](https://bost.ocks.org/mike/chart/) by Mike Bostock.

![Example01](https://github.com/sxliam/d3-radial/blob/develop/Image/example%20image.png)

## Installing

If you are using NPM, you can install the plugin via:

```sh
$ npm install d3-radial-chart
```

Otherwise, download the [latest release](https://github.com/sxliam/d3-radial/releases) and include it in your page using the `script` tag.   

### Dependencies

The plugin does not require any additional dependencies. 

```html
<script src="../build/d3-radial-chart.min.js"></script>
<script src="https://d3js.org/d3.v4.js"></script>
```

## Examples

Check out the `examples/example.html` to see the plugin in practice. 

Below is listed the snippet that's used for initializing the radial bar chart with the sample data set:

```js
let data = [ 
  {key: 'JavaScript', value: 2300000}, 
  {key: 'Python', value: 1000000}, 
  {key: 'Java', value: 986000}, 
  {key: 'Ruby', value: 870000}, 
  {key: 'PHP', value: 559000}
];
          

let radialChart = d3.radialChart()
  .data(data)
  .arcPadding(15)
  .max(3000000)
  .round(15);

d3.select('#radial-chart')
  .call(radialChart);
```

## API Reference

### d3.radialChart()

Initializes and returns a new radial bar `chart` instance.

### chart.width([width])

Sets or returns the width of the chart.

### chart.height([height])

Sets or returns the height of the chart.

### chart.margin([margin])

Sets or returns the margins of the chart.

`margin` is an object that has the following format and default values: 

```js
{top: 10, right: 10, bottom: 10, left: 10}
```

### chart.textSize([textSize])

Set or return the size of text to be rendered on the chart.

### chart.arcPadding([arcPadding])

Set or return the padding between adjacent bar chart.

### chart.colors([colors])

Sets or returns the color palette to use for rendering chart. 

The palette has the form of an array of hex color values. By default, the chart is initialized with the palette of random colors.

### chart.backgroundArcColor([backgroundArcColor])

Set or return the color of background arc on the chart.

### chart.lineColor([lineColor])

Set or return the color of the line between the lable and the chart.

### chart.data([data])

Sets or returns the data to be rendered on the chart.

### chart.pointValue([pointValue])

Set or return the function returning the value of each data point.

### chart.pointKey([pointKey])

Set or return the function returning the key of each data point.

### chart.max([max])

Set or return the max value of the background arc on the chart.

### chart.cornerRadius([cornerRadius])

Set or return the arc corner radius. Default value is set to 0.

## Authors

 Name                | E-mail address            | Skype ID
:-------------------:|---------------------------|-----------------------
 Shuxi Lian          | sxliam223@gmail.com       | live:b5373e636fec6e95
 Kemal Sokolović     | kemal.sokolovic@gmail.com | kemal.sokolovic

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) for details.