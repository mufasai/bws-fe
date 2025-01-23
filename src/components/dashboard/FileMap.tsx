import { Component, onMount } from "solid-js";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export const FileMap: Component = () => {
  let chartDiv: HTMLDivElement | undefined;

  onMount(() => {
    const root = am5.Root.new(chartDiv!);
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
        layout:root.verticalLayout,
        innerRadius: am5.percent(60)
      })
    );
    /*
    let bg = root.container.set("background", am5.Rectangle.new(root, {
      fillPattern: am5.GrainPattern.new(root, {
        density: 0.1,
        maxOpacity: 0.2
      })
    }))

    */

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270
      })
    );

    series.set("colors", am5.ColorSet.new(root, {
      colors: [
          am5.color("#FF934F"),
          am5.color("#F5ED32"),
          am5.color("#9482FE")
      ]
  }));
  
  // Hapus properti gradient
  series.slices.template.setAll({
      strokeWidth: 2,
      stroke: am5.color(0xffffff),
      cornerRadius: 10,
      shadowOpacity: 0.1,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowColor: am5.color(0x000000)
  });
  

    series.slices.template.states.create("hover", {
      shadowOpacity: 1,
      shadowBlur: 10
    })

    series.ticks.template.setAll({
      strokeOpacity:0.4,
    strokeDasharray:[2,2]
    })

    series.states.create("hidden", {
      endAngle: -90
    });

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([{
      category: "Admin",
      value: 400
    }, {
      category: "User",
      value: 250
    }, {
      category: "Supervisor",
      value: 350
    }]);

    const legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      marginTop: 15,
      marginBottom: 15,
    }));
    legend.markerRectangles.template.adapters.add("fillGradient", function() {
      return undefined;
    })
    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  });

  return (
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        User Map
      </h2>
      <div ref={chartDiv} class="h-[315px]" />
    </div>
  );
}; 