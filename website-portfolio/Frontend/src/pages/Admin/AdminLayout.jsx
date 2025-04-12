import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import "./style.css";

function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    setLoading(false);

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ color: "white" }} className='admin-content'>
      <Sidebar />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
