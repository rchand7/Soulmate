import { Parallax } from "react-parallax";
import bgImg from "../../../assets/img/home/homeBannerBg.png";
import { Link } from "react-router-dom";
import { Button } from "antd";
import UseUserAuthInfo from "../../../hooks/UseUserAuthInfo";

const Hero = () => {
    const { user } = UseUserAuthInfo();
    return (
        <>
            <div className="h-screen flex flex-col">
                <Parallax
                    className="flex-grow flex justify-center items-center px-10"
                    bgImage={bgImg}
                    bgImageAlt="Hero img"
                    strength={500}
                    bgImageStyle={{ height: '100%', maxWidth: '100%' }}
                >
                    <div className="text-white text-center">
                        <h3 className="text-3xl font-roboto">#1 matrimony app</h3>
                        <h2 className="text-6xl font-bold font-playfair my-3"> Make a Real Connection</h2>
                        <p>Start meeting singles who are ready to commit today.</p>
                        {
                            user ? <Link to="/biodatas"><Button type='primary' className="rounded-full my-3">Find Now</Button></Link>
                            :
                            <Link to="/signup"><Button type='primary' className="rounded-full my-3">Find Now</Button></Link>
                        }
                    </div>
                </Parallax>
                <div className="bg-blue-600 h-54 py-8 -mt-14 z-10 text-center text-white flex flex-col justify-center items-center">
                    <h2 className="text-5xl font-bold my-3">Start searching your perfect match.</h2>
                    <p>Soul Connect : Your ultimate destination to find life partners</p>
                </div>
            </div>
        </>
    );
};

export default Hero;
