type PropsType = {
  name: string;
  value: string;
  currentPeriod: string;
};

const RangeButton = ({ name, value, currentPeriod }: PropsType) => {
  return (
    <button
      className={`${currentPeriod === value ? "text-white" : "text-primary-light"} flex w-16 min-w-16 cursor-pointer items-center justify-center rounded-full border-2 py-1 text-sm font-bold text-nowrap`}
    >
      {name}
    </button>
  );
};

export default RangeButton;
