import MenuIcon from "@assets/header/hamburger.svg";
import RefrashIcon from "@assets/header/refresh.svg";

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-4 py-8">
      <button className="aspect-square w-7">
        <img src={MenuIcon} alt="Menu Icon" />
      </button>
      <h1 className="text-primary-light text-xl font-bold">Dashboard</h1>
      <button className="ani aspect-square w-7">
        <img src={RefrashIcon} alt="Refrash Icon" className="rotate-70" />
      </button>
    </header>
  );
};

export default Header;
