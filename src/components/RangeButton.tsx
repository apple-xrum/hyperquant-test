import { useAppDispatch } from "@store/hooks.ts";
import { setCurrentPeriod } from "@store/period/slice/period.slice.ts";

type PropsType = {
  name: string;
  value: string;
  currentPeriod: string;
};

const RangeButton = ({ name, value, currentPeriod }: PropsType) => {
  const dispatch = useAppDispatch();

  const handleChangeRange = (range: string) => {
    dispatch(setCurrentPeriod(range));
  };

  return (
    <button
      className={`${currentPeriod === value ? "font-bold text-white" : "text-primary-light"} flex w-16 min-w-12 cursor-pointer items-center justify-center rounded-full border-1 py-1 text-xs text-nowrap`}
      onClick={() => handleChangeRange(value)}
    >
      {name}
    </button>
  );
};

export default RangeButton;
