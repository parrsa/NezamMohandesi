"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { LineChartProps } from "../types";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler
);

export default function LineChart({
  data = [300, 400, 350, 500, 450, 600, 550],
  labels,
  title = "توزیع نشریات بر اساس حوزه",
}: LineChartProps) {
  const shamsiMonths: string[] = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const chartLabels: string[] = labels || shamsiMonths.slice(0, data.length);

  const chartData: ChartData<"line"> = {
    labels: chartLabels,
    datasets: [
      {
        label: "کل بازدیدها",
        data: data,
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#8b5cf6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: "کل دانلود ها",
        data: data,
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#8b5cf6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "#6b7280",
          font: {
            family: "Vazirmatn, sans-serif",
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          family: "Vazirmatn, sans-serif",
        },
        bodyFont: {
          family: "Vazirmatn, sans-serif",
        },
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            family: "Vazirmatn, sans-serif",
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#6b7280",
          font: {
            family: "Vazirmatn, sans-serif",
            size: 11,
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
      <div className="h-72">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
