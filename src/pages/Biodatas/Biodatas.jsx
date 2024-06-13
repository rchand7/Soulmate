import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import MembersCard from "../../shared/components/MembersCard/MembersCard";
import Banner from "../../shared/components/Banner/Banner";
import FetchingDataAnimation from "../../shared/components/FetchinDataAnimation/FetchingDataAnimation";
import FetchingErrorAnimation from "../../shared/components/FetchingErrorAnimation/FetchingErrorAnimation";

const fetchBiodatas = async (axiosPublic) => {
    const res = await axiosPublic.get("/biodatas");
    return res.data;
};

const Biodatas = () => {
    const axiosPublic = UseAxiosPublic();
    const [ageRange, setAgeRange] = useState([18, 60]);
    const [gender, setGender] = useState("");
    const [division, setDivision] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const props = { title: "Biodatas", breadCrumb: { startPoint: "Home", endPoint: "Biodatas" } };

    const { data: biodatas = [], isLoading, isError } = useQuery({
        queryKey: ['biodatas'],
        queryFn: () => fetchBiodatas(axiosPublic),
    });

    const [filteredBiodatas, setFilteredBiodatas] = useState([]);

    useEffect(() => {
        setFilteredBiodatas(biodatas);
    }, [biodatas]);

    const handleFilter = () => {
        let filtered = biodatas;

        if (ageRange) {
            filtered = filtered.filter(bio => Number(bio.age) >= ageRange[0] && Number(bio.age) <= ageRange[1]);
        }
        if (gender) {
            filtered = filtered.filter(bio => bio.biodataType.toLowerCase() === gender.toLowerCase());
        }
        if (division) {
            filtered = filtered.filter(bio => bio.permanentDivision === division || bio.presentDivision === division);
        }

        setFilteredBiodatas(filtered);
    };

    useEffect(() => {
        handleFilter();
    }, [ageRange, gender, division]);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const currentBiodatas = filteredBiodatas.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <div>
                <Banner props={props} />
            </div>
            <div className="my-12">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-4xl font-bold text-blue-600">
                    View all biodatas
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center text-xl font-bold pt-4 text-blue-600">
                    Total biodata found: {filteredBiodatas.length}
                </motion.p>
            </div>
            <div className="container mx-auto grid gap-8 grid-cols-1 lg:grid-cols-5">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border border-blue-600 rounded-xl p-8 col-span-1 lg:col-span-1 w-full bg-blue-50">
                    <h2 className="text-2xl font-bold mb-4 text-blue-600">Filter</h2>
                    <div className="mb-4">
                        <label className="block font-bold mb-2 text-blue-600">Age Range</label>
                        <div className="flex flex-col justify-center items-center">
                            <span className="text-blue-600">{ageRange[0]}</span>
                            <input
                                type="range"
                                min="18"
                                max="60"
                                value={ageRange[0]}
                                onChange={(e) => setAgeRange([Number(e.target.value), ageRange[1]])}
                                className="w-full mb-2 accent-blue-600"
                            />
                            <input
                                type="range"
                                min="18"
                                max="60"
                                value={ageRange[1]}
                                onChange={(e) => setAgeRange([ageRange[0], Number(e.target.value)])}
                                className="w-full accent-blue-600"
                            />
                            <span className="text-blue-600">{ageRange[1]}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2 text-blue-600">Biodata Type</label>
                        <div className="space-y-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="Male"
                                    checked={gender === "Male"}
                                    onChange={() => setGender("Male")}
                                    className="form-radio text-blue-600"
                                />
                                <span className="ml-2 text-blue-600">Male</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="Female"
                                    checked={gender === "Female"}
                                    onChange={() => setGender("Female")}
                                    className="form-radio text-blue-600"
                                />
                                <span className="ml-2 text-blue-600">Female</span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2 text-blue-600">Division</label>
                        <select
                            value={division}
                            onChange={(e) => setDivision(e.target.value)}
                            className="w-full border rounded p-2 text-blue-600 border-blue-600 bg-white"
                        >
                            <option value="">Select a division</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattogram">Chattogram</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Maymansign">Maymansign</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border border-blue-600 bg-blue-50 rounded-xl col-span-1 lg:col-span-4 p-8 grid  gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {isLoading && (
                        <div className=" col-span-3">
                            <FetchingDataAnimation loadingInfo={"Biodata"} />
                        </div>
                    )}
                    {isError && (
                        <div className=" col-span-3">
                            <FetchingErrorAnimation loadingInfo={"Biodata"} />
                        </div>
                    )}
                    {!isLoading && !isError && currentBiodatas.map(bioData => (
                        <MembersCard key={bioData.biodataId} bioData={bioData} />
                    ))}
                </motion.div>
            </div>
            <div className="mt-8 flex justify-center">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredBiodatas.length}
                    onChange={handlePageChange}
                    showSizeChanger
                    pageSizeOptions={['20', '40', '60']}
                />
            </div>
        </div>
    );
};

export default Biodatas;