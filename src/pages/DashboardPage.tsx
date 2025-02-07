import { Balance, Bots, DashboardChart, TimeRange } from "@components";
import { useEffect, useState } from "react";
import { useLazyGetDataQuery } from "@store/api/api.ts";
import { useAppDispatch } from "@store/hooks.ts";
import { setBots } from "@store/bots/slice/bots.slice.ts";
import { setBalance } from "@store/balance/slice/balance.slice.ts";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [trigger, { data, isFetching, isError }] = useLazyGetDataQuery();

  useEffect(() => {
    const cachedData = localStorage.getItem("dashboardData");

    if (cachedData) {
      const data = JSON.parse(cachedData);
      const { trading_capital, trading_capital_currency, balance, on_hold, bots } = data;
      dispatch(setBalance({ trading_capital, trading_capital_currency, balance, on_hold }));
      dispatch(setBots(bots));
      setIsLoading(false);
    } else {
      trigger();
    }
  }, [dispatch, trigger]);

  useEffect(() => {
    if (data) {
      const { trading_capital, trading_capital_currency, balance, on_hold, bots } = data;
      dispatch(setBalance({ trading_capital, trading_capital_currency, balance, on_hold }));
      dispatch(setBots(bots));
      localStorage.setItem("dashboardData", JSON.stringify(data));
      setIsLoading(false);
    }
  }, [data, dispatch]);

  if (isLoading || isFetching)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-primary-light text-5xl font-bold">Загрузка...</h1>
        <p className="text-primary-light mt-4 text-xl">Пожалуйста, подождите</p>
        <div className="mt-8">
          <div className="border-t-primary-light aspect-square w-10 animate-spin rounded-full border-8 border-white"></div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-primary-light text-5xl font-bold">Ошибка</h1>
        <p className="text-primary-light mt-4 text-xl">
          Что-то пошло не так. Пожалуйста, попробуйте позже.
        </p>
      </div>
    );

  return (
    <>
      <Balance />
      <DashboardChart />
      <Bots />
      <TimeRange />
    </>
  );
};

export default DashboardPage;
