import MenuIcon from "@assets/header/hamburger.svg";
import RefreshIcon from "@assets/header/refresh.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "@constants/menu.ts";
import { useState } from "react";

const Header = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentItem = menuItems.find((item) => item.path === location.pathname);

  const handleRefresh = () => {
    setIsRefreshing(true);
    navigate(currentItem?.path || "dashboard");
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <header className="glow flex w-full items-center justify-between px-4 py-6">
      <button className="aspect-square w-7 cursor-pointer">
        <img src={MenuIcon} alt="Menu Icon" />
      </button>
      <h1 className="text-primary-light text-xl font-bold">{currentItem?.name || "Error Page"}</h1>
      <button
        className="aspect-square w-7 cursor-pointer"
        onClick={handleRefresh}
        disabled={isRefreshing}
      >
        <img
          src={RefreshIcon}
          alt="Refrash Icon"
          className={`rotate-70 transition-transform ${isRefreshing && "animate-spin"}`}
        />
      </button>
    </header>
  );
};

export default Header;
