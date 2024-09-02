import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";

const ProjectForm = ({ project, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: project?.name || '',
        description: project?.description || '',
        start_date: project?.start_date || '',
        end_date: project?.end_date || ''
    });
    const [error, setError] = useState('');
    const api = useApi();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (project) {
                await api.put(`/projects/${project.id}/`, formData);
            } else {
                await api.post('/projects/', formData);
            }
            onSubmit();
            navigate('/projects');
        } catch (err) {
            setError('Failed to save project. Please try again.');
            console.error('Project save error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Project Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <Button type="submit">{project ? 'Update Project' : 'Create Project'}</Button>
        </form>
    );
};

export default ProjectForm;