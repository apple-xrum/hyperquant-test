import Coin from "@assets/balance/coin.png";

const Balance = () => {
  return (
    <div className="flex items-end justify-between px-4">
      <div className="pb-1">
        <p className="text-primary-light font-bold">TRADING CAPITAL</p>
        <p className="flex gap-x-1 text-4xl text-white">
          <span>3.081</span> <span className="uppercase">eth</span>
        </p>
      </div>
      <div>
        <p className="text-primary-light flex justify-between gap-x-2 font-bold">
          <span>BALANCE:</span>
          <p className="flex items-center gap-x-1">
            <span className="text-white">14630</span>
            <img className="h-5 w-5" src={Coin} alt="coin" />
          </p>
        </p>
        <p className="text-primary-light flex justify-between gap-x-2 font-bold">
          <span>ON HOLD:</span>
          <p className="flex items-center gap-x-1">
            <span className="text-white">8300</span>
            <img className="h-5 w-5" src={Coin} alt="coin" />
          </p>
        </p>
      </div>
    </div>
  );
};

export default Balance;
