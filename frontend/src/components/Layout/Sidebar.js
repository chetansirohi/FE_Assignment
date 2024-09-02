import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700">Home</Link>
                    </li>
                    <li>
                        <Link to="/projects" className="block py-2 px-4 rounded hover:bg-gray-700">Projects</Link>
                    </li>
                    <li>
                        <Link to="/tasks" className="block py-2 px-4 rounded hover:bg-gray-700">Tasks</Link>
                    </li>
                    {user && user.is_admin && (
                        <li>
                            <Link to="/admin" className="block py-2 px-4 rounded hover:bg-gray-700">Admin</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;