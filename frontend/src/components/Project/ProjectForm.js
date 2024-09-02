import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";

const ProjectForm = ({ project, onSubmit }) => {
    const [name, setName] = useState(project ? project.name : '');
    const [description, setDescription] = useState(project ? project.description : '');
    const [startDate, setStartDate] = useState(project ? project.start_date : '');
    const [endDate, setEndDate] = useState(project ? project.end_date : '');
    const [error, setError] = useState('');
    const api = useApi();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const projectData = { name, description, start_date: startDate, end_date: endDate };
            if (project) {
                await api.put(`/projects/${project.id}/`, projectData);
            } else {
                await api.post('/projects/', projectData);
            }
            onSubmit();
            navigate('/projects');
        } catch (err) {
            setError('Failed to save project. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Project Name</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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