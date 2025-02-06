import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const EditBiodata = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();
    const {biodataId} = useParams();

    const [formData, setFormData] = useState({
        biodataType: "",
        name: "",
        profileImageLink: "",
        dateOfBirth: "",
        height: "",
        weight: "",
        age: "",
        occupation: "",
        race: "",
        fathersName: "",
        mothersName: "",
        permanentDivision: "",
        presentDivision: "",
        expectedPartnerAge: "",
        expectedPartnerHeight: "",
        expectedPartnerWeight: "",
        contactEmail: user?.email,
        mobileNumber: "",
        creationDate: "",
        biodataId: biodataId,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Set creationDate to current date and time
        const currentDateTime = new Date().toString();
        const updatedFormData = { ...formData, creationDate: currentDateTime, biodataId: parseInt(biodataId) };

        // Send data to server
        console.log("Form data:", updatedFormData);
        axiosPublic.put(`/data/bio/id/${biodataId}`, updatedFormData)
            .then((res) => {
                console.log("axios response : ", res.data);
                // Showing alert for redirecting to home page
                if (res.data.message === "Biodata updated successfully.") {
                    Swal.fire({
                        title: "Successfully Updated your biodata!!!",
                        text: "Return to Dashboard",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Ok!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/dashboard';
                        }
                    });
                }
            })
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Biodata</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                {/* Biodata Type */}
                <div className="mb-4">
                    <label htmlFor="biodataType" className="block mb-2">Biodata Type</label>
                    <select name="biodataType" id="biodataType" className="w-full border rounded py-2 px-3" onChange={handleChange} required>
                        <option value="">Select Biodata Type</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input type="text" name="name" id="name" className="w-full border rounded py-2 px-3" onChange={handleChange} required/>
                </div>
                {/* Profile Image Link */}
                <div className="mb-4">
                    <label htmlFor="profileImageLink" className="block mb-2">Profile Image Link</label>
                    <input type="text" name="profileImageLink" id="profileImageLink" className="w-full border rounded py-2 px-3" onChange={handleChange} required/>
                </div>
                {/* Date of Birth */}
                <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block mb-2">Date of Birth</label>
                    <input type="date" name="dateOfBirth" id="dateOfBirth" className="w-full border rounded py-2 px-3" onChange={handleChange} required/>
                </div>
                {/* Height */}
                <div className="mb-4">
                    <label htmlFor="height" className="block mb-2">Height</label>
                    <select name="height" id="height" className="w-full border rounded py-2 px-3" onChange={handleChange} required>
                        <option value="">Select Height</option>
                        <option value="5.0">5'0"</option>
                        <option value="5.1">5'1"</option>
                        <option value="5.2">5'2"</option>
                        <option value="5.3">5'3"</option>
                        <option value="5.4">5'4"</option>
                        <option value="5.5">5'5"</option>
                        <option value="5.6">5'6"</option>
                        <option value="5.7">5'7"</option>
                        <option value="5.8">5'8"</option>
                        <option value="5.9">5'9"</option>
                        <option value="5.10">5'10"</option>
                        <option value="5.11">5'11"</option>
                        <option value="6.0">6'0"</option>
                    </select>
                </div>
                {/* Weight */}
                <div className="mb-4">
                    <label htmlFor="weight" className="block mb-2">Weight</label>
                    <select name="weight" id="weight" className="w-full border rounded py-2 px-3" onChange={handleChange} required>
                        <option value="">Select Weight</option>
                        <option value="50kg">50kg</option>
                        <option value="55kg">55kg</option>
                        <option value="60kg">60kg</option>
                        <option value="65kg">65kg</option>
                        <option value="70kg">70kg</option>
                        <option value="75kg">75kg</option>
                        <option value="80kg">80kg</option>
                        <option value="85kg">85kg</option>
                        <option value="90kg">90kg</option>
                    </select>
                </div>
                {/* Age */}
                <div className="mb-4">
                    <label htmlFor="age" className="block mb-2">Age</label>
                    <input type="number" name="age" id="age" className="w-full border rounded py-2 px-3" onChange={handleChange} required/>
                </div>
                {/* Occupation */}
                <div className="mb-4">
                    <label htmlFor="occupation" className="block mb-2">Occupation</label>
                    <select name="occupation" id="occupation" className="w-full border rounded py-2 px-3" onChange={handleChange} required>
                        <option value="">Select Occupation</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Lawyer">Lawyer</option>
                        <option value="Artist">Artist</option>
                        <option value="Business">Business</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                {/* Race */}
                <div className="mb-4">
                    <label htmlFor="race" className="block mb-2">Race</label>
                    <select name="race" id="race" className="w-full border rounded py-2 px-3" onChange={handleChange} required>
                        <option value="">Select Race</option>
                        <option value="Asian">Asian</option>
                        <option value="African">African</option>
                        <option value="Caucasian">Caucasian</option>
                        <option value="Latino">Latino</option>
                    </select>
                </div>
                {/* Fathers Name */}
                <div className="mb-4">
                    <label htmlFor="fathersName" className="block mb-2">Father{"'"}s Name</label>
                    <input type="text" name="fathersName" id="fathersName" className="w-full border rounded py-2 px-3" onChange={handleChange} required/>
                </div>
                {/* Mothers Name */}
                <div className="mb-4">
                    <label htmlFor="mothersName" className="block mb-2">Mother{"'"}s Name</label>
                    <input type="text" name="mothersName" id="mothersName" className="w-full border rounded py-2 px-3" onChange={handleChange} required/>
                </div>
                {/* Permanent Division */}
                <div className="mb-4">
                    <label htmlFor="permanentDivision" className="block mb-2">Permanent Division</label>
                    <select name="permanentDivision" id="permanentDivision" className="w-full border rounded py-2 px-3" onChange={handleChange} required>
                        <option value="">Select Permanent Division</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chattogram">Chattogram</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Maymansign">Maymansign</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                </div>
                {/* Present Division */}
                <div className="mb-4">
                    <label htmlFor="presentDivision" className="block mb-2">Present Division</label>
                    <select name="presentDivision" id="presentDivision" className="w-full border rounded py-2 px-3" onChange={handleChange}required>
                        <option value="">Select Present Division</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chattogram">Chattogram</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Maymansign">Maymansign</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                </div>
                {/* Expected Partner Age */}
                <div className="mb-4">
                    <label htmlFor="expectedPartnerAge" className="block mb-2">Expected Partner Age</label>
                    <input type="number" name="expectedPartnerAge" id="expectedPartnerAge" className="w-full border rounded py-2 px-3" onChange={handleChange} required/>
                </div>
                {/* Expected Partner Height */}
                <div className="mb-4">
                    <label htmlFor="expectedPartnerHeight" className="block mb-2">Expected Partner Height</label>
                    <select name="expectedPartnerHeight" id="expectedPartnerHeight" className="w-full border rounded py-2 px-3" onChange={handleChange} required>
                        <option value="">Select Height</option>
                        <option value="5.0">5'0"</option>
                        <option value="5.1">5'1"</option>
                        <option value="5.2">5'2"</option>
                        <option value="5.3">5'3"</option>
                        <option value="5.4">5'4"</option>
                        <option value="5.5">5'5"</option>
                        <option value="5.6">5'6"</option>
                        <option value="5.7">5'7"</option>
                        <option value="5.8">5'8"</option>
                        <option value="5.9">5'9"</option>
                        <option value="5.10">5'10"</option>
                        <option value="5.11">5'11"</option>
                        <option value="6.0">6'0"</option>
                    </select>
                </div>
                {/* Expected Partner Weight */}
                <div className="mb-4">
                    <label htmlFor="expectedPartnerWeight" className="block mb-2">Expected Partner Weight</label>
                    <select name="expectedPartnerWeight" id="expectedPartnerWeight" className="w-full border rounded py-2 px-3" onChange={handleChange} required>
                        <option value="">Select Weight</option>
                        <option value="50kg">50kg</option>
                        <option value="55kg">55kg</option>
                        <option value="60kg">60kg</option>
                        <option value="65kg">65kg</option>
                        <option value="70kg">70kg</option>
                        <option value="75kg">75kg</option>
                        <option value="80kg">80kg</option>
                        <option value="85kg">85kg</option>
                        <option value="90kg">90kg</option>
                    </select>
                </div>
                {/* Contact Email (User Email Readonly) */}
                <div className="mb-4">
                    <label htmlFor="contactEmail" className="block mb-2">Contact Email</label>
                    <input type="email" name="contactEmail" defaultValue={user.email} id="contactEmail" className="w-full border rounded py-2 px-3" onChange={handleChange} readOnly />
                </div>
                {/* Mobile Number (Required) */}
                <div className="mb-4">
                    <label htmlFor="mobileNumber" className="block mb-2">Mobile Number</label>
                    <input type="number" name="mobileNumber" id="mobileNumber" className="w-full border rounded py-2 px-3" onChange={handleChange} required />
                </div>
                {/* Save and Publish Button */}
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
                    Save and Publish Now
                </button>
            </form>
        </div>
    );
};

export default EditBiodata;
