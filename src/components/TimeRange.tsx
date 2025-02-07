import { RangeButton } from "@components/index.ts";
import { useAppSelector } from "@store/hooks.ts";

const ranges = [
  {
    name: "24h",
    value: "24h",
  },
  {
    name: "7 days",
    value: "7d",
  },
  {
    name: "30 days",
    value: "30d",
  },
];

const TimeRange = () => {
  const { currentPeriod } = useAppSelector((state) => state.period);

  return (
    <div className="flex items-center justify-between px-4">
      <span className="text-primary-light text-xs font-bold">TimeRange:</span>
      <div className="no-scrollbar flex w-fit items-center justify-center gap-x-2 overflow-x-auto rounded-full px-2">
        {ranges.map((range) => (
          <RangeButton
            key={range.name}
            name={range.name}
            value={range.value}
            currentPeriod={currentPeriod}
          />
        ))}
      </div>
      <RangeButton name={"All time"} value={"all_time"} currentPeriod={currentPeriod} />
    </div>
  );
};

export default TimeRange;
