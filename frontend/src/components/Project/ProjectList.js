import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../hooks/useApi';
import ProjectItem from './ProjectItem';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const api = useApi();

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/projects/');
            setProjects(response.data.results);
        } catch (error) {
            console.error('Error fetching projects:', error);
            if (error.response?.status === 403) {
                toast.error("You don't have permission to view projects.");
            } else {
                toast.error("An error occurred while fetching projects.");
            }
        } finally {
            setLoading(false);
        }
    }, [api]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading projects...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                {user && user.is_admin && (
                    <Link to="/projects/new">
                        <Button>Create New Project</Button>
                    </Link>
                )}
            </div>
            {filteredProjects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProjects.map(project => (
                        <ProjectItem key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectList;