import React, {useEffect} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; // Changed to HashRouter
import routes from './routes';
import { useNavigate, useLocation } from 'react-router-dom';
import NotFoundComponent from './scenes/404';
import ForbiddenComponent from './scenes/403';
import './assets/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './App.css';

const App = () => {
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const getUserRole = () => {
    return localStorage.getItem('role')?.toLowerCase(); 
  };

  useEffect(() => {

    let pageList = ['/user', '/agent', '/admin']
    if(!isAuthenticated) {
      navigate('/auth/login')
    } else if(!location.pathname.startsWith('/auth') && !location.pathname.startsWith('/error') && !pageList.includes(location.pathname)) {
      navigate('/error/404');
    }
    else if(pageList.includes(location.pathname) && location.pathname.replace('/', '') !== getUserRole()) {
      navigate('/error/403');
    }

  }, [location.pathname, navigate, isAuthenticated]);

  return (
      <Routes>
        {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.component title={route.title} />} // Use 'element' prop instead of 'render'
              />
            );
        })}
        <Route path="/error/404" element={<NotFoundComponent />} />
        <Route path="/error/403" element={<ForbiddenComponent />} />
        {/* Default route when no other matches */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Routes>
  );
};

export default App;
