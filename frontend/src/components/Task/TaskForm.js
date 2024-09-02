import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";

const TaskForm = ({ task, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'TODO',
        project: task?.project || '',
        assigned_to: task?.assigned_to || '',
        due_date: task?.due_date || ''
    });
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const api = useApi();
    const navigate = useNavigate();

    const fetchProjects = useCallback(async () => {
        try {
            const response = await api.get('/projects/');
            setProjects(response.data.results);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError('Failed to fetch projects. Please try again.');
        }
    }, [api]);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await api.get('/users/');
            setUsers(response.data.results);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users. Please try again.');
        }
    }, [api]);

    useEffect(() => {
        fetchProjects();
        fetchUsers();
    }, [fetchProjects, fetchUsers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (task) {
                await api.put(`/tasks/${task.id}/`, formData);
            } else {
                await api.post('/tasks/', formData);
            }
            onSubmit();
            navigate('/tasks');
        } catch (err) {
            setError('Failed to save task. Please try again.');
            console.error('Task save error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
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
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))} defaultValue={formData.status}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="TODO">To Do</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="project">Project</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, project: value }))} defaultValue={formData.project}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                        {projects.map(project => (
                            <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="assigned_to">Assigned To</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, assigned_to: value }))} defaultValue={formData.assigned_to}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map(user => (
                            <SelectItem key={user.id} value={user.id.toString()}>{user.username}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                    id="due_date"
                    name="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <Button type="submit">{task ? 'Update Task' : 'Create Task'}</Button>
        </form>
    );
};

export default TaskForm;