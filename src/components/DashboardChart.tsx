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

const pad = (number: number) => (number < 10 ? "0" + number : number);

const generateDates = (period: string) => {
  const today = new Date();
  const dates: string[] = [];

  const insertDateHours = (step: number) => {
    for (let j = 3; j >= 0; j--) {
      const date = new Date(today);
      date.setDate(today.getDate() - step);
      date.setHours(j * 6);
      dates.push(`${pad(date.getDate())}.${pad(date.getMonth() + 1)} ${date.getHours()}:00`);
    }
  };

  const insertHoursMinutes = (step: number) => {
    for (let j = 3; j >= 0; j--) {
      const date = new Date(today);
      date.setHours(today.getHours() - step);
      date.setMinutes(j * 15);
      dates.push(`${date.getHours()}:${date.getMinutes()}${j === 0 ? "0" : ""}`);
    }
  };

  switch (period) {
    case "24h":
      for (let i = 0; i < 24; i++) {
        insertHoursMinutes(i);
      }
      break;
    case "7d":
      for (let i = 0; i < 7; i++) {
        insertDateHours(i);
      }
      break;
    case "30d":
      for (let i = 0; i < 30; i++) {
        insertDateHours(i);
      }
      break;
    case "all_time":
      for (let i = 0; i < 100; i++) {
        insertDateHours(i);
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
        total: Math.floor(Math.random() * 901) + 100,
      };
    });

    setData(currentDate);
  }, [currentBot, currentPeriod, location]);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollLeft = containerRef.current.scrollWidth;
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
        <ResponsiveContainer minWidth={data.length * 20} height={200} width="100%">
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

            {data.map((element, index) => {
              if (index % 4 === 0) {
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
              }
            })}

            <XAxis
              dataKey="date"
              interval={3}
              padding={{ left: 30, right: 30 }}
              tickMargin={10}
              tickLine={false}
              stroke="#273246"
              tick={{ stroke: "#546076", fontWeight: 100, fontSize: "12px" }}
              tickFormatter={(value) => {
                return value.substring(0, 5);
              }}
            />
            <Tooltip
              wrapperStyle={{
                zIndex: 10,
              }}
              isAnimationActive={false}
              content={({ payload, label, active }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-primary-dark border-primary-light rounded-lg border p-4 shadow-lg">
                      <p className="text-primary-light text-sm">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={`item-${index}`} className="text-primary-light text-base">
                          <span className="text-primary-light font-bold uppercase">
                            {entry.name}:
                          </span>{" "}
                          <span className="font-bold text-white">{entry.value}</span>
                        </p>
                      ))}
                    </div>
                  );
                }

                return null;
              }}
            />
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
