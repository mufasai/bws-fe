import { Component, onMount } from "solid-js";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export const TaskDistribution: Component = () => {
  let chartDiv: HTMLDivElement | undefined;

  onMount(() => {
    const root = am5.Root.new(chartDiv!);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // Data
    const data = [
      { status: "Completed", value: 45, color: am5.color("#22c55e") },
      { status: "In Progress", value: 30, color: am5.color("#3b82f6") },
      { status: "Pending", value: 15, color: am5.color("#f59e0b") },
      { status: "Delayed", value: 10, color: am5.color("#ef4444") },
    ];

    // Create series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Task Status",
        valueField: "value",
        categoryField: "status",
        fillField: "color",
        alignLabels: false,
      })
    );

    series.data.setAll(data);
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    // Add legend
    const legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: root.horizontalLayout,
    }));
    legend.data.setAll(series.dataItems);

    return () => {
      root.dispose();
    };
  });

  return (
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Task Distribution
      </h2>
      <div ref={chartDiv} class="h-[400px]" />
    </div>
  );
}; 