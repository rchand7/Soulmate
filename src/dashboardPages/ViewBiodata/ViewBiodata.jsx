import { useEffect, useState } from "react";
import UseUserAuthInfo from "../../hooks/UseUserAuthInfo";
import { Button } from "antd";
import { Link } from "react-router-dom";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const ViewBiodata = () => {

    const axiosSecure = UseAxiosSecure();
    const { userMail } = UseUserAuthInfo();

    const [biodatas, setBiodatas] = useState([]);

    // loading all biodata from same email
    useEffect(() => {
        axiosSecure.get(`/biodatas/${userMail}`)
            .then(res => {
                setBiodatas(res.data);
            })
    }, [axiosSecure, userMail]);

    // console.log(biodatas);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">View All Of Your Created Biodata</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Biodata ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Biodata Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Owner
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created at
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            biodatas.map((biodata) => <tr key={biodata.biodataId} className=" odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {biodata.biodataId}
                                </th>
                                <td className="px-6 py-4">
                                    {biodata.biodataStatus}
                                </td>
                                <td className="px-6 py-4">
                                    <img src={biodata.profileImageLink} alt={biodata.name} className="w-12 h-12 rounded-lg" />
                                </td>
                                <td className="px-6 py-4">
                                    {biodata.creationDate}
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        biodata.biodataStatus === "regular" ? (
                                            biodata?.requestedPremium === "pending" ? (
                                                <Button type="primary" ghost danger className="mr-8">
                                                    Pending Request
                                                </Button>
                                            ) : (
                                                <Link to={`biodata/${biodata.biodataId}`}>
                                                    <Button type="primary" ghost className="mr-8">
                                                        Request Premium
                                                    </Button>
                                                </Link>
                                            )
                                        ) : biodata.biodataStatus === "premium" && (
                                            <Button type="primary" className="mr-8 bg-green-500">
                                                Approved
                                            </Button>
                                        )
                                    }
                                    <Link to={`/dashboard/editBiodata/${biodata.biodataId}`} className="font-medium text-blue-500 hover:underline mr-8">Edit</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewBiodata;