import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();

  const token = localStorage.getItem("token");

  // No token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Token exists but profile still loading
  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;