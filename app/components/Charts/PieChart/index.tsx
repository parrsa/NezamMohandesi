"use client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { ChartDataPoint, PieChartProps } from "../types";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieCharts({
  data: propData,
  title = "توزیع نشریات بر اساس حوزه",
  showLegend = true,
}: PieChartProps) {
  const defaultData: ChartDataPoint[] = [
    { label: "اقتصادی", value: 35, color: "rgba(59, 130, 246, 0.8)" },
    { label: "فرهنگی", value: 25, color: "rgba(139, 92, 246, 0.8)" },
    { label: "سیاسی", value: 20, color: "rgba(16, 185, 129, 0.8)" },
  ];

  const chartDataPoints: ChartDataPoint[] = propData || defaultData;

  const chartData: ChartData<"pie"> = {
    labels: chartDataPoints.map((item) => item.label),
    datasets: [
      {
        data: chartDataPoints.map((item) => item.value),
        backgroundColor: chartDataPoints.map((item) => item.color),
        borderColor: chartDataPoints.map((item) =>
          item.color.replace("0.8", "1")
        ),
        borderWidth: 2,
        hoverOffset: 15,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: "right" as const,
        rtl: true,
        labels: {
          color: "#6b7280",
          font: {
            family: "Vazirmatn, sans-serif",
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          family: "Vazirmatn, sans-serif",
          size: 12,
        },
        bodyFont: {
          family: "Vazirmatn, sans-serif",
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm h-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>
      </div>

      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
