"use client";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  strokeColor?: string;
}

export function Sparkline({
  data,
  width = 80,
  height = 24,
  className = "",
  strokeColor = "rgba(163, 230, 53, 0.8)",
}: SparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;
  const w = width - padding * 2;
  const h = height - padding * 2;
  const stepX = w / (data.length - 1);

  const points = data
    .map((v, i) => {
      const x = padding + i * stepX;
      const y = padding + h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
