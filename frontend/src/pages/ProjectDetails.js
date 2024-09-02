import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import TaskList from '../components/Task/TaskList';
import { handleApiError } from '../utils/errorHandler';

const ProjectDetails = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const api = useApi();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await api.get(`/projects/${id}/`);
                setProject(response.data);
            } catch (error) {
                handleApiError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id, api]);

    if (loading) return <div>Loading...</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{project.description}</p>
                    <p className="mt-2">
                        <strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}
                    </p>
                </CardContent>
            </Card>
            <h2 className="text-2xl font-bold mt-8 mb-4">Tasks</h2>
            <TaskList projectId={id} />
            <Button className="mt-4">Add New Task</Button>
        </div>
    );
};

export default ProjectDetails;