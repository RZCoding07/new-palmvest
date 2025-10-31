"use client"

import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from 'next-themes';

interface ChartData {
  x: number;
  y: number;
  region: string;
  outputType: string;
  bulan: string;
  tahun: number;
}

interface QuadrantChartProps {
  title: string;
  data: ChartData[];
  picaCenterValue?: number;
  centerY?: number;
  xAxisDomain?: [number, number];
  yAxisDomain?: [number, number];
  isLoading?: boolean;
  width?: string;
  height?: string;
  onPointClick?: (data: {
    picaFinalScore: number | string;
    y: number | null;
    region: string;
  }) => void;
}

const QuadrantChart: React.FC<QuadrantChartProps> = ({
  title,
  data,
  picaCenterValue = 2.5,
  centerY = 5000,
  xAxisDomain = [1, 5],
  yAxisDomain = [2000, 8000],
  isLoading = false,
  width = '100%',
  height = '400px',
  onPointClick,
}) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const { theme } = useTheme(); // <-- ambil theme dari next-themes

  // warna dinamis sesuai mode
  const isDark = theme === "dark";
  const textColor = isDark ? "#f3f4f6" : "#333"; // tailwind gray-100 vs gray-800
  const gridColor = isDark ? "#374151" : "#e0e0e0"; // tailwind gray-700 vs gray-200
  const bgColor = "transparent";

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current.chart;
    if (!chart) return;

    // bersihkan area sebelumnya
    if ((chart as any).customShapes) {
      (chart as any).customShapes.forEach((shape: any) => shape.destroy());
    }

    const xAxis = chart.xAxis[0];
    const yAxis = chart.yAxis[0];
    (chart as any).customShapes = [];

    const areas = [
      { xRange: [1, picaCenterValue], yRange: [yAxis.max ?? 0, centerY], color: 'rgba(255, 204, 204, 0.5)' },
      { xRange: [picaCenterValue, (xAxis.max ?? 0) + 0.2], yRange: [yAxis.max ?? 0, centerY], color: 'rgba(255, 192, 0, 0.5)' },
      { xRange: [1, picaCenterValue], yRange: [centerY, yAxis.min ?? 0], color: 'rgba(255, 255, 153, 0.5)' },
      { xRange: [picaCenterValue, (xAxis.max ?? 0) + 0.2], yRange: [centerY, yAxis.min ?? 0], color: 'rgba(188, 255, 219, 0.5)' },
    ];

    areas.forEach((area) => {
      const shape = chart.renderer
        .rect(
          xAxis.toPixels(area.xRange[0]),
          yAxis.toPixels(area.yRange[1]),
          xAxis.toPixels(area.xRange[1]) - xAxis.toPixels(area.xRange[0]),
          yAxis.toPixels(area.yRange[0]) - yAxis.toPixels(area.yRange[1]),
        )
        .attr({ fill: area.color, zIndex: 0 })
        .add();
      (chart as any).customShapes.push(shape);
    });
  }, [data, picaCenterValue, centerY, theme]);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'scatter',
      backgroundColor: bgColor,
      animation: true,
    height: "400px",

    },
    title: { text: title, style: { color: textColor, fontSize: '18px', fontWeight: 'bold' } },
    credits: { enabled: false },
    xAxis: {
      title: { text: 'PICA', style: { color: textColor, fontWeight: 'bold' } },
      min: xAxisDomain[0],
      max: xAxisDomain[1] + 0.2,
      tickInterval: 0.5,
      gridLineColor: gridColor,
      lineColor: gridColor,
      tickColor: gridColor,
      gridLineWidth: 0, // ⬅️ hilangin grid line
      labels: { style: { color: textColor } },
      plotLines: [
        {
          value: picaCenterValue,
          color: textColor,
          width: 1.5,
          dashStyle: 'Dash',
          zIndex: 5,
          label: { text: 'Target PICA', style: { color: textColor, fontWeight: 'bold' } }
        },
      ],
    },
    yAxis: {
      title: { text: 'Cash Cost (IDR)', style: { color: textColor, fontWeight: 'bold' } },
      min: yAxisDomain[0],
      max: yAxisDomain[1] + 1000,
      tickInterval: 500,
      gridLineColor: gridColor,
      gridLineWidth: 0, // ⬅️ hilangin grid line
      lineColor: gridColor,
      tickColor: gridColor,
      labels: {
        style: { color: textColor },
        formatter: function () {
          return Highcharts.numberFormat(Number(this.value), 0, ',', '.');
        }
      },
      reversed: true,
      plotLines: [
        {
          value: centerY,
          color: textColor,
          width: 1.5,
          dashStyle: 'Dash',
          zIndex: 5,
          label: {
            text: 'Target Cost',
            style: { color: textColor, fontWeight: 'bold' }
          },
        },
      ],
    },
    legend: { enabled: false },
    tooltip: {
      headerFormat: '<b>Detail</b><br>',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#ccc',
      borderRadius: 8,
      shadow: true,
      style: { fontSize: '12px' },
      pointFormatter: function () {
        const point = this as Highcharts.Point & { region?: string };
        const picaFinalScore = point.x ?? '-';
        const factoryName = point.region ?? '-';
        const value = point.y !== undefined && point.y !== null
          ? Highcharts.numberFormat(point.y, 0, ',', '.')
          : '-';
        const reportType = title.replace('Zona Kuadran - ', '');
        return `
              <span style="color: #666;">PICA Final Score:</span> <b>${picaFinalScore}</b><br/>
              <span style="color: #666;">Factory:</span> <b>${factoryName}</b><br/>
              <span style="color: #666;">${reportType} Value:</span> <b>${value}</b><br/>
            `;
      },
    },
    plotOptions: {
      scatter: {
        dataLabels: {
          enabled: true,
          formatter: function (this: Highcharts.Point) { return `${(this as any).region}` },
          style: { fontSize: '10px', fontWeight: 'bold', color: textColor, textOutline: '1px contrast' },
        },
      },
    },
    series: [
      {
        type: 'scatter',
        name: 'Region',
        color: isDark ? 'rgba(96, 165, 250, 0.9)' : 'rgba(59, 130, 246, 0.8)', // biru lebih terang di dark mode
        data: data.map(item => ({
          x: item.x,
          y: item.y,
          region: item.region,
          outputType: item.outputType,
          bulan: item.bulan,
          tahun: item.tahun
        })),
      },
    ],
  };

  return (
    <div className={`border rounded-md shadow-md pr-5 ${isDark ? "bg-gray-900" : "bg-white"}`} style={{ width, height }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartRef}
      />
    </div>
  );
};

export default QuadrantChart;
