import { Outlet } from "react-router-dom";
import Menu from "../../shared/dashboardComponents/Menu/Menu";
import DashboardFooter from "../../shared/dashboardComponents/DashboardFooter/DashboardFooter";
import LeftSidebar from "../../shared/dashboardComponents/LeftSidebar/LeftSidebar";

const Dashboard = () => {
    return (
        <div>
            <Menu />
            <div className="grid grid-cols-1 md:grid-cols-5">
                <div>
                    <LeftSidebar />
                </div>
                <div className=" col-span-4 ">
                    <Outlet />
                </div>
            </div>
            <DashboardFooter />
        </div>
    );
};

export default Dashboard;