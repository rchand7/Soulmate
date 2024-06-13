import { Button, Tooltip } from "antd";
import PropTypes from 'prop-types';
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";
import UseUserAuthInfo from "../../../hooks/UseUserAuthInfo";
import Swal from "sweetalert2";

const MembersCard = ({ bioData }) => {
    const axiosPublic = UseAxiosPublic();
    const { userMail, user } = UseUserAuthInfo();

    const { profileImageLink, biodataId, biodataType, permanentDivision, age, occupation, name } = bioData;

    const addToFavorite = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to add this biodata to your favorites?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, add it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.get(`/favouriteBiodata/${userMail}`)
                    .then(res => {
                        const favorites = res.data;
                        const alreadyExists = favorites.some(fav => fav.biodataId === biodataId);
                        if (alreadyExists) {
                            Swal.fire(
                                'Already Exists!',
                                'This biodata is already in your favorites.',
                                'warning'
                            );
                        } else {
                            axiosPublic.post("/favouriteBiodata", { biodataId: biodataId, addedBy: userMail, name: name, occupation: occupation, permanentDivision: permanentDivision })
                                .then(res => {
                                    if (res.data.insertedId) {
                                        Swal.fire(
                                            'Added!',
                                            'The biodata has been added to your favorites.',
                                            'success'
                                        );
                                    } else {
                                        Swal.fire(
                                            'Error!',
                                            'There was an error adding the biodata to your favorites.',
                                            'error'
                                        );
                                    }
                                })
                                .catch(error => {
                                    Swal.fire(
                                        'Error!',
                                        'There was an error adding the biodata to your favorites.',
                                        'error'
                                    );
                                });
                        }
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error!',
                            'There was an error fetching your favorites.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'The biodata was not added to your favorites.',
                    'error'
                );
            }
        });
    };

    return (
        <div className="border border-blue-600 rounded-lg shadow-lg flex flex-col w-full">
            <div className="flex justify-center items-center h-40 rounded-lg bg-gradient-to-r from-indigo-600 from-10% via-sky-500 via-60% to-blue-500 to-90% relative">
                <div>
                    <img className="rounded-full h-24 w-24" src={profileImageLink} alt="profile image" />
                    <h2 className="my-4 font-bold text-white">Biodata ID : {biodataId}</h2>
                </div>
                <div>
                    {user ? (
                        <Button onClick={addToFavorite} className="inline-flex justify-center items-center rounded-full absolute top-2 right-2" icon={<FaHeart />}></Button>
                    ) : (
                        <Tooltip title="Please log in to add to favorites">
                            <Button disabled className="inline-flex justify-center items-center rounded-full absolute top-2 right-2" icon={<FaHeart />}></Button>
                        </Tooltip>
                    )}
                </div>
            </div>

            <div className="border border-solid border-blue-300 rounded-lg mt-8 mx-8">
                <table className="w-full">
                    <tbody>
                        <tr className="border-b border-solid border-gray-300">
                            <td className="border-r border-solid border-gray-300 p-2">BiodataType</td>
                            <td className="p-2">{biodataType}</td>
                        </tr>
                        <tr className="border-b border-solid border-gray-300">
                            <td className="border-r border-solid border-gray-300 p-2">PermanentDivision name</td>
                            <td className="p-2">{permanentDivision}</td>
                        </tr>
                        <tr className="border-b border-solid border-gray-300">
                            <td className="border-r border-solid border-gray-300 p-2">Age</td>
                            <td className="p-2">{age}</td>
                        </tr>
                        <tr>
                            <td className="border-r border-solid border-gray-300 p-2">Occupation</td>
                            <td className="p-2">{occupation}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center my-8">
                <Link to={`/biodata/${biodataId}`}>
                    <Button className="bg-gradient-to-r from-indigo-600 from-10% via-sky-500 via-60% to-blue-500 to-90% text-white">View Details</Button>
                </Link>
            </div>
        </div>
    );
};

MembersCard.propTypes = {
    bioData: PropTypes.object,
}

export default MembersCard;