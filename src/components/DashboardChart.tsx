import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useEffect, useRef } from "react";

const DashboardChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const data = Array(31)
    .fill({})
    .map((_, index) => {
      return {
        date: `${index + 1}.04`,
        total: Math.random() * 1000,
      };
    });

  const value = 32.6;

  const isPositive = value > 0;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className="relative mb-3">
      <p
        className={`${isPositive ? "text-[#78A659]" : "text-[#D2447B]"} pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-3xl`}
      >
        {isPositive ? "+" : "-"}
        {+value}%
      </p>
      <div className="no-scrollbar overflow-x-auto" ref={containerRef}>
        <ResponsiveContainer minWidth={data.length * 80} height={200} width="100%">
          <AreaChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#227FDF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#227FDF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontalCoordinatesGenerator={({ height }) => {
                const step = height / 8;
                return Array.from({ length: 7 }, (_, i) => i * step);
              }}
              stroke="#273246"
              vertical={false}
            />

            {data.map((element) => {
              return (
                <ReferenceLine
                  key={element.date}
                  stroke="#1F4978"
                  strokeDasharray="3 3"
                  segment={[
                    { x: element.date, y: 0 },
                    { x: element.date, y: element.total },
                  ]}
                />
              );
            })}

            <XAxis
              dataKey="date"
              interval={0}
              padding={{ left: 30, right: 30 }}
              tickMargin={10}
              tickLine={false}
              stroke="#273246"
              tick={{ stroke: "#546076", fontWeight: 100 }}
            />
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke="#227FDF" fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
