
import React from 'react';
import { PriceRecord } from '../types';

interface PriceHistoryChartProps {
  history: PriceRecord[];
  width?: number;
  height?: number;
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ history, width = 400, height = 200 }) => {
  if (history.length < 2) {
    return (
      <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-700/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-600" style={{ height }}>
        <p className="text-xs font-bold text-slate-400">データが不足しています（2件以上の記録が必要）</p>
      </div>
    );
  }

  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const prices = history.map(h => h.price);
  const minPrice = Math.min(...prices) * 0.9;
  const maxPrice = Math.max(...prices) * 1.1;
  const priceRange = maxPrice - minPrice;

  const points = history.map((record, index) => {
    const x = padding + (index / (history.length - 1)) * chartWidth;
    const y = height - (padding + ((record.price - minPrice) / priceRange) * chartHeight);
    return { x, y, price: record.price, date: record.date };
  });

  const pathData = points.reduce((acc, point, i) => 
    i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`, 
  '');

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-2 border border-slate-100 dark:border-slate-700 shadow-inner">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Y軸目盛り */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="1" />
        <text x={padding - 5} y={padding} textAnchor="end" className="fill-slate-400 text-[10px] font-bold">¥{Math.round(maxPrice)}</text>
        <text x={padding - 5} y={height - padding} textAnchor="end" className="fill-slate-400 text-[10px] font-bold">¥{Math.round(minPrice)}</text>

        {/* グラフ線 */}
        <path
          d={pathData}
          fill="none"
          stroke="currentColor"
          className="text-indigo-500"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* グラデーション埋め */}
        <path
          d={`${pathData} L ${points[points.length-1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
          fill="url(#gradient)"
          className="opacity-20"
        />

        {/* ポイント点 */}
        {points.map((point, i) => (
          <g key={i} className="group cursor-help">
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              className="fill-white stroke-indigo-500"
              strokeWidth="2"
            />
            <text
              x={point.x}
              y={point.y - 10}
              textAnchor="middle"
              className="fill-slate-600 dark:fill-slate-300 text-[9px] font-black opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ¥{point.price} ({point.date})
            </text>
          </g>
        ))}

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" />
            <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex justify-between mt-1 px-8">
        <span className="text-[9px] font-bold text-slate-400">{history[0].date}</span>
        <span className="text-[9px] font-bold text-slate-400">{history[history.length - 1].date}</span>
      </div>
    </div>
  );
};

export default PriceHistoryChart;
