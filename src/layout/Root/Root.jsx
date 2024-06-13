import { Outlet } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar/Navbar';
import Footer from '../../shared/components/Footer/Footer';

const Root = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;