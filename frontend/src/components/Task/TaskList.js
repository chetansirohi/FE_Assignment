import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import TaskItem from './TaskItem';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from '../../hooks/useAuth';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();
    const api = useApi();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks/');
            setTasks(response.data.results);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <Button>Create New Task</Button>
                )}
            </div>
            <div className="space-y-4">
                {filteredTasks.map(task => (
                    <TaskItem key={task.id} task={task} onStatusUpdate={fetchTasks} />
                ))}
            </div>
        </div>
    );
};

export default TaskList;