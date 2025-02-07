import { Outlet } from "react-router-dom";
import { Header, Navbar } from "@components";

const BaseLayout = () => {
  return (
    <div className="bg-primary-dark mx-auto flex h-dvh max-h-dvh w-full max-w-3xl flex-col">
      <Header />
      <section className="no-scrollbar flex-grow overflow-auto">
        <Outlet />
      </section>
      <Navbar />
    </div>
  );
};

export default BaseLayout;
