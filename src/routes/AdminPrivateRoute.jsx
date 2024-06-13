
import PropTypes from 'prop-types'
import loadingGif from "../assets/img/essentials/loading.gif";
import UseUserAuthInfo from '../hooks/UseUserAuthInfo';
import AdminAccessOnly from '../dashboardPages/AdminAccessOnly/AdminAccessOnly';


const AdminPrivateRoute = ({ children }) => {
    const { userRole, loading } = UseUserAuthInfo();
  
    if (loading) {
      return (
          <div className=" h-screen w-full flex justify-center items-center">
              <img src={loadingGif} alt="Loading Animation" />
          </div>
      );
    }
  
    if (userRole === 'admin') {
      return children;
    }
    return <AdminAccessOnly/>;
  };
  
  AdminPrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export default AdminPrivateRoute;