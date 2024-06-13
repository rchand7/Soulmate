import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layout/Root/Root";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard/Dashboard";
import DashboardHome from "../dashboardPages/DashboardHome/DashboardHome";
import EditBiodata from "../dashboardPages/EditBiodata/EditBiodata";
import PrivateRoute from "./PrivateRoute";
import CreateBiodata from "../dashboardPages/CreateBiodata/CreateBiodata";
import ViewBiodata from "../dashboardPages/ViewBiodata/ViewBiodata";
import FavoriteBiodata from "../dashboardPages/FavoriteBiodata/FavoriteBiodata";
import Biodatas from "../pages/Biodatas/Biodatas";
import ViewSingleBiodata from "../pages/VIewSingleBiodata/ViewSingleBiodata";
import ContactCheckout from "../pages/ContactCheckout/ContactCheckout";
import RequestedContacts from "../dashboardPages/RequestedContacts/RequestedContacts";
import ManageUsers from "../dashboardPages/AdminOnly/ManageUsers/ManageUsers";
import ApprovedPremium from "../dashboardPages/AdminOnly/ApprovedPremium/ApprovedPremium";
import ApprovedContactRequest from "../dashboardPages/AdminOnly/ApprovedContactRequest/ApprovedContactRequest";
import CheckoutBiodata from "../dashboardPages/CheckoutBiodata/CheckoutBiodata";
import GotMarried from "../dashboardPages/GotMarried/GotMarried";
import SuccessStory from "../dashboardPages/AdminOnly/SuccessStory/SuccessStory";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AdminPrivateRoute from "./AdminPrivateRoute";

export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <AboutUs />,
            },
            {
                path: "/contact",
                element: <ContactUs />,
            },
            {
                path: "/biodatas",
                element: <Biodatas />,
            },
            {
                path: "/biodata/:biodataId",
                element: <PrivateRoute><ViewSingleBiodata /></PrivateRoute>
            },
            {
                path: "biodata/:biodataId/checkout",
                element: <PrivateRoute><ContactCheckout /></PrivateRoute>,
            },
            {
                path: "/signIn",
                element: <SignIn />,
            },
            {
                path: "/signUp",
                element: <SignUp />,
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: "",
                element: <DashboardHome />,
            },
            {
                path: "editBiodata/:biodataId",
                element: <EditBiodata />,
            },
            {
                path: "viewBiodata/:email",
                element: <ViewBiodata />,
            },
            {
                path: "myRequest",
                element: <RequestedContacts />,
            },
            {
                path: "favoriteBiodata",
                element: <FavoriteBiodata />,
            },
            {
                path: "createBiodata",
                element: <CreateBiodata />,
            },
            {
                path: "gotMarried",
                element: <GotMarried />,
            },
            {
                path: "viewBiodata/:userMail/biodata/:biodataId",
                element: <CheckoutBiodata />,
            },
            // Admin Only Routes
            {
                path: "manage",
                element: <AdminPrivateRoute><ManageUsers /></AdminPrivateRoute>
            },
            {
                path: "approvedPremium",
                element: <AdminPrivateRoute><ApprovedPremium /></AdminPrivateRoute>,
            },
            {
                path: "approvedContactRequest",
                element: <AdminPrivateRoute><ApprovedContactRequest /></AdminPrivateRoute>,
            },
            {
                path: "successStory",
                element: <AdminPrivateRoute><SuccessStory /></AdminPrivateRoute>,
            }
        ],
    }
]);