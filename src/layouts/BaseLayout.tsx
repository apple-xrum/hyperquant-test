import { Outlet } from "react-router-dom";
import { Header } from "@components";

const BaseLayout = () => {
  return (
    <div className="bg-primary-dark mx-auto flex h-[100dvh] w-full max-w-3xl flex-col">
      <Header />
      <Outlet />
      <nav className="mt-auto">Navbar</nav>
    </div>
  );
};

export default BaseLayout;
