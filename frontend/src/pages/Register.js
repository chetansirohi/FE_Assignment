import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';

const Register = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            <RegisterForm />
        </div>
    );
};

export default Register;