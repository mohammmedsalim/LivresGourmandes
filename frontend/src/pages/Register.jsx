import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            const errorMsg = "Les mots de passe ne correspondent pas.";
            setError(errorMsg);
            toast.error(errorMsg, { icon: '❌' });
            return;
        }

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            navigate('/');
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Erreur d'inscription";
            setError(errorMsg);
            toast.error(errorMsg, { icon: '❌' });
        }
    };

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card style={{ width: '500px' }} className="shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">Inscription</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom complet</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Votre nom"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Votre email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirmer le mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            S'inscrire
                        </Button>
                    </Form>
                    <div className="mt-3 text-center">
                        Déjà un compte ? <Link to="/login">Se connecter</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;
