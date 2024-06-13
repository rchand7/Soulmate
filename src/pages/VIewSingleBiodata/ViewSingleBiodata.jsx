import { Button, Card } from "antd";
import { FaHeart } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import { useEffect, useState } from "react";
import UseUserAuthInfo from "../../hooks/UseUserAuthInfo";
import MembersCard from "../../shared/components/MembersCard/MembersCard";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Banner from "../../shared/components/Banner/Banner";

const ViewSingleBiodata = () => {
    const axiosPublic = UseAxiosPublic();
    const { userSubscription, userMail } = UseUserAuthInfo();
    const [biodata, setBiodata] = useState({});
    const [similarBios, setSimilarBios] = useState([]);
    const [requestedContacts, setRequestedContacts] = useState([]);
    const { biodataId } = useParams();

    useEffect(() => {
        axiosPublic.get(`/biodatas/biodata/${biodataId}`)
            .then(res => {
                setBiodata(res.data[0]);
                axiosPublic.get(`/biodatas/similar/${res.data[0].biodataType}`)
                    .then(res => {
                        setSimilarBios(res.data);
                    });
            });
    }, [axiosPublic, biodataId]);

    useEffect(() => {
        axiosPublic.get(`requests/${userMail}`)
            .then(res => {
                setRequestedContacts(res.data);
            });
    }, [axiosPublic, userMail]);

    const hasRequestedContact = requestedContacts.some(request => request.biodataId === parseInt(biodataId));

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getRandomBios = (bios) => {
        const shuffledBios = shuffleArray([...bios]);
        return shuffledBios.slice(0, 3);
    };

    const {
        biodataType,
        name,
        profileImageLink,
        dateOfBirth,
        height,
        weight,
        age,
        occupation,
        race,
        fathersName,
        mothersName,
        permanentDivision,
        presentDivision,
        expectedPartnerAge,
        expectedPartnerHeight,
        expectedPartnerWeight,
        contactEmail,
        mobileNumber,
        creationDate
    } = biodata;

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
                        const alreadyExists = favorites.some(fav => fav.biodataId === parseInt(biodataId));
                        if (alreadyExists) {
                            Swal.fire(
                                'Already Exists!',
                                'This biodata is already in your favorites.',
                                'warning'
                            );
                        } else {
                            axiosPublic.post("/favouriteBiodata", { biodataId: parseInt(biodataId), addedBy: userMail, name: name, occupation: occupation, permanentDivision: permanentDivision })
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

    const props = { title: "View Complete Biodata", breadCrumb: { startPoint: "Home", middlePoint: "biodatas", endPoint: `BiodataId: ${biodataId}` } };

    return (
        <div>
            <div>
                <Banner props={props} />
            </div>
            <div className="container mx-auto my-24">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border border-blue-600 rounded-lg shadow-lg flex flex-col w-full"
                >
                    <div className="flex justify-center items-center h-40 rounded-lg bg-gradient-to-r from-indigo-600 from-10% via-sky-500 via-60% to-blue-500 to-90% relative">
                        <div>
                            <img className="rounded-full h-24 w-24" src={profileImageLink} alt="profile image" />
                            <h2 className="my-4 font-bold text-white">Biodata ID : {biodataId}</h2>
                        </div>
                        <div>
                            <Button onClick={addToFavorite} className="inline-flex justify-center items-center rounded-full absolute top-2 right-2" icon={<FaHeart />}></Button>
                        </div>
                    </div>

                    <Card className="m-8" bordered={false}>
                        <table className="w-full">
                            <tbody>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Biodata Type</td>
                                    <td className="p-2">{biodataType}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Name</td>
                                    <td className="p-2">{name}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Date of Birth</td>
                                    <td className="p-2">{dateOfBirth}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Height</td>
                                    <td className="p-2">{height}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Weight</td>
                                    <td className="p-2">{weight}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Age</td>
                                    <td className="p-2">{age}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Occupation</td>
                                    <td className="p-2">{occupation}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Race</td>
                                    <td className="p-2">{race}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Father's Name</td>
                                    <td className="p-2">{fathersName}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Mother's Name</td>
                                    <td className="p-2">{mothersName}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Permanent Division</td>
                                    <td className="p-2">{permanentDivision}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Present Division</td>
                                    <td className="p-2">{presentDivision}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Expected Partner Age</td>
                                    <td className="p-2">{expectedPartnerAge}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Expected Partner Height</td>
                                    <td className="p-2">{expectedPartnerHeight}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Expected Partner Weight</td>
                                    <td className="p-2">{expectedPartnerWeight}</td>
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Contact Email</td>
                                    {
                                        userSubscription === "premium" ? <td className="p-2">{contactEmail}</td> : 
                                        <td className="p-2">
                                            {hasRequestedContact ? (
                                                <Button disabled>Information Requested</Button>
                                            ) : (
                                                <Link to={`/biodata/${biodataId}/checkout`}>
                                                    <Button>Request Information</Button>
                                                </Link>
                                            )}
                                        </td>
                                    }
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Mobile Number</td>
                                    {
                                        userSubscription === "premium" ? <td className="p-2">{mobileNumber}</td> : 
                                        <td className="p-2">
                                            {hasRequestedContact ? (
                                                <Button disabled>Information Requested</Button>
                                            ) : (
                                                <Link to={`/biodata/${biodataId}/checkout`}>
                                                    <Button>Request Information</Button>
                                                </Link>
                                            )}
                                        </td>
                                    }
                                </tr>
                                <tr className="border-b border-solid border-gray-300">
                                    <td className="border-r border-solid border-gray-300 p-2">Creation Date</td>
                                    <td className="p-2">{creationDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </motion.div>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-8">
                    <h2 className="text-3xl font-bold text-center">You May Like Also</h2>
                </div>
                <div className="container mx-auto py-8 grid gap-8 grid-cols-1 lg:grid-cols-3">
                    {
                        getRandomBios(similarBios).map(bioData => (
                            <motion.div
                                key={bioData.biodataId}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <MembersCard bioData={bioData}></MembersCard>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ViewSingleBiodata;