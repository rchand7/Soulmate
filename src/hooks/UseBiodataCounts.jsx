import { useEffect, useState } from "react";
import UseAxiosPublic from "./UseAxiosPublic";

const UseBiodataCounts = () => {
    const axiosPublic = UseAxiosPublic();
    const [counts, setCounts] = useState({
        totalCount: 0,
        maleCount: 0,
        femaleCount: 0,
        premiumCount: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const biodataRes = await axiosPublic.get("/biodata/counts");
                const revenueRes = await axiosPublic.get("/approved/payment/details");
                
                setCounts({
                    totalCount: biodataRes.data.totalCount,
                    totalMarriageCount: biodataRes.data.totalMarriageCount,
                    maleCount: biodataRes.data.maleCount,
                    femaleCount: biodataRes.data.femaleCount,
                    premiumCount: biodataRes.data.premiumCount,
                    totalRevenue: revenueRes.data.totalRevenue,
                });
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [axiosPublic]);

    const { totalCount, maleCount, femaleCount, premiumCount, totalRevenue, totalMarriageCount } = counts;

    const biodataCounts = { totalCount, maleCount, femaleCount, premiumCount, totalRevenue, totalMarriageCount };

    return biodataCounts;
};

export default UseBiodataCounts;
