import Hero from "./Hero/Hero";
import Stats from "./Stats/Stats";
import Advice from "./Advice/Advice";
import PremiumMembers from "./PremiumMembers/PremiumMembers";
import HowItWorks from "./HowItWorks/HowItWorks";
import SuccessCounter from "./SuccessCounter/SuccessCounter";
import SuccessStory from "./SuccessStory/SuccessStory";

const Home = () => {
    return (
        <div>
            <Hero />
            <div className=" my-24 container mx-auto ">
                <Stats />
            </div>
            <div className=" my-24 ">
                <Advice />
            </div>
            <div className=" my-24 container mx-auto ">
                <PremiumMembers />
            </div>
            <div className=" my-24 ">
                <HowItWorks />
            </div>
            <div className=" my-24 container mx-auto ">
                <SuccessCounter />
            </div>
            <div className=" my-24 ">
                <SuccessStory />
            </div>
        </div>
    );
};

export default Home;