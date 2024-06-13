
import { NavLink } from "react-router-dom";
import UseUserAuthInfo from "../../../hooks/UseUserAuthInfo";
import { Divider } from "antd";

const LeftSidebar = () => {
    const { userMail, userRole } = UseUserAuthInfo();
    const style = ({ isActive }) => {
        return isActive
            ? {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                border: "2px solid white",
                color: "#ffffff",
                fontWeight: "bold",
                margin: "16px 0",
                padding: "12px 20px",
                transition: "all 0.3s ease",
                textDecoration: "none",
            }
            : {
                backgroundColor: "transparent",
                borderRadius: "8px",
                border: "2px solid transparent",
                color: "#ffffff",
                fontWeight: "normal",
                margin: "16px 0",
                padding: "12px 20px",
                transition: "all 0.3s ease",
                textDecoration: "none",
            };
    };

    return (
        <div className="bg-blue-600 md:min-h-screen md:h-full p-4">
            <ul className="text-start space-y-2">
                {/* Admin only */}
                {
                    userRole === "admin" &&
                    <>
                        <li>
                            <NavLink to="manage" className="w-full block" style={style}>
                                Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="approvedPremium" className="w-full block" style={style}>
                                Approve Premium
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="approvedContactRequest" className="w-full block" style={style}>
                                Approved Contact Request
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="successStory" className="w-full block" style={style}>
                                Success Story
                            </NavLink>
                        </li>
                        <Divider className="bg-white" />
                    </>
                }
                <li>
                    <NavLink to={`viewBiodata/${userMail}`} className="w-full block" style={style}>
                        View Biodata
                    </NavLink>
                </li>
                <li>
                    <NavLink to="myRequest" className="w-full block" style={style}>
                        My Contact Request
                    </NavLink>
                </li>
                <li>
                    <NavLink to="favoriteBiodata" className="w-full block" style={style}>
                        Favorite Biodata
                    </NavLink>
                </li>
                <li>
                    <NavLink to="gotMarried" className="w-full block" style={style}>
                        Got Married
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default LeftSidebar;
