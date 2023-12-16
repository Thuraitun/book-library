import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { SwitchTransition, CSSTransition } from "react-transition-group"
import './layout.css'
const Layout = () => {

  const location = useLocation();

  return (
    <div className="">
        <Navbar />

        <SwitchTransition>
          <CSSTransition timeout={200} classNames='fade' key={location.pathname}>
            <div className="max-w-7xl mx-auto p-4">
                <Outlet />
            </div>      
          </CSSTransition>
        </SwitchTransition>
    </div>
  );
}

export default Layout;
