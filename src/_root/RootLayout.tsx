import Bottombar from "@/components/Shared/Bottombar";
import LeftSide from "@/components/Shared/LeftSide";
import Topbar from "@/components/Shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSide />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
