// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setValid(false);
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_BACKENDURL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setValid(res.ok))
      .catch(() => setValid(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{backgroundColor:'#222831',color:'white', width:'100vw', height:'100vh'}}>Verificando token...</div>;
  if (!valid) return <Navigate to="/" replace />;
  return <Outlet />;
}
