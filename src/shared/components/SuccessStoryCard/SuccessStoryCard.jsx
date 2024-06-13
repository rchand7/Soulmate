import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Rate } from 'antd';
import { motion } from 'framer-motion';

const SuccessStoryCard = ({ successStory }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const limitReview = (review) => {
        const words = review.split(' ');
        const limitedWords = words.slice(0, 20);
        return limitedWords.join(' ');
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    return (
        <motion.div
            className="border border-blue-600 rounded-lg shadow-lg flex flex-col w-96"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
        >
            <div className="flex justify-center items-center h-40 rounded-t-lg bg-gradient-to-r from-indigo-600 via-sky-500 to-blue-500">
                <div className="text-center">
                    <div className='flex gap-4'>
                    <img className="rounded-full h-24 w-24 my-4" src={successStory.boyImageLink} alt="boy" />
                    <img className="rounded-full h-24 w-24 my-4" src={successStory.girlImageLink} alt="girl" />
                    </div>
                    <h2 className=" font-bold text-white">Bless These Happy Couples</h2>
                </div>
            </div>

            <div className="border border-solid border-blue-300 rounded-b-lg m-8">
                <table className="w-full">
                    <tbody>
                        <tr className="border-b border-solid border-gray-300">
                            <td className="border-r border-solid border-gray-300 p-2">Marriage Date</td>
                            <td className="p-2">{successStory.marriageDate}</td>
                        </tr>
                        <tr className="border-b border-solid border-gray-300">
                            <td className="border-r border-solid border-gray-300 p-2">Rating</td>
                            <td className="p-2">
                                <Rate disabled defaultValue={successStory.reviewStarCount} />
                            </td>
                        </tr>
                        <tr className="border-b border-solid border-gray-300">
                            <td className="border-r border-solid border-gray-300 p-2">Success Story</td>
                            <td className="p-2">{limitReview(successStory.successStoryReview)}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="p-2 text-center cursor-pointer text-blue-500" onClick={showModal}>View Full Story</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Modal
                title="Full Success Story"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleOk}
                footer={null}
            >
                <p>{successStory.successStoryReview}</p>
            </Modal>
        </motion.div>
    );
};

SuccessStoryCard.propTypes = {
    successStory: PropTypes.object.isRequired,
};

export default SuccessStoryCard;