import { useEffect, useState } from "react";
import { Button, message } from "antd";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";
import Swal from 'sweetalert2';

const ApprovedContactRequest = () => {
    const axiosPublic = UseAxiosPublic();
    const [allPremiumRequests, setAllPremiumRequests] = useState([]);

    // loading all users
    useEffect(() => {
        axiosPublic.get(`/payments`)
            .then(res => {
                setAllPremiumRequests(res.data);
            });
    }, [axiosPublic]);

    const handleApprove = async (id, name) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to approve contact request for ${name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        });

        if (result.isConfirmed) {
            try {
                await axiosPublic.patch(`/payments/confirm/${id}`);
                message.success("Contact request approved.");
                // Refetch all premium requests after updating payment status
                axiosPublic.get(`/payments`)
                    .then(res => {
                        setAllPremiumRequests(res.data);
                    });
                // send confirmed payments to db
                axiosPublic.post("/approved/payment/details", {paymentCreated: name, paidAmount: parseInt(5)});
            } catch (error) {
                message.error("Failed to approve contact request.");
                console.error("Error approving contact request:", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Give Access to Requested Contacts</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
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
                                    {requestedBiodata.status === "approved" ? (
                                        <Button type="primary" className="bg-green-500">Approved</Button>
                                    ) : (
                                        <Button
                                            type="primary"
                                            ghost
                                            onClick={() => handleApprove(requestedBiodata._id, requestedBiodata.name)}
                                        >
                                            Approve Contact Request
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

export default ApprovedContactRequest;