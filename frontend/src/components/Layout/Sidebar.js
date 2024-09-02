import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
    const { user } = useAuth();

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/projects", label: "Projects" },
        { to: "/tasks", label: "Tasks" },
        ...(user?.is_admin ? [{ to: "/admin", label: "Admin" }] : []),
    ];

    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <nav>
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <Link to={item.to} className="block py-2 px-4 rounded hover:bg-gray-700">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;