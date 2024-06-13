import { useState, useEffect } from 'react';
import { Card, Statistic } from 'antd';
import { motion } from 'framer-motion';
import UseBiodataCounts from '../../../hooks/UseBiodataCounts';

const SuccessCounter = () => {
    const { totalCount, maleCount, femaleCount, totalMarriageCount } = UseBiodataCounts();

    const [counts, setCounts] = useState({
        totalCount: 0,
        maleCount: 0,
        femaleCount: 0,
        totalMarriageCount: 0,
    });

    useEffect(() => {
        setCounts({ totalCount, maleCount, femaleCount, totalMarriageCount });
    }, [totalCount, maleCount, femaleCount, totalMarriageCount]);

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        hover: { scale: 1.05 },
    };

    const gradientBackground = {
        background: 'linear-gradient(to right, #4f46e5, #0ea5e9, #3b82f6)',
        color: '#ffffff',
    };

    return (
        <div className="container mx-auto my-24">
            <h2 className="text-center text-4xl font-bold mb-8">Biodata Stats</h2>
            <p className="text-center text-xl font-semibold mb-16">
                We are delighted to share our data that we have successfully completed:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <motion.div
                    className="flex justify-center"
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={cardVariants}
                    transition={{ duration: 0.5 }}
                >
                    <Card
                        className="w-full"
                        title="Total Biodata"
                        bordered={false}
                        headStyle={gradientBackground}
                        bodyStyle={{ backgroundColor: '#f0f5ff', textAlign: 'center' }}
                    >
                        <Statistic
                            value={counts.totalCount}
                            valueStyle={{ color: '#1890ff', fontSize: '2.5rem' }}
                        />
                    </Card>
                </motion.div>
                <motion.div
                    className="flex justify-center"
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={cardVariants}
                    transition={{ duration: 0.5 }}
                >
                    <Card
                        className="w-full"
                        title="Girls Biodata"
                        bordered={false}
                        headStyle={gradientBackground}
                        bodyStyle={{ backgroundColor: '#f0f5ff', textAlign: 'center' }}
                    >
                        <Statistic
                            value={counts.femaleCount}
                            valueStyle={{ color: '#1890ff', fontSize: '2.5rem' }}
                        />
                    </Card>
                </motion.div>
                <motion.div
                    className="flex justify-center"
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={cardVariants}
                    transition={{ duration: 0.5 }}
                >
                    <Card
                        className="w-full"
                        title="Boys Biodata"
                        bordered={false}
                        headStyle={gradientBackground}
                        bodyStyle={{ backgroundColor: '#f0f5ff', textAlign: 'center' }}
                    >
                        <Statistic
                            value={counts.maleCount}
                            valueStyle={{ color: '#1890ff', fontSize: '2.5rem' }}
                        />
                    </Card>
                </motion.div>
                <motion.div
                    className="flex justify-center"
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={cardVariants}
                    transition={{ duration: 0.5 }}
                >
                    <Card
                        className="w-full"
                        title="Total Marriage"
                        bordered={false}
                        headStyle={gradientBackground}
                        bodyStyle={{ backgroundColor: '#f0f5ff', textAlign: 'center' }}
                    >
                        <Statistic
                            value={counts.totalMarriageCount}
                            valueStyle={{ color: '#1890ff', fontSize: '2.5rem' }}
                        />
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default SuccessCounter;
