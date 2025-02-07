import Coin from "@assets/balance/coin.png";
import { useAppSelector } from "@store/hooks.ts";

const Balance = () => {
  const { trading_capital, trading_capital_currency, balance, on_hold } = useAppSelector(
    (state) => state.balance
  );

  return (
    <div className="mb-8 flex items-end justify-between px-4">
      <div className="pb-1">
        <p className="text-primary-light font-bold">TRADING CAPITAL</p>
        <p className="flex gap-x-1 text-4xl text-white">
          <span>{trading_capital}</span>{" "}
          <span className="uppercase">{trading_capital_currency}</span>
        </p>
      </div>
      <div>
        <p className="text-primary-light flex justify-between gap-x-2 font-bold">
          <span>BALANCE:</span>
          <span className="flex items-center gap-x-1">
            <span className="text-white">{balance}</span>
            <img className="h-5 w-5" src={Coin} alt="coin" />
          </span>
        </p>
        <p className="text-primary-light flex justify-between gap-x-2 font-bold">
          <span>ON HOLD:</span>
          <span className="flex items-center gap-x-1">
            <span className="text-white">{on_hold}</span>
            <img className="h-5 w-5" src={Coin} alt="coin" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default Balance;
