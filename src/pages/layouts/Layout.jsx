import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { SwitchTransition, CSSTransition } from "react-transition-group"
import './layout.css'
import useTheme from "../../hooks/useTheme";
import { useEffect } from "react";
const Layout = () => {

  const location = useLocation();

  const { isDark } = useTheme()

  useEffect(() => {
    const body =document.body;
    if(isDark) {
      body.classList.add('bg-dbg')
    } else {
      body.classList.remove('bg-dbg')
    }
  }, [isDark])

  return (
    <div className={ isDark ? 'bg-dbg' : 'bg-white' }>
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
