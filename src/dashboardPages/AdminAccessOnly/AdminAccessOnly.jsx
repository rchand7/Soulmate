
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/img/essentials/error.png';
import backgroundImage from '../../assets/img/essentials/background.png';

const AdminAccessOnly = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
            <img src={backgroundImage} alt="Background" className="absolute inset-0 h-full w-full object-cover z-0" />
            <div className="absolute inset-0 bg-blue-900 opacity-60 z-10"></div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center relative z-20"
            >
                <motion.img 
                    src={errorImage} 
                    alt="Error" 
                    className=" h-96 mx-auto mb-8 rounded drop-shadow-md transform hover:scale-105 transition-transform duration-500"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                />
                <h1 className="text-6xl font-bold text-white mb-4">Oops!</h1>
                <p className="text-xl text-white mb-6">Looks like your are lacking Admin Access.</p>
                <Link to="/dashboard">
                    <Button type="primary" size="large" className="mt-4 bg-blue-700 hover:bg-blue-600 border-none">
                        Return to Dashboard
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
};

export default AdminAccessOnly;