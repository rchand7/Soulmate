import { useEffect, useState } from "react";
import SuccessStoryCard from "../../../shared/components/SuccessStoryCard/SuccessStoryCard";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";
import { message } from "antd";
import Marquee from "react-fast-marquee";

const SuccessStory = () => {
    const [successStories, setSuccessStories] = useState([]);
    const axiosPublic = UseAxiosPublic();

    useEffect(() => {
        axiosPublic.get("/success-stories")
            .then(res => {
                setSuccessStories(res.data);
            })
            .catch(error => {
                message.error("Failed to load success stories");
                console.error("Error loading success stories:", error);
            });
    }, [axiosPublic]);

    return (
        <div>
            <h2 className="text-center text-4xl font-bold">Soul Connect Success Story</h2>
            <p className="text-center text-xl font-bold py-8">They met on Soul Connect and they are now Soul Mates</p>
            <Marquee direction="left" pauseOnHover={true} className="gap-8 py-4" speed={30}>
                <div className="flex gap-8">
                    {successStories.map(successStory => (
                        <SuccessStoryCard successStory={successStory} key={successStory._id} />
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default SuccessStory;
