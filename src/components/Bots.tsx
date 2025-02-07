import { Bot } from "@components/index.ts";
import { useAppSelector } from "@store/hooks.ts";

const Bots = () => {
  const { currentBot, bots } = useAppSelector((state) => state.bots);
  const { currentPeriod } = useAppSelector((state) => state.period);

  if (!currentBot || !currentPeriod) return null;

  return (
    <div className="mb-3 grid auto-rows-auto grid-cols-3 gap-0.5 px-4">
      {bots.map((bot) => (
        <Bot key={bot.name} bot={bot} currentPeriod={currentPeriod} currentBot={currentBot} />
      ))}
    </div>
  );
};

export default Bots;
