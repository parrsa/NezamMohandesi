"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BarChartProps } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

export default function BarChart({
  data = [120, 190, 300, 500, 200, 300],
  labels,
  title = "توزیع ماهانه نشریات",
}: BarChartProps) {
  const shamsiMonths: string[] = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
  ];

  const chartLabels: string[] = labels || shamsiMonths.slice(0, data.length);

  const chartData: ChartData<"bar"> = {
    labels: chartLabels,
    datasets: [
      {
        label: "نشریات فعال",
        data: data,
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(139, 92, 246)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
          "rgb(236, 72, 153)",
        ],
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false as const,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
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
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm h-96">
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
}
