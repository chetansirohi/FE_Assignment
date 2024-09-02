import React from 'react';
import { useApi } from '../../hooks/useApi';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const TaskItem = ({ task, onStatusUpdate }) => {
    const api = useApi();

    const handleStatusChange = async (newStatus) => {
        try {
            await api.patch(`/tasks/${task.id}/update_status/`, { status: newStatus });
            onStatusUpdate();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">{task.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                    <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
                    <p>Assigned to: {task.assigned_to}</p>
                </div>
                <Badge className="mt-2" variant={task.status === 'DONE' ? 'success' : 'default'}>
                    {task.status}
                </Badge>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Select onValueChange={handleStatusChange} defaultValue={task.status}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="TODO">To Do</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">View Details</Button>
            </CardFooter>
        </Card>
    );
};

export default TaskItem;