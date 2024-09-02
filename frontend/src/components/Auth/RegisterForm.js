import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register({ username, email, password });
            navigate('/');
        } catch (err) {
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
            <div>
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <Button type="submit" className="w-full">Register</Button>
        </form>
    );
};

export default RegisterForm;