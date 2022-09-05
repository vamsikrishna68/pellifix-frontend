import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from './helper'

export const PrivateRoute = ({ children }) => {
    return getToken() ? children : <Navigate to="/login" />;
};