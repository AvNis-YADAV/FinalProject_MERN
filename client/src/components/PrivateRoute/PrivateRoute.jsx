import { Navigate, useLocation } from "react-router-dom";
//pruavte
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const { pathname } = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
};

export default PrivateRoute;
