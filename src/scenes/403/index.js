import React from 'react';
import { Link } from 'react-router-dom';

const ForbiddenComponent = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-2 text-warning">Whoops!</h1>
      <p className="lead">You've wandered into restricted territory!</p>
      <p>Looks like you're not supposed to be here.</p>
      <p>No worries, let's gracefully step back to familiar grounds!</p>
      <Link to="/auth/login">Back to Login Page</Link>
    </div>
  );
};

export default ForbiddenComponent;
