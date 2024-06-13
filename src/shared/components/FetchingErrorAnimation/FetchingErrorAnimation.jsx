import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import loadingGif from "../../../assets/img/essentials/error.png";

const glitchEffect = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
        opacity: [1, 0.8, 1, 0.8, 1],
        x: [0, -10, 10, -10, 0],
        y: [0, -10, 10, -10, 0],
        rotate: [0, 10, -10, 10, 0],
        scale: [1, 1.1, 1, 1.1, 1],
        transition: {
            duration: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
        }
    }
};

const FetchingErrorAnimation = ({ loadingInfo }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <motion.img
                className="w-36 h-36"
                src={loadingGif}
                alt="Error Animation"
                variants={glitchEffect}
                initial="initial"
                animate="animate"
            />
            <p className="text-red-600 font-bold my-8">
                Connection Time Out, Failed to fetch {` ${loadingInfo} `} !!!
            </p>
        </div>
    );
};

FetchingErrorAnimation.propTypes = {
    loadingInfo: PropTypes.string,
};

export default FetchingErrorAnimation;
