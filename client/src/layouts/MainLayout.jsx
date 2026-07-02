import Sidebar from "../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const hideSidebar = location.pathname.startsWith("/chat");

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {!hideSidebar && <Sidebar />}

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;