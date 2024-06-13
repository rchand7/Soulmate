import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import PropTypes from 'prop-types'
import { Navigate, useLocation } from "react-router-dom";
import loadingGif from "../assets/img/essentials/loading.gif";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
  
    if (loading) {
      return (
          <div className=" h-screen w-full flex justify-center items-center">
              <img src={loadingGif} alt="Loading Animation" />
          </div>
      );
    }
  
    if (user) {
      return children;
    }
    return <Navigate to="/signin" state={{ from: location }} replace />;
  };
  
  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export default PrivateRoute;