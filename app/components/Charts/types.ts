export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color: string;
}

export interface LineChartProps {
  data?: number[];
  labels?: string[];
  title?: string;
  description?: string;
  value?: string;
  percentage?: string;
  showPercentage?: boolean;
}

export interface PieChartProps {
  data?: ChartDataPoint[];
  title?: string;
  showLegend?: boolean;
}

export interface BarChartProps {
  data?: number[];
  labels?: string[];
  title?: string;
}
