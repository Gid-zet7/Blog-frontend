import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <main className="dash-container" style={{ marginTop: "9rem" }}>
        <Outlet />
        <DashFooter />
      </main>
    </>
  );
};

export default DashLayout;
