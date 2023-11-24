import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Changed to HashRouter
import routes from './routes';
import NotFoundComponent from './scenes/404';
import ForbiddenComponent from './scenes/403';
import './assets/css/bootstrap.min.css';
import 'antd/dist/antd.css';

const App = () => {
  const isAuthenticated = localStorage.getItem('token');

  const getUserRole = () => {
    // Logic to get the user role
    return localStorage.getItem('role')?.toLowerCase(); // Example role
  };
  console.log(isAuthenticated, getUserRole(), routes, 'PP0');
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          console.log(route, index, 'PP1');
          if (route.path.startsWith('/auth')) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.component title={route.title} />} // Use 'element' prop instead of 'render'
              />
            );
          } else {
            if (isAuthenticated && (route.role === '' || route.role === getUserRole())) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              );
            }
          }
        })}
        <Route path="/404" element={<NotFoundComponent />} />
        <Route path="/403" element={<ForbiddenComponent />} />
        {/* Default route when no other matches */}
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
