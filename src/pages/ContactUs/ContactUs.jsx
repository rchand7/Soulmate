import { motion } from 'framer-motion';
import { Typography, Form, Input, Button } from 'antd';
import Banner from "../../shared/components/Banner/Banner";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactUs = () => {
    const props = { title: "Contact Us", breadCrumb: { startPoint: "Home", endPoint: "Contact Us" } };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                    <Title level={1} className="text-center text-blue-800">Get in Touch with SoulConnect</Title>
                    <Paragraph className="text-center text-lg text-blue-600 mb-6">We are here to assist you. Feel free to reach out to us for any queries, support, or feedback.</Paragraph>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="contact-info flex justify-center items-center bg-blue-50 p-6 rounded-lg shadow-md">
                            <div>
                                <Title level={3} className="text-blue-700">Contact Information</Title>
                                <Paragraph>
                                    <EnvironmentOutlined className="text-blue-700 mr-2" />
                                    <span className="font-bold">Address:</span> 5/25/Ga Outer Stadium, Mymensingh, Bangladesh.
                                </Paragraph>
                                <Paragraph>
                                    <PhoneOutlined className="text-blue-700 mr-2" />
                                    <span className="font-bold">Contact Number:</span> +880 9613-820303
                                </Paragraph>
                                <Paragraph>
                                    <MailOutlined className="text-blue-700 mr-2" />
                                    <span className="font-bold">Email:</span> <a href="mailto:support@soulconnect.com" className="text-blue-700">support@soulconnect.com</a>
                                </Paragraph>
                            </div>
                        </div>
                        <div className="contact-form p-6 bg-blue-50 rounded-lg shadow-md">
                            <Title level={3} className="text-blue-700">Send Us a Message</Title>
                            <Form
                                name="contact"
                                layout="vertical"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Message"
                                    name="message"
                                    rules={[{ required: true, message: 'Please input your message!' }]}
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="mt-4">
                                        Send Message
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default ContactUs;
