import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";

const TaskForm = ({ task, onSubmit }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [status, setStatus] = useState(task ? task.status : 'TODO');
    const [projectId, setProjectId] = useState(task ? task.project : '');
    const [assignedTo, setAssignedTo] = useState(task ? task.assigned_to : '');
    const [dueDate, setDueDate] = useState(task ? task.due_date : '');
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const api = useApi();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
        fetchUsers();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects/');
            setProjects(response.data.results);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users/');
            setUsers(response.data.results);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const taskData = { title, description, status, project: projectId, assigned_to: assignedTo, due_date: dueDate };
            if (task) {
                await api.put(`/tasks/${task.id}/`, taskData);
            } else {
                await api.post('/tasks/', taskData);
            }
            onSubmit();
            navigate('/tasks');
        } catch (err) {
            setError('Failed to save task. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={setStatus} defaultValue={status}>
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
                <Select onValueChange={setProjectId} defaultValue={projectId}>
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
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Select onValueChange={setAssignedTo} defaultValue={assignedTo}>
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
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
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