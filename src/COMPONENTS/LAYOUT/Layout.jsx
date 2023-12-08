import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-full w-full relative">
      <Outlet />
    </div>
  );
};

export default Layout;
