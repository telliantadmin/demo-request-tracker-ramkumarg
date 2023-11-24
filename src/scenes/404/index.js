import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundComponent = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-2 text-danger">Oops!</h1>
      <p className="lead">Seems like you took a wrong turn!</p>
      <p>Don't worry, even the best explorers get lost sometimes.</p>
      <p>Let's navigate back to safety!</p>
      <Link to="/auth/login">Go to Login Page</Link>
    </div>
  );
};

export default NotFoundComponent;
