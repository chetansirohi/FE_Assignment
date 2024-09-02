import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import ProjectItem from './ProjectItem';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();
    const api = useApi();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects/');
            setProjects(response.data.results);
        } catch (error) {
            console.error('Error fetching projects:', error);
            if (error.response && error.response.status === 403) {
                toast.error("You don't have permission to view projects.");
            } else {
                toast.error("An error occurred while fetching projects.");
            }
        }
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <Button>Create New Project</Button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map(project => (
                    <ProjectItem key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectList;