import { Bot } from "@components/index.ts";
import { BotType } from "@types";

const bots: BotType[] = [
  {
    name: "yellow_bot",
    cost: 10000,
    "24h": 3.15,
    "7d": 0.065,
    "30d": 4.1,
    "60d": 15.04,
    "90d": 80.25,
    all_time: 126.85,
  },
  {
    name: "white_bot",
    cost: 3800,
    "24h": 1.5,
    "7d": 12.0,
    "30d": 14.15,
    "60d": 46.5,
    "90d": 38.4,
    all_time: 34.82,
  },
  {
    name: "green_bot",
    cost: 4200,
    "24h": 3.33,
    "7d": -17.6,
    "30d": -2.5,
    "60d": 13.0,
    "90d": 25.1,
    all_time: 4.99,
  },
  {
    name: "red_bot",
    cost: 1500,
    "24h": -10.8,
    "7d": 5.5,
    "30d": 11.4,
    "60d": 12.1,
    "90d": 24.36,
    all_time: 71.0,
  },
  {
    name: "blue_bot",
    cost: 7400,
    "24h": -6.5,
    "7d": -4.3,
    "30d": -0.17,
    "60d": 4.32,
    "90d": 6.8,
    all_time: 10.1,
  },
  {
    name: "orange_bot",
    cost: 550,
    "24h": 210.1,
    "7d": 81.3,
    "30d": 90.7,
    "60d": 13.4,
    "90d": -40.6,
    all_time: 98.67,
  },
];

const Bots = () => {
  const currentPeriod = "all_time";
  const currentBot = "yellow_bot";

  return (
    <div className="mb-3 grid grid-cols-3 grid-rows-2 gap-0.5 px-4">
      {bots.map((bot) => (
        <Bot key={bot.name} bot={bot} currentPeriod={currentPeriod} currentBot={currentBot} />
      ))}
    </div>
  );
};

export default Bots;
