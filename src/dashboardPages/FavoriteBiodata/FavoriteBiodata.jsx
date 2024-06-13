import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Swal from 'sweetalert2';
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import UseUserAuthInfo from "../../hooks/UseUserAuthInfo";

const FavoriteBiodata = () => {
    const axiosPublic = UseAxiosPublic();
    const { userMail } = UseUserAuthInfo();
    const [favoriteBiodatas, setFavoriteBiodatas] = useState([]);

    // loading all biodata from same email
    useEffect(() => {
        axiosPublic.get(`/favouriteBiodata/${userMail}`)
            .then(res => {
                setFavoriteBiodatas(res.data);
            });
    }, [axiosPublic, userMail]);

    // handle delete button with confirmation dialog
    const handleDelete = (biodataId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this biodata from your favorites?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/favouriteBiodata/${biodataId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'The biodata has been deleted from your favorites.',
                                'success'
                            );
                            setFavoriteBiodatas(favoriteBiodatas.filter(biodata => biodata._id !== biodataId));
                        } else {
                            Swal.fire(
                                'Error!',
                                'There was an error deleting the biodata from your favorites.',
                                'error'
                            );
                        }
                    })
                    .catch(err => {
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the biodata from your favorites.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'The biodata was not deleted from your favorites.',
                    'error'
                );
            }
        });
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">View All Of Favorite Biodatas</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Biodata ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Permanent Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Occupation
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            favoriteBiodatas.map((favoriteBiodata) => (
                                <tr key={favoriteBiodata._id} className=" odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                        {favoriteBiodata.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {favoriteBiodata.biodataId}
                                    </td>
                                    <td className="px-6 py-4">
                                        {favoriteBiodata.permanentDivision}
                                    </td>
                                    <td className="px-6 py-4">
                                        {favoriteBiodata.occupation}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to={`/biodata/${favoriteBiodata.biodataId}`}>
                                            <Button type="primary" ghost className="font-medium mr-4 text-blue-500 hover:underline">View</Button>
                                        </Link>
                                        <Button onClick={() => handleDelete(favoriteBiodata._id)} type="primary" danger ghost className="font-medium text-blue-500 hover:underline">Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FavoriteBiodata;