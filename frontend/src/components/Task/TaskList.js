import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../hooks/useApi';
import TaskItem from './TaskItem';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const api = useApi();

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/tasks/');
            setTasks(response.data.results);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Failed to fetch tasks. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [api]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading tasks...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                {user && (
                    <Link to="/tasks/new">
                        <Button>Create New Task</Button>
                    </Link>
                )}
            </div>
            {filteredTasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                <div className="space-y-4">
                    {filteredTasks.map(task => (
                        <TaskItem key={task.id} task={task} onStatusUpdate={fetchTasks} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;