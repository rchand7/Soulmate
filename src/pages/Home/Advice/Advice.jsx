import { Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import avatar from "../../../assets/img/home/avatar.png";
import { useState } from "react";

const Advice = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const openVideo = () => {
        setIsVideoOpen(true);
    };

    const closeVideo = () => {
        setIsVideoOpen(false);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100">
            <div>
                <motion.iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/M-ChCl2_6uc?si=MgLeEu28Rd6N4Ek1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onClick={openVideo}
                ></motion.iframe>
            </div>
            <div className="flex justify-center items-center">
                <div className="py-8">
                    <h2 className="text-center text-4xl font-bold">Explore Matching Advices</h2>
                    <p className="text-center text-xl font-bold py-8">Be calm. Be kind. Be yourself.</p>
                    <div className="flex items-start gap-2.5">
                        <motion.img
                            className="w-8 h-8 rounded-full"
                            src={avatar}
                            alt="default avatar image"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-blue-600">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="text-sm font-semibold text-white">SoulConnect Ai</span>
                                <span className="text-sm font-normal text-gray-200">11:46</span>
                            </div>
                            <p className="text-sm font-normal py-2.5 text-white">Hello, I{"'"}m SoulConnect and I{"'"}m the helper AI for you. What are your preferences?</p>
                            <span className="text-sm font-normal text-gray-200">Delivered</span>
                        </div>
                    </div>
                    <div>
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                            <Button type='primary' className="rounded-full my-3 w-full">Men</Button>
                        </motion.div>
                    </div>
                    <div>
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                            <Button type='primary' className="rounded-full my-3 w-full">Women</Button>
                        </motion.div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/watch?v=dmWeUL_J-oI"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></motion.iframe>
                        <button
                            className="absolute top-4 right-4 text-white text-2xl"
                            onClick={closeVideo}
                        >
                            &#x2715;
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Advice;
