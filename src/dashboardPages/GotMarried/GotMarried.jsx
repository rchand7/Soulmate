import { useState } from 'react';
import { motion } from 'framer-motion';
import { DatePicker, Input, Rate } from 'antd';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import Swal from 'sweetalert2';
import moment from 'moment';

const { TextArea } = Input;

const GotMarried = () => {
    const axiosPublic = UseAxiosPublic();

    // State to manage form data
    const [formData, setFormData] = useState({
        selfBiodataId: "",
        partnerBiodataId: "",
        boyImageLink: "",
        girlImageLink: "",
        successStoryReview: "",
        marriageDate: moment(),
        reviewStarCount: 1
    });

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send form data to the server
        axiosPublic.post("/success-stories", formData)
            .then((res) => {
                console.log("Success story added:", res.data);
                // Handle success, like showing a success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Success story added!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Redirect to dashboard after successful submission
                    window.location.href = '/dashboard';
                });
            })
            .catch((error) => {
                console.error("Error adding success story:", error);
                // Handle error, like showing an error message
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add success story!',
                    confirmButtonText: 'OK'
                });
            });
    };

    // Function to handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle marriage date change
    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            marriageDate: date
        });
    };

    // Function to handle review star count change
    const handleStarCountChange = (value) => {
        setFormData({
            ...formData,
            reviewStarCount: value
        });
    };

    return (
        <motion.div
            className=" my-8 mx-8 p-4 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Share Your Success Story</h2>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {/* Self Biodata ID */}
                <div className="mb-4">
                    <label htmlFor="selfBiodataId" className="block mb-2 font-bold">Your Biodata ID</label>
                    <Input 
                        type="text" 
                        name="selfBiodataId" 
                        id="selfBiodataId" 
                        onChange={handleChange} 
                        required 
                        className="w-full border rounded py-2 px-3" 
                    />
                </div>
                {/* Partner Biodata ID */}
                <div className="mb-4">
                    <label htmlFor="partnerBiodataId" className="block mb-2 font-bold">Partner Biodata ID</label>
                    <Input 
                        type="text" 
                        name="partnerBiodataId" 
                        id="partnerBiodataId" 
                        onChange={handleChange} 
                        required 
                        className="w-full border rounded py-2 px-3" 
                    />
                </div>
                {/* Boy's Image Link */}
                <div className="mb-4">
                    <label htmlFor="boyImageLink" className="block mb-2 font-bold">Boy's Image Link</label>
                    <Input 
                        type="text" 
                        name="boyImageLink" 
                        id="boyImageLink" 
                        onChange={handleChange} 
                        required 
                        className="w-full border rounded py-2 px-3" 
                    />
                </div>
                {/* Girl's Image Link */}
                <div className="mb-4">
                    <label htmlFor="girlImageLink" className="block mb-2 font-bold">Girl's Image Link</label>
                    <Input 
                        type="text" 
                        name="girlImageLink" 
                        id="girlImageLink" 
                        onChange={handleChange} 
                        required 
                        className="w-full border rounded py-2 px-3" 
                    />
                </div>
                {/* Marriage Date */}
                <div className="mb-4">
                    <label htmlFor="marriageDate" className="block mb-2 font-bold">Marriage Date</label>
                    <DatePicker
                        value={formData.marriageDate}
                        onChange={handleDateChange}
                        className="w-full border rounded py-2 px-3"
                        required
                    />
                </div>
                {/* Review Star Count */}
                <div className="mb-4">
                    <label htmlFor="reviewStarCount" className="block mb-2 font-bold">Review Star Count</label>
                    <Rate 
                        onChange={handleStarCountChange} 
                        value={formData.reviewStarCount} 
                        required 
                    />
                </div>
                {/* Success Story Review */}
                <div className="mb-4">
                    <label htmlFor="successStoryReview" className="block mb-2 font-bold">Success Story Review</label>
                    <TextArea 
                        name="successStoryReview" 
                        id="successStoryReview" 
                        rows={4} 
                        onChange={handleChange} 
                        required 
                        className="w-full border rounded py-2 px-3" 
                    />
                </div>
                {/* Submit Button */}
                <motion.button
                    type="submit"
                    className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-500 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Submit
                </motion.button>
            </form>
        </motion.div>
    );
};

export default GotMarried;