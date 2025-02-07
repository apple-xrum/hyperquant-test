import { BotType } from "@types";

type PropsType = {
  bot: BotType;
  currentPeriod: "24h" | "7d" | "30d" | "60d" | "90d" | "all_time";
  currentBot: string;
};

const isBoss = false;

const Bot = ({ bot, currentPeriod, currentBot }: PropsType) => {
  const color = bot.name.split("_")[0];
  const isPositive = bot[currentPeriod] > 0;

  // const isBoss = Math.random() > 0.5;

  return (
    <button
      className={`${bot.name === currentBot && "inner-shadow"} hover:inner-shadow flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md bg-[#252D40] transition-all`}
    >
      <div className="relative aspect-square w-12">
        {isBoss ? (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 540 540"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M120 0H180V60H120V0ZM360 60H300V120H240V60H180V120H120V180H60V240H0V300V360V420H60V360V300H120V360V420H180V480H120V540H180H240V480V420H300V480V540H360H420V480H360V420H420V360V300H480V360V420H540V360V300V240H480V180H420V120H360V60ZM360 60V0H420V60H360ZM300 240H360V180H300V240ZM180 180V240H240V180H180Z"
              fill={color}
            />
          </svg>
        ) : (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 540 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M240 0H180V60H120V120H60V180H0V240V300V360V420H60V360H120V420H180V360H240V420H300V360H360V420H420V360H480V420H540V360V300V240V180H480V120H420V60H360V0H300V60H240V0ZM420 240H360H300V180H360H420V240ZM240 180V240H180H120V180H180H240Z"
              fill={color}
            />
          </svg>
        )}
      </div>
      <p className={`${isPositive ? "text-[#78A659]" : "text-[#D2447B]"} text-lg font-bold`}>
        {isPositive ? "+" : "-"}
        {+bot[currentPeriod]}%
      </p>
    </button>
  );
};

export default Bot;
