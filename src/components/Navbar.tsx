import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "@constants/menu.ts";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex w-full items-stretch justify-between bg-[#232C3E] px-2">
      {menuItems.map((item) => (
        <button
          key={item.path}
          className={`${location.pathname === item.path ? "text-white" : "text-primary-light"} cursor-pointer p-2 text-sm`}
          onClick={() => navigate(item.path)}
        >
          <div className="relative mx-auto aspect-square w-7">
            <item.icon />
            {item.path === "/profile" && (
              <div className="absolute -top-2.5 -right-2.5 flex aspect-square w-5 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-white">
                3
              </div>
            )}
          </div>
          <p className="text-xs">{item.name}</p>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
