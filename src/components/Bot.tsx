import { BotType } from "@types";
import { useAppDispatch } from "@store/hooks.ts";
import { setCurrentBot } from "@store/bots/slice/bots.slice.ts";
import { useEffect, useState } from "react";

type PropsType = {
  bot: BotType;
  currentPeriod: "24h" | "7d" | "30d" | "60d" | "90d" | "all_time";
  currentBot: BotType;
};

const titlesBots = ["ATTACK", "BALANCE", "DEFENCE"];

const getRandomWord = (words: string[]): string => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

const Bot = ({ bot, currentPeriod, currentBot }: PropsType) => {
  const dispatch = useAppDispatch();

  const [isBoss] = useState<boolean>(Math.random() > 0.5);
  const [color] = useState<string>(bot.name.split("_")[0]);
  const [title] = useState<string>(getRandomWord(titlesBots));
  const [isPositive, setIsPositive] = useState<boolean>(bot[currentPeriod] > 0);
  const [value, setValue] = useState<number>(0);

  const handleChangeBot = (botName: string) => {
    dispatch(setCurrentBot(botName));
  };

  useEffect(() => {
    setIsPositive(bot[currentPeriod] > 0);
    setValue(bot[currentPeriod]);
  }, [bot, currentPeriod]);

  return (
    <button
      className={`${bot.name === currentBot.name && "inner-shadow"} hover:inner-shadow flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md bg-[#252D40] transition-all`}
      onClick={() => handleChangeBot(bot.name)}
    >
      <div className="relative aspect-square w-12 py-2">
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
      <p className="text-sm font-bold text-white">{isBoss ? "MEGABOT" : title}</p>
      <p className={`${isPositive ? "text-[#78A659]" : "text-[#D2447B]"} text-sm font-bold`}>
        {isPositive ? "+" : "-"}
        {isPositive ? value : -value}%
      </p>
    </button>
  );
};

export default Bot;
