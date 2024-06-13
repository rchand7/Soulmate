import { FaHeart } from "react-icons/fa6";
import PropTypes from 'prop-types'


const Banner = ({props}) => {
    const { title, breadCrumb } = props;
    return (
        <div className="bg-gray-900">
            <div className="h-1 bg-gradient-to-r from-indigo-600 from-10% via-sky-500 via-60% to-blue-500 to-90%">

            </div>
            <div className="flex flex-col justify-center items-center py-24 space-y-4">
                <h3 className="text-white inline-flex justify-center items-center gap-2">{breadCrumb.startPoint} {breadCrumb?.middlePoint && (`/${breadCrumb.middlePoint}`)} <FaHeart/> {breadCrumb.endPoint} </h3>
                <h2 className="text-white text-7xl font-bold">{title}</h2>
            </div>
        </div>
    );
};

Banner.propTypes = {
    props: PropTypes.object,
    title: PropTypes.string,
    breadCrumb: PropTypes.object,
};

export default Banner;