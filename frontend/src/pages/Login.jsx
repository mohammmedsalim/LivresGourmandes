import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            toast.warning("Veuillez remplir tous les champs", { icon: '⚠️' });
            return;
        }

        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Erreur de connexion";
            setError(errorMsg);
            toast.error(errorMsg, { icon: '❌' });
        }
    };

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card style={{ width: '400px' }} className="shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">Connexion</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Entrez votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Se connecter
                        </Button>
                    </Form>
                    <div className="mt-3 text-center">
                        Pas encore de compte ? <Link to="/register">S'inscrire</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
