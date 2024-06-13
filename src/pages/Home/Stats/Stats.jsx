import { FaUsers, FaUser, FaLock, FaComments } from "react-icons/fa";
import { motion } from "framer-motion";

const Stats = () => {
    return (
        <div className="text-center p-8">
            <h2 className="font-bold text-4xl mb-8 text-gray-800">The No.1 Trusted Matrimony Site</h2>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md"
                >
                    <div className="icon-container">
                        <motion.div
                            whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0], transition: { duration: 0.3 } }}
                            className="icon"
                        >
                            <FaUsers className="text-5xl text-blue-600" />
                        </motion.div>
                    </div>
                    <h2 className="text-2xl my-4 text-gray-700">Awesome Community</h2>
                    <p className="text-gray-600">Join our platform and become a part of our Awesome Community, where innovation thrives and collaboration knows no bounds!</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md"
                >
                    <div className="icon-container">
                        <motion.div
                            whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0], transition: { duration: 0.3 } }}
                            className="icon"
                        >
                            <FaUser className="text-5xl text-blue-600" />
                        </motion.div>
                    </div>
                    <h2 className="text-2xl my-4 text-gray-700">Million Members</h2>
                    <p className="text-gray-600">Our community has reached a milestone: we now boast a million members!</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md"
                >
                    <div className="icon-container">
                        <motion.div
                            whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0], transition: { duration: 0.3 } }}
                            className="icon"
                        >
                            <FaLock className="text-5xl text-blue-600" />
                        </motion.div>
                    </div>
                    <h2 className="text-2xl my-4 text-gray-700">Private Groups</h2>
                    <p className="text-gray-600">Join exclusive conversations and collaborate within our Private Groups.</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md"
                >
                    <div className="icon-container">
                        <motion.div
                            whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0], transition: { duration: 0.3 } }}
                            className="icon"
                        >
                            <FaComments className="text-5xl text-blue-600" />
                        </motion.div>
                    </div>
                    <h2 className="text-2xl my-4 text-gray-700">Friendly Forums</h2>
                    <p className="text-gray-600">Engage in meaningful discussions and connect with like-minded individuals in our Friendly Forums.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Stats;
