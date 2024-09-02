import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const Login = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <LoginForm />
        </div>
    );
};

export default Login;