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
      className={`${bot.name === currentBot.name && "inner-shadow"} hover:inner-shadow flex cursor-pointer flex-col items-center justify-center rounded-md bg-[#252D40] py-3 transition-all`}
      onClick={() => handleChangeBot(bot.name)}
    >
      <div className="relative aspect-square w-10 py-2">
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
              d="M270 420V120H300V60H360V120H420V180H480V240H540V300V360V420H480V360V300H420V360V420H360V480H420V540H360H300V480V420H270ZM360 60H420V0H360V60ZM360 240H300V180H360V240Z"
              fill={color}
              filter="url(#colorFilter)"
            />
            <filter id="colorFilter">
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 0.8 0 0 0
                        0 0 0.8 0 0
                        0 0 0 1 0"
              />
            </filter>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M180 0H120V60H180V120H120V180H60V240H0V300V360V420H60V360V300H120V360V420H180V480H120V540H180H240V480V420H270V360V300V240V180V120H240V60H180V0ZM180 180V240H240V180H180Z"
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
              d="M270 420V60H300V0H360V60H420V120H480V180H540V240V300V360V420H480V360H420V420H360V360H300V420H270ZM360 240H420V180H360H300V240H360Z"
              fill={color}
              filter="url(#colorFilter)"
            />
            <filter id="colorFilter">
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 0.8 0 0 0
                        0 0 0.8 0 0
                        0 0 0 1 0"
              />
            </filter>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M180 0H240V60H270V420H240V360H180V420H120V360H60V420H0V360V300V240V180H60V120H120V60H180V0ZM240 240V180H180H120V240H180H240Z"
              fill={color}
            />
          </svg>
        )}
      </div>
      <p className="text-xs font-bold text-white">{isBoss ? "MEGABOT" : title}</p>
      <p className={`${isPositive ? "text-[#78A659]" : "text-[#D2447B]"} text-xs font-bold`}>
        {isPositive ? "+" : "-"}
        {isPositive ? value : -value}%
      </p>
    </button>
  );
};

export default Bot;
