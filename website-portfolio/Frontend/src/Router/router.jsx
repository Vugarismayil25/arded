
import AddCategory from "../pages/Admin/AddCategory";
import AddImage from "../pages/Admin/AddImage";
import AdminLayout from "../pages/Admin/AdminLayout";
import Cursor from "../pages/Admin/Cursor";
import Dashboard from "../pages/Admin/Dashboard";
import Login from "../pages/Admin/Login";
import SystemLog from "../pages/Admin/SystemLog";
import Users from "../pages/Admin/Users";
import Home from "../pages/User/Home";
import Layout from "../pages/User/Layout";
import Verify from "../pages/Verify";



const ROUTES = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />
            }
        ]
    },
    // ! Admin 
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <Dashboard />
            },
       
            {
                path: "add-image",
                element: <AddImage />
            },
            {
                path: "add-category",
                element: <AddCategory />
            },
            {
                path: "system-log",
                element: <SystemLog />
            },
            {
                path: "cursor",
                element: <Cursor />
            },
            {
                path: "users",
                element: <Users />
            }
        ]
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "/verify",
        element: <Verify />
    },
]


export default ROUTES