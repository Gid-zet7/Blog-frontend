import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <main className="dash-container">
        <Outlet />
        <DashFooter />
      </main>
    </>
  );
};

export default DashLayout;
