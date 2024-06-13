import { Button, Divider } from "antd";
import { FaFacebook, FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-gray-900 text-white mt-24">
            <div className="container mx-auto">
                <div className="flex justify-center items-center -translate-y-8">
                    <h3 className="bg-blue-600 w-fit p-6 rounded-xl">Free support: +880 178 698 004   |   Email: md.sabbiralmamon@gmail.com</h3>
                </div>
                <div className="flex justify-evenly gap-8 text-center items-center lg:items-start lg:text-start flex-col lg:flex-row">
                    <div>
                        <h2 className="mb-4 font-bold text-xl">Get in touch</h2>
                        <p>Address: 49 Mohakhali, Dhaka-1212</p>
                        <p>Phone: +880 1798 698 004</p>
                        <p>Email: md.sabbiralmamon@gmail.com</p>
                    </div>
                    <div>
                        <h2 className="mb-4 font-bold text-xl">Help and Support</h2>
                        <p>About</p>
                        <p>company</p>
                        <p>Contact us</p>
                        <p>Feedback</p>
                        <p>FAQs</p>
                        <p>Testimonials</p>
                    </div>
                    <div>
                        <h2 className="mb-4 font-bold text-xl">Follow us on</h2>
                        <Button type="primary" shape="circle" icon={<FaGoogle />} />
                        <Button className="mx-4" type="primary" shape="circle" icon={<FaTwitter />} />
                        <Button className="mr-4" type="primary" shape="circle" icon={<FaFacebook />} />
                        <Button type="primary" shape="circle" icon={<FaLinkedin />} />
                    </div>
                </div>
                <Divider className="bg-blue-300" />
                <div className="flex justify-center items-center">
                    <h3 className="text-center">Soul Connect - Trusted by over thousands of Boys & Girls for successful marriage.</h3>
                </div>
                <div className="flex justify-center items-center">
                    <p>Copyright © 2023 Soul Connect All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;