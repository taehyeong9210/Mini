import React from 'react';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import Home from '../routes/Home';

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;
  if (user === null) {
    return <Navigate to="/login" />;
  }
  console.log(user);
  return children;
};

export default ProtectedRoute;
