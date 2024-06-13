import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";
import MembersCard from "../../../shared/components/MembersCard/MembersCard";
import { motion } from 'framer-motion';
import loadingGif from "../../../assets/img/essentials/loading.gif"
import loadingFaildImg from "../../../assets/img/essentials/error.png"

const fetchPremiumBiodatas = async (axiosPublic) => {
    const res = await axiosPublic.get("/biodatas/get-premium/biodata");
    return res.data;
};

const PremiumMembers = () => {
    const axiosPublic = UseAxiosPublic();
    const [sortOrder, setSortOrder] = useState("ascending");
    const [visibleCount, setVisibleCount] = useState(6);

    const { data: premiumBiodatas = [], isLoading, isError } = useQuery({
        queryKey: ['premiumBiodatas'],
        queryFn: () => fetchPremiumBiodatas(axiosPublic),
    });

    const sortBiodatas = (order) => {
        return [...premiumBiodatas].sort((a, b) => {
            if (order === "ascending") {
                return a.age - b.age;
            } else {
                return b.age - a.age;
            }
        });
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
        hover: { scale: 1.05 },
    };

    const sortedBiodatas = sortBiodatas(sortOrder).slice(0, visibleCount);

    if (isLoading) {
        return <div className=" w-full flex flex-col justify-center items-center">
            <h2 className="text-center text-4xl font-bold">Meet Our Latest Premium Members</h2>
            <p className="text-center text-xl font-bold py-8">We are happy to share our happy clients profiles.</p>
            <img src={loadingGif} alt="Loading Animation" />
            <p className="text-blue-600 font-bold my-8">Loading Premium Biodata info ...</p>
        </div>;
    }

    if (isError) {
        return <div className=" w-full flex flex-col justify-center items-center">
            <h2 className="text-center text-4xl font-bold">Meet Our Latest Premium Members</h2>
            <p className="text-center text-xl font-bold py-8">We are happy to share our happy clients profiles.</p>
            <img className=" h-24 w-24 " src={loadingFaildImg} alt="Loading Animation" />
            <p className="text-red-600 font-bold my-8">Connection Time Out, Failed to fetch data !!!</p>
        </div>;
    }

    return (
        <div>
            <h2 className="text-center text-4xl font-bold">Meet Our Latest Premium Members</h2>
            <p className="text-center text-xl font-bold py-8">We are happy to share our happy clients profiles.</p>
            <div className="flex justify-between items-center mb-8 container mx-auto px-4">
                <div>
                    <span className="text-lg font-semibold">Viewing {sortedBiodatas.length} out of {premiumBiodatas.length}</span>
                </div>
                <div>
                    <label className="text-lg font-semibold mr-2" htmlFor="sortOrder">Sort by Age:</label>
                    <select id="sortOrder" value={sortOrder} onChange={handleSortChange} className="border p-2 rounded">
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
            </div>
            <div className="container mx-auto mb-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    sortedBiodatas.map(bioData => (
                        <motion.div
                            key={bioData.biodataId}
                            className="flex justify-center"
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            variants={cardVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <MembersCard key={bioData.biodataId} bioData={bioData}></MembersCard>
                        </motion.div>)
                    )
                }
            </div>
            {visibleCount < premiumBiodatas.length && (
                <div className="flex justify-center">
                    <button
                        onClick={handleLoadMore}
                        className="bg-blue-500 text-white px-4 py-2 rounded">
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default PremiumMembers;