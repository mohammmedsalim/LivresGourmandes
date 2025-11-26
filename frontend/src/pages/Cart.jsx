import React from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!user) {
            alert("Veuillez vous connecter pour commander.");
            navigate('/login');
            return;
        }

        try {
            await orderService.createOrder({
                items: cartItems,
                totalAmount: totalAmount
            });
            alert("Commande réussie !");
            clearCart();
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la commande.");
        }
    };

    if (cartItems.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <h2>Votre Panier</h2>
                <Alert variant="info" className="mt-3">Votre panier est vide.</Alert>
                <Link to="/products" className="btn btn-primary">Découvrir nos livres</Link>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2>Votre Panier</h2>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.price} €</td>
                            <td style={{ width: '150px' }}>
                                <div className="d-flex gap-2 align-items-center">
                                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                                    <span>{item.quantity}</span>
                                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                                </div>
                            </td>
                            <td>{(item.price * item.quantity).toFixed(2)} €</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Supprimer</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <h4>Total: {totalAmount.toFixed(2)} €</h4>
                <div>
                    <Button variant="outline-danger" className="me-2" onClick={clearCart}>Vider le panier</Button>
                    <Button variant="success" onClick={handleCheckout}>Commander</Button>
                </div>
            </div>
        </Container>
    );
};

export default Cart;
