import { useEffect, useState } from "react";
import { Button, message } from "antd";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";

const ApprovedPremium = () => {
    const axiosPublic = UseAxiosPublic();
    const [allPremiumRequests, setAllPremiumRequests] = useState([]);

    // loading all premium biodata requests
    useEffect(() => {
        axiosPublic.get(`/premium-biodata-requests`)
            .then(res => {
                setAllPremiumRequests(res.data);
            });
    }, [axiosPublic]);

    // console.log(allPremiumRequests);

    // Function to handle approving premium request
    const handleApprovePremium = async (biodataId) => {
        // console.log("biodataId",biodataId);
        try {
            axiosPublic.patch(`premium-biodata-requests/biodata/${biodataId}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data?.modifiedCount > 0) {
                        message.success("Premium biodata request status updated to approved.");
                        // patch biodata 
                        axiosPublic.patch(`/biodatas/biodata/${biodataId}`, {requestedPremium: "approved", biodataStatus: "premium"});
                        // Refetch all premium requests after updating payment status
                        axiosPublic.get(`/premium-biodata-requests`)
                            .then(res => {
                                setAllPremiumRequests(res.data);
                            });
                    }
                })
        } catch (error) {
            message.error("Failed to update premium biodata request status.");
            console.error("Error updating premium biodata request status:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Make Biodata Premium</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase  bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Biodata Id</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPremiumRequests.map((requestedBiodata) => (
                            <tr key={requestedBiodata._id} className=" odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {requestedBiodata.name}
                                </th>
                                <td className="px-6 py-4">
                                    {requestedBiodata.email}
                                </td>
                                <td className="px-6 py-4">
                                    {requestedBiodata.biodataId}
                                </td>
                                <td className="px-6 py-4">
                                    {requestedBiodata.status === "pending" ? (
                                        <Button
                                            type="primary"
                                            ghost
                                            onClick={() => handleApprovePremium(requestedBiodata.biodataId)}
                                            className="mr-4"
                                        >
                                            Make Premium
                                        </Button>
                                    ) : (
                                        <Button type="primary" className="mr-4">
                                            Approved
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedPremium;