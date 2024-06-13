import { useContext, useState } from 'react';
import logo from "../../../assets/img/essentials/favicon.png";
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaPowerOff, FaSignInAlt } from 'react-icons/fa';

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logOutUser } = useContext(AuthContext);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const style = ({ isActive }) => {
        return isActive
            ? {
                backgroundColor: "transparent",
                border: "none",
                color: "#3182ce",
                fontWeight: "bold",
            }
            : {
                backgroundColor: "transparent",
                border: "none",
                color: "#ffffff",
                fontWeight: "normal",
            };
    };

    const navLinks = <>
        <li>
            <div className='flex gap-4 items-center my-2 md:my-0'>
                <NavLink style={style}>{`Hi, ${user? user?.displayName : "Welcome Back"}`}</NavLink>
                {
                    user? 
                    <Button className=' inline-flex justify-center items-center' onClick={() => logOutUser()} type='primary' icon={<FaPowerOff />}>Log Out</Button>
                    :
                    <Link to="/signin"><Button className=' inline-flex justify-center items-center' onClick={() => logOutUser()} type='primary' icon={<FaSignInAlt />}>Sign In</Button></Link>
                }
            </div>
        </li>
    </>;

    return (
        <nav className=" border-gray-200 bg-gray-900">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                <a href="/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="SoulConnect Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">SoulConnect</span>
                </a>
                <div className="md:hidden">
                    <button
                        onClick={handleToggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                        aria-controls="mega-menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div id="mega-menu" className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                        {navLinks}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Menu;
