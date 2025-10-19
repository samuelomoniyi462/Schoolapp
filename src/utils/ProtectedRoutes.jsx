import React from 'react'
import { useAuth } from '../assets/context/Authcontext'
import { useLocation, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation()

  if ( !user ) {
    return <Navigate to="/login" state= {{from: location }} replace />;
  }
  return children;
}

export default ProtectedRoutes