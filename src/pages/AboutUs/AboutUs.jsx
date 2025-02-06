
import { motion } from 'framer-motion';
import { Typography, Button } from 'antd';
import Banner from "../../shared/components/Banner/Banner";
import logo from "../../assets/img/essentials/logo.png"
import { Link } from 'react-router-dom';
import UseUserAuthInfo from '../../hooks/UseUserAuthInfo';

const { Title, Paragraph } = Typography;

const AboutUs = () => {
    const props = { title: "About Us", breadCrumb: { startPoint: "Home", endPoint: "About Us" } };
    const { user } = UseUserAuthInfo();

    return (
        <>
            <div>
                <Banner props={props} />
            </div>
            <div className="container mx-auto p-8 my-12 bg-gradient-to-r from-blue-50 to-blue-200 rounded-lg shadow-xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Title level={1} className="text-center text-blue-800">Welcome to SoulConnect</Title>
                    <Paragraph className="text-center text-lg text-blue-600 mb-6">Connecting hearts, building futures, and celebrating love through a Shariah-based matrimonial platform.</Paragraph>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className='flex justify-center items-center'>
                            <img src={logo} alt="SoulConnect" className="w-full rounded-lg shadow-md" />
                        </div>
                        <div>
                            <Title level={3} className="text-blue-700">Our Mission</Title>
                            <Paragraph>At SoulConnect, we believe that marriage is a sacred bond and a vital Sunnah of the Prophet (ﷺ). Our mission is to facilitate this noble tradition by providing a platform that aligns with Islamic values and principles. We strive to make the process of finding a life partner easy, respectful, and enriching for all our users.</Paragraph>
                            <Title level={3} className="text-blue-700">Why Choose SoulConnect?</Title>
                            <Paragraph>We understand the challenges of modern life and the importance of finding a compatible partner who shares your values and beliefs. SoulConnect is designed to address these needs by offering:</Paragraph>
                            <ul className="list-disc pl-5 text-blue-700">
                                <li>Secure and private matchmaking</li>
                                <li>Profiles verified for authenticity</li>
                                <li>User-friendly interface with advanced search options</li>
                                <li>Guidance and support based on Islamic principles</li>
                            </ul>
                            <Title level={3} className="text-blue-700 mt-4">Join Us Today</Title>
                            <Paragraph>Embark on your journey to find a life partner with SoulConnect. We are here to support you every step of the way, ensuring your experience is positive and fruitful. Sign up now and become part of our growing community dedicated to building meaningful connections.</Paragraph>
                            {
                                user ?
                                        <Link to="/biodatas"><Button type="primary" size="large" className="mt-4">View Biodatas</Button></Link> 
                                        :
                                        <Link to="/signup"><Button type="primary" size="large" className="mt-4">Get Started</Button></Link> 
                                
                            }
                        </div>
                    </div>
                    <div className="contact-details mt-12 p-6 bg-blue-50 rounded-lg shadow-md">
                        <Title level={2} className="text-blue-800">Contact Details</Title>
                        <Paragraph><span className="font-bold">Address:</span> Greater Noida,UP</Paragraph>
                        <Paragraph><span className="font-bold">Trade License No:</span> 2021-02693</Paragraph>
                        <Paragraph><span className="font-bold">Contact Number:</span> +91 8076708261</Paragraph>
                        <Paragraph><span className="font-bold">Email:</span> <a href="mailto:thakurarjun5956@gmail.com" className="text-blue-700">thakurarjun5956@gmail.com</a></Paragraph>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default AboutUs;
