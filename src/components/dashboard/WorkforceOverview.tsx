import { Component, onMount } from "solid-js";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export const WorkforceOverview: Component = () => {
  let chartDiv: HTMLDivElement | undefined;

  onMount(() => {
    const root = am5.Root.new(chartDiv!);
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      paddingLeft: 0,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));


    let data = [{
      "year": "2021",
      "europe": 2.5,
      "namerica": 2.5,
      "asia": 2.1,

    }, {
      "year": "2022",
      "europe": 2.6,
      "namerica": 2.7,
      "asia": 2.2
    }, {
      "year": "2023",
      "europe": 2.8,
      "namerica": 2.9,
      "asia": 2.4,
    }]


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.7,
      minorGridEnabled: true,

    })

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "year",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {}),

    }));
    xAxis.get("renderer").grid.template.setAll({
      visible: false
    })

    xRenderer.grid.template.setAll({
      location: 0.5,
    })

    xRenderer.labels.template.setAll({
      fontSize: '1.8vh',
      fontFamily: 'Inter',
      fill: am5.color(0x718ebf)
    });

    xAxis.data.setAll(data);


    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    });

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: yRenderer
    }));

    yRenderer.labels.template.setAll({
      fontSize: '1.8vh',
      fontFamily: 'Inter',
      fill: am5.color(0x718ebf)
    });


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name: string, fieldName: string, color: string) {
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: fieldName,
        categoryXField: "year",
        fill: am5.color(color),
        clustered: true
      }));

      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}:{valueY}",
        width: am5.percent(60),
        tooltipY: 0,
        strokeOpacity: 0,
        marginLeft: 0,
        marginRight: 0
      });

      series.columns.template.setAll({
        cornerRadiusBL: 100,
        cornerRadiusTR: 100,
        cornerRadiusTL: 100,
        cornerRadiusBR: 100
      })

      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: 0,
            centerX: am5.p50,
            populateText: true
          })
        });
      });

    }

    makeSeries("Europe", "europe", "#1814f3");
    makeSeries("North America", "namerica", "#16dbcc");
    makeSeries("Asia", "asia", "#ffb01f")


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100).then(() => {
      // Hide amCharts logo
      root._logo?.hide();

    });

  });

  return (
    <div class="bg-white dark:bg-gray-800 shadow-md h-max rounded-2xl p-[3vh] ">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold font-inter text-gray-900 dark:text-white">
          Weekly Progress
        </h2>
        <div class="flex items-center gap-2">
          <select class="text-[2vh] px-3 py-1 font-inter  bg-[#f3f4f8] rounded-full shadow-md border-none text-gray-900 dark:text-white">
            <option value="1">Weekly</option>
            <option value="2">Monthly</option>
            <option value="3">Yearly</option>
          </select>
          <select class="text-[2vh] px-3 py-1 font-inter  bg-[#f3f4f8] rounded-full shadow-md border-none text-gray-900 dark:text-white">
            <option value="1">Status</option>
            <option value="2">test</option>
            <option value="3">tesr</option>
          </select>
        </div>
      </div>
      <div ref={chartDiv} class="h-[50vh]" />
    </div>
  );
}; 