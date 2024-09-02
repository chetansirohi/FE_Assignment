import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login({ username, password });
            navigate('/');  // Redirect to home page after login
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error('Login error:', err);
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
            <Button type="submit" className="w-full">Login</Button>
        </form>
    );
};

export default LoginForm;