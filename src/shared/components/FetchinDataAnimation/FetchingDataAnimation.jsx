
import loadingGif from "../../../assets/img/essentials/loading.gif"
import PropTypes from 'prop-types'

const FetchingDataAnimation = ({loadingInfo}) => {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <img src={loadingGif} alt="Loading Animation" />
            <p className="text-blue-600 font-bold my-8">Loading Premium {` ${loadingInfo}`} info ...</p>
        </div>
    );
};

FetchingDataAnimation.propTypes = {
    loadingInfo: PropTypes.string,
};

export default FetchingDataAnimation;