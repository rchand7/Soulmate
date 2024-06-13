import { FaFacebook, FaTwitter } from "react-icons/fa";

const DashboardFooter = () => {
    return (
        <div className="bg-gray-900 text-white">
            <div className="container mx-auto">
                <div className="flex justify-center items-center py-4">
                    <h3 className="text-center">Soul Connect - Trusted by over thousands of Boys & Girls for successful marriage.</h3>
                </div>
                <div className="flex justify-center items-center gap-4 p-4">
                    <FaFacebook /> <FaTwitter />
                </div>
                <div className="flex justify-center items-center pb-4">
                    <p>Copyright © 2023 Soul Connect All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardFooter;