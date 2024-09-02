import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const TaskDetails = () => {
    const [task, setTask] = useState(null);
    const { id } = useParams();
    const api = useApi();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.get(`/tasks/${id}/`);
                setTask(response.data);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };
        fetchTask();
    }, [id, api]);

    if (!task) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{task.description}</p>
                    <p className="mt-2">
                        <strong>Project:</strong> {task.project}
                    </p>
                    <p>
                        <strong>Assigned To:</strong> {task.assigned_to}
                    </p>
                    <p>
                        <strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}
                    </p>
                    <Badge className="mt-2" variant={task.status === 'DONE' ? 'success' : 'default'}>
                        {task.status}
                    </Badge>
                </CardContent>
            </Card>
            <Button className="mt-4">Edit Task</Button>
        </div>
    );
};

export default TaskDetails;