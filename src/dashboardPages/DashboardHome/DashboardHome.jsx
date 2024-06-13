
import { Link } from "react-router-dom";
import UseUserAuthInfo from "../../hooks/UseUserAuthInfo";
import { Button } from "antd";
import UseBiodataCounts from "../../hooks/UseBiodataCounts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { HiUserGroup } from "react-icons/hi";
import { FaFemale, FaMale } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardHome = () => {
    const { userMail, userName, userRole, userPhoto, userSubscription } = UseUserAuthInfo();
    const { totalCount, maleCount, femaleCount, premiumCount, totalRevenue } = UseBiodataCounts();
    const data = {
        labels: ['Total Biodata', 'Male Biodata', 'Female Biodata', 'Premium Biodata', 'Total Revenue'],
        datasets: [
            {
                label: 'Count: ',
                data: [totalCount, maleCount, femaleCount, premiumCount, totalRevenue],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container mx-auto p-4">
            {/* admin only */}
            {
                userRole === "admin" &&
                <div>
                    <div className="container mx-auto h-96 shadow-lg rounded-lg py-8 bg-blue-100">
                        <Pie className="mx-auto w-full" data={data} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
                        <div className="flex flex-col shadow-xl border border-blue-600 h-28 rounded-lg overflow-hidden">
                            <div className="flex-grow">
                                <div className="p-2 bg-blue-100">
                                    <h2 className=" text-gray-500 ">Total Biodata</h2>
                                    <div>
                                        <div className="flex items-center gap-4 my-4">
                                            <HiUserGroup className="text-4xl text-red-300" /> <h2 className="text-3xl text-blue-600">{totalCount}</h2>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" h-4 bg-gradient-to-r from-indigo-600 from-10% via-sky-500 via-60% to-blue-500 to-90%">

                            </div>
                        </div>
                        <div className="flex flex-col shadow-xl border border-blue-600 h-28 rounded-lg overflow-hidden">
                            <div className="flex-grow">
                                <div className="p-2 bg-blue-100">
                                    <h2 className=" text-gray-500 ">Total Male Biodata</h2>
                                    <div>
                                        <div className="flex items-center gap-4 my-4">
                                            <FaMale className="text-4xl text-blue-400" /> <h2 className="text-3xl text-blue-600">{maleCount}</h2>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" h-4 bg-gradient-to-r from-indigo-600 from-10% via-sky-500 via-60% to-blue-500 to-90%">

                            </div>
                        </div>
                        <div className="flex flex-col shadow-xl border border-blue-600 h-28 rounded-lg overflow-hidden">
                            <div className="flex-grow">
                                <div className="p-2 bg-blue-100">
                                    <h2 className=" text-gray-500 ">Total Female Biodata</h2>
                                    <div>
                                        <div className="flex items-center gap-4 my-4">
                                            <FaFemale className="text-4xl text-yellow-400" /> <h2 className="text-3xl text-blue-600">{femaleCount}</h2>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" h-4 bg-gradient-to-r from-indigo-600 from-10% via-sky-500 via-60% to-blue-500 to-90%">

                            </div>
                        </div>
                        <div className="flex flex-col shadow-xl border border-blue-600 h-28 rounded-lg overflow-hidden">
                            <div className="flex-grow">
                                <div className="p-2 bg-blue-100">
                                    <h2 className=" text-gray-500 ">Total Premium Biodata</h2>
                                    <div>
                                        <div className="flex items-center gap-4 my-4">
                                            <MdWorkspacePremium className="text-4xl text-green-300" /> <h2 className="text-3xl text-blue-600">{premiumCount}</h2>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" h-4 bg-gradient-to-r from-indigo-600 from-10% via-sky-500 via-60% to-blue-500 to-90%">

                            </div>
                        </div>
                        <div className="flex flex-col shadow-xl border border-blue-600 h-28 rounded-lg overflow-hidden">
                            <div className="flex-grow">
                                <div className="p-2 bg-blue-100">
                                    <h2 className=" text-gray-500 ">Total Revenue</h2>
                                    <div>
                                        <div className="flex items-center gap-4 my-4">
                                            <FaMoneyBillTrendUp className="text-4xl text-violet-300" /> <h2 className="text-3xl text-blue-600">{totalRevenue}</h2>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" h-4 bg-gradient-to-r from-indigo-600 from-10% via-sky-500 via-60% to-blue-500 to-90%">

                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Side: User Information Card */}
                <div className="lg:col-span-1 bg-blue-100 rounded-lg shadow-xl p-6 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                        <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{userName}</h2>
                    <p className="text-gray-600 my-4">{`User Role: ${userRole}`}</p>
                    <p className="text-gray-600 mb-4">{`User Type: ${userSubscription}`}</p>
                    {
                        userSubscription === "regular" && <Button className="font-medium text-blue-500 hover:underline">Request Premium</Button>
                    }
                </div>

                {/* Right Side: Content and Buttons */}
                <div className="lg:col-span-3 bg-blue-100 rounded-lg shadow-xl p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Biodatas</h1>
                    <p className="text-gray-600 mb-4">Here you can manage your biodatas.</p>
                    <div className="flex space-x-4">
                        <Link to="createBiodata">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
                                Create Biodata
                            </button>
                        </Link>
                        <Link to={`viewBiodata/${userMail}`}>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
                                View Biodata
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
