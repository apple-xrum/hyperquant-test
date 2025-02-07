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
      className={`${currentPeriod === value ? "text-white" : "text-primary-light"} flex w-16 min-w-16 cursor-pointer items-center justify-center rounded-full border-2 py-1 text-sm font-bold text-nowrap`}
      onClick={() => handleChangeRange(value)}
    >
      {name}
    </button>
  );
};

export default RangeButton;
