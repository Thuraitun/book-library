import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Layout = () => {
  return (
    <div>
        <Navbar />

        <div className="max-w-7xl mx-auto p-4">
            <Outlet />
        </div>
    </div>
  );
}

export default Layout;
