import { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";

const SuccessStory = () => {
    const axiosPublic = UseAxiosPublic();
    const [stories, setStories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);

    useEffect(() => {
        axiosPublic.get('/success-stories')
            .then(res => {
                setStories(res.data);
            });
    }, [axiosPublic]);

    const handleViewStory = (story) => {
        setSelectedStory(story);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedStory(null);
    };

    const columns = [
        {
            title: 'Male Biodata ID',
            dataIndex: 'selfBiodataId',
            key: 'selfBiodataId',
        },
        {
            title: 'Female Biodata ID',
            dataIndex: 'partnerBiodataId',
            key: 'partnerBiodataId',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => handleViewStory(record)}>
                    View Story
                </Button>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
            <Table columns={columns} dataSource={stories} rowKey="_id" />
            <Modal
                title="Success Story"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
            >
                {selectedStory && (
                    <div>
                        <p><strong>Male Biodata ID:</strong> {selectedStory.selfBiodataId}</p>
                        <p><strong>Female Biodata ID:</strong> {selectedStory.partnerBiodataId}</p>
                        <p><strong>Story:</strong> {selectedStory.successStoryReview}</p>
                        <div className="flex justify-center gap-8">
                            <img src={selectedStory.boyImageLink} alt="Male" className="w-24 h-24 rounded-lg mx-2" />
                            <img src={selectedStory.girlImageLink} alt="Female" className="w-24 h-24 rounded-lg mx-2" />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default SuccessStory;