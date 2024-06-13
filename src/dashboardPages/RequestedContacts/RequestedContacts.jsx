import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Swal from 'sweetalert2';
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import UseUserAuthInfo from "../../hooks/UseUserAuthInfo";

const RequestedContacts = () => {
    const axiosPublic = UseAxiosPublic();
    const { userMail } = UseUserAuthInfo();
    const [requestedContacts, setRequestedContacts] = useState([]);

    // loading all biodata from same email
    useEffect(() => {
        axiosPublic.get(`requests/${userMail}`)
            .then(res => {
                setRequestedContacts(res.data);
            })
    }, [axiosPublic, userMail]);

    // handle delete button with confirmation dialog
    const handleDelete = (biodataId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this requested contact?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/payments/${biodataId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'The requested contact has been deleted.',
                                'success'
                            );
                            setRequestedContacts(requestedContacts.filter(contact => contact._id !== biodataId));
                        } else {
                            Swal.fire(
                                'Error!',
                                'There was an error deleting the requested contact.',
                                'error'
                            );
                        }
                    })
                    .catch(err => {
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the requested contact.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'The requested contact was not deleted.',
                    'error'
                );
            }
        });
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">View All Of Your Requested Contacts</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Biodata Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestedContacts.map((requestedContact) => (
                            <tr key={requestedContact._id} className=" odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {requestedContact.name}
                                </th>
                                <td className="px-6 py-4">
                                    {requestedContact.biodataId}
                                </td>
                                <td className="px-6 py-4">
                                    {requestedContact.status}
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        requestedContact.status === "pending" ? "pending request" : requestedContact.mobileNumber
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        requestedContact.status === "pending" ? "pending request" : requestedContact.contactEmail
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/biodata/${requestedContact.biodataId}`}>
                                        <Button type="primary" ghost className="font-medium mr-4 text-blue-500 hover:underline">View</Button>
                                    </Link>
                                    <Button onClick={() => handleDelete(requestedContact._id)} type="primary" danger ghost className="font-medium text-blue-500 hover:underline">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedContacts;