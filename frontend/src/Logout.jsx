
import { Navigate } from "react-router-dom";
export const logout = () => {
  localStorage.removeItem('token');
  return <Navigate to='/'/>
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};
