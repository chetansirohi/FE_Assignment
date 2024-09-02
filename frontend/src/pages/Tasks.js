import React from 'react';
import TaskList from '../components/Task/TaskList';

const Tasks = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Tasks</h1>
            <TaskList />
        </div>
    );
};

export default Tasks;