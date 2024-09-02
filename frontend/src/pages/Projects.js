import React from 'react';
import ProjectList from '../components/Project/ProjectList';

const Projects = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Projects</h1>
            <ProjectList />
        </div>
    );
};

export default Projects;