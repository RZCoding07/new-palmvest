"use client";

import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTheme } from "next-themes";

const PicaChart: React.FC = () => {
  const { theme } = useTheme();

  const opt: Highcharts.Options = useMemo(() => {
    const isDark = theme === "dark";

    return {
      chart: {
        type: "column",
        height: "368px",
        backgroundColor: isDark ? "#111827" : "#ffffff", // Tailwind: dark:bg-gray-900
        style: {
          color: isDark ? "#f3f4f6" : "#111827",
        },
      },
      title: {
        text: "",
        style: {
          color: isDark ? "#f3f4f6" : "#111827",
        },
      },
      xAxis: {
        categories: ["Category A", "Category B", "Category C", "Category D", "Category E"],
        labels: {
          style: {
            color: isDark ? "#d1d5db" : "#374151", // gray-300 vs gray-700
          },
        },
        lineColor: isDark ? "#374151" : "#d1d5db",
        gridLineColor: isDark ? "#1f2937" : "#e5e7eb",
      },
      yAxis: {
        min: 0,
        title: {
          text: "Total",
          style: {
            color: isDark ? "#d1d5db" : "#374151",
          },
        },
        labels: {
          style: {
            color: isDark ? "#d1d5db" : "#374151",
          },
        },
        gridLineColor: isDark ? "#1f2937" : "#e5e7eb",
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: "bold",
            color: isDark ? "#f3f4f6" : "#111827",
          },
        },
      },
      legend: {
        align: "center",
        verticalAlign: "bottom",
        backgroundColor: "transparent",
        itemStyle: {
          color: isDark ? "#f3f4f6" : "#111827",
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        borderColor: isDark ? "#374151" : "#d1d5db",
        style: {
          color: isDark ? "#f3f4f6" : "#111827",
        },
        headerFormat: "<b>{point.x}</b><br/>",
        pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
      },
      plotOptions: {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: true,
            style: {
              color: isDark ? "#f3f4f6" : "#111827",
            },
          },
        },
      },
      series: [
        {
          name: "Section 1",
          data: [15, 25, 10, 5, 2],
          color: "#FF9F43",
          type: "column",
        },
        {
          name: "Section 2",
          data: [10, 15, 5, 3, 2],
          color: "#28C76F",
          type: "column",
        },
        {
          name: "Section 3",
          data: [10, 5, 5, 2, 1],
          color: "#7367F0",
          type: "column",
        },
      ],
    };
  }, [theme]);

  return (
    <div className="space-y-6 w-full">
      <div className="p-4 rounded-md border shadow bg-white dark:bg-gray-900">
        <HighchartsReact highcharts={Highcharts} options={opt} />
      </div>
    </div>
  );
};

export default PicaChart;
