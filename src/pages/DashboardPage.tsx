import { Balance, Bots, DashboardChart, TimeRange } from "@components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("rerender");
  }, [location]);

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
