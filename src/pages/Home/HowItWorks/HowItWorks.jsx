import { Card } from 'antd';
import { motion } from 'framer-motion';

const steps = [
    {
        title: "SignUp",
        description: "First you need to sign up on soul connect, Then you can create your own biodata or view detailed bio data informations",
    },
    {
        title: "Add or select Biodata",
        description: "After a successful sign up you can be able to add or select biodata with your logged in account",
    },
    {
        title: "Request Contact",
        description: "If you like any biodata you can add them to favorite or ask admin for their contact by exchanging a small pay",
    },
    {
        title: "Confirm Marriage",
        description: "If you both liked each other you can send marriage proposal and with your mutual confirmation we can add you our marriage confirmed database.",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
};

const HowItWorks = () => {
    return (
        <div className="bg-gray-100 py-8">
            <h2 className="text-center text-4xl font-bold mb-8">How It Works</h2>
            <p className="text-center text-xl font-semibold mb-16">We have a very simple working process please go through</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="flex justify-center"
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        variants={cardVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <Card
                            className="w-full relative shadow-lg"
                            style={{
                                background: 'linear-gradient(to right, #4f46e5, #0ea5e9, #3b82f6)',
                                color: '#ffffff',
                                padding: '24px',
                                borderRadius: '16px',
                            }}
                            headStyle={{ display: 'none' }}
                        >
                            <div className="rounded-full w-12 h-12 bg-white border-[4px] border-blue-600 flex justify-center items-center absolute -top-6 text-blue-600 font-bold">
                                {index + 1}
                            </div>
                            <h2 className="font-bold text-3xl text-center mb-4">{step.title}</h2>
                            <p className="text-blue-600 bg-white rounded-lg p-8 mt-8 text-center" style={{ color: '#4f46e5' }}>
                                {step.description}
                            </p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
