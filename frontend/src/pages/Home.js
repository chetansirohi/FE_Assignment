import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Welcome to ProjectHub</h1>
            {user ? (
                <div>
                    <p className="mb-4">Hello, {user.username}! What would you like to do today?</p>
                    <div className="space-x-4">
                        <Link to="/projects">
                            <Button>View Projects</Button>
                        </Link>
                        <Link to="/tasks">
                            <Button>View Tasks</Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <p className="mb-4">Please use the options in the header to log in or register.</p>
            )}
        </div>
    );
};

export default Home;