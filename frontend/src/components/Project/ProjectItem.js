import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const ProjectItem = ({ project }) => {
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">{project.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                    <p>Start: {formatDate(project.start_date)}</p>
                    <p>End: {formatDate(project.end_date)}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Link to={`/projects/${project.id}`}>
                    <Button variant="outline">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ProjectItem;