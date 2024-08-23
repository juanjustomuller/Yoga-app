import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Switch } from "@mui/material";

const navLinks = [
  { name: "Home", route: "/" },
  { name: "Instructor", route: "/instructors" },
  { name: "Classes", route: "/classes" },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secundary: {
      main: "#00ff00",
    }
  }
});

const NavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) //Controla si el menú móvil está abierto.
  const [isHome, setIsHome] = useState(false) //Determinan si estás en la página de inicio (/) o en la página de login (/login
  const [isLogin, setIsLogin] = useState(false) //Determinan si estás en la página de inicio (/) o en la página de login (/login)
  const [scrollPosition, setScrollPosition] = useState(0) //Guarda la posición actual del scroll en la página.
  const [isFixed, setIsFixed] = useState(false) //Define si el navbar debe estar fijo basado en la ruta actual.
  const [isDarkMode, setIsDarkMode] = useState(false) //Controla si el modo oscuro está activado.
  const [navBg, setNavbg] = useState("bg-[#15151590]"); //Maneja la clase de fondo del NavBar, que cambia según la posición de scroll y la ruta.

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {                                        //se ejecuta cuando isDarkMode cambia. Si está activado, añade una clase dark 
    const darkClass = 'dark';                              //al elemento html para aplicar estilos de modo oscuro a toda la página.
    const root = window.document.documentElement;
    if(isDarkMode) {
      root.classList.add(darkClass)
    } else {
      root.classList.remove(darkClass)
    }
  }, [isDarkMode])

  useEffect(() => {
    setIsHome(location.pathname === '/')                   //actualiza los estados isHome, isLogin e isFixed cuando cambia la ruta
    setIsLogin(location.pathname === '/login')             //Esto permite ajustar el NavBar dependiendo de la página actual
    setIsFixed(location.pathname === '/register' || location.pathname === '/login')
  }, [location])

  useEffect(() => {
    const handleScroll = () => {                   // agrega un listener de scroll que actualiza scrollPosition cuando el usuario se desplaza
      const currentPosition = window.pageXOffset   //Esto se usa para cambiar el fondo del NavBar dependiendo de la posición de scroll
      setScrollPosition(currentPosition)
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {       //cambia la clase navBg según la posición del scroll y si estás en la página de inicio o no.
    if(scrollPosition > 100) {
      if(isHome) {
        setNavbg('bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black')
      }
      else {
        setNavbg('bg-white dark:bg-black dark:text-white text-black')
      }
    } else {
      setNavbg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black'} "dark:text-white text-white`)
    }
  }, [scrollPosition])
  
  return (
    <nav className="">
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          {/*logo*/}
          <div>
            <h1 className="text-2xl inline-flex gap-3 items-center font-bold">
              YogaMaster <img src="/yoga-logo.png" alt="" className="w-8 h-8" />
            </h1>
            <p className="font-bold text-[13px] tracking-[8px]">
              Quick Explore
            </p>
          </div>

          {/* mobile menu icons */}

          {/*navigational links*/}
          <div className="hidden md:block text-black dark:text-white">
            <div className="flex"> 
              <ul className="ml-10 flex items-center space-x-4 pr-4">
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      to={link.route}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-30 `
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}

                {/* based on users */}
                <li>
                <NavLink to="/login" className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-30 `
                      }>Login</NavLink>
                </li>

                {/*color toggle*/}  
                <li>
                <ThemeProvider theme={theme}>
                  <div className="flex flex-col justify-center items-center">
                    <Switch onChange={() => setIsDarkMode(!isDarkMode)}/>
                      <h1 className="text-[8px]">Light/Dark</h1>
                  </div>
                </ThemeProvider>
                  </li>    
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
