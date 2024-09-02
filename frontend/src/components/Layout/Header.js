import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from "../ui/button";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">ProjectHub</Link>
                <nav>
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link to="/projects" className="text-gray-600 hover:text-gray-800">Projects</Link>
                            <Link to="/tasks" className="text-gray-600 hover:text-gray-800">Tasks</Link>
                            <Button onClick={logout} variant="outline">Logout</Button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Register</Button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;