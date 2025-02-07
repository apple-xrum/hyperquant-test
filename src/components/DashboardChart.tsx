import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@store/hooks.ts";
import { useLocation } from "react-router-dom";

type DataType = {
  date: string;
  total: number;
};

const generateDates = (period: string) => {
  const today = new Date();
  const dates = [];
  switch (period) {
    case "24h":
      for (let i = 0; i < 24; i++) {
        const date = new Date(today);
        date.setHours(today.getHours() - i);
        dates.push(`${date.getHours()}:00`);
      }
      break;
    case "7d":
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(`${date.getDate()}.${date.getMonth() + 1}`);
      }
      break;
    case "30d":
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(`${date.getDate()}.${date.getMonth() + 1}`);
      }
      break;
    case "all_time":
      for (let i = 0; i < 100; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(`${date.getDate()}.${date.getMonth() + 1}`);
      }
      break;
    default:
      break;
  }
  return dates.reverse();
};

const DashboardChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentBot } = useAppSelector((state) => state.bots);
  const { currentPeriod } = useAppSelector((state) => state.period);
  const [value, setValue] = useState<number>(0);
  const [isPositive, setIsPositive] = useState<boolean>(true);
  const [data, setData] = useState<DataType[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (!currentPeriod || !currentBot) return;
    const currentValue =
      currentBot[currentPeriod as "24h" | "7d" | "30d" | "60d" | "90d" | "all_time"];
    setValue(currentValue);
    setIsPositive(currentValue > 0);

    const currentDate = generateDates(currentPeriod).map((date) => {
      return {
        date,
        total: Math.random() * 1000,
      };
    });

    setData(currentDate);
  }, [currentBot, currentPeriod, location]);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollLeft = containerRef.current.scrollWidth;

    if (!containerRef.current) return;

    const tooltip: HTMLDivElement | null = containerRef.current.querySelector(
      ".recharts-tooltip-wrapper"
    );

    if (tooltip) tooltip.style.visibility = "hidden";
    if (tooltip) tooltip.style.transform = "translate(0,0)";

    setTimeout(() => {
      if (tooltip) tooltip.style.visibility = "hidden";
      if (tooltip) tooltip.style.transform = "translate(0,0)";
    }, 500);
  }, [data]);

  return (
    <div className="relative mb-3">
      <p
        className={`${isPositive ? "text-[#78A659]" : "text-[#D2447B]"} pointer-events-none absolute top-[calc(50%-13px)] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-2xl`}
      >
        {isPositive ? "+" : "-"}
        {isPositive ? value : -value}%
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
              tick={{ stroke: "#546076", fontWeight: 100, fontSize: "12px" }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#227FDF"
              fill="url(#colorUv)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
