import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FaShoppingCart, FaEye } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <Card className="h-100 shadow-sm border-0 product-card" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}>
            <div style={{ overflow: 'hidden', height: '250px' }}>
                <Card.Img
                    variant="top"
                    src={product.image}
                    style={{
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                    }}
                    className="product-img"
                />
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold" style={{ fontSize: '1.1rem' }}>{product.title}</Card.Title>
                <Card.Text className="text-muted small mb-2">{product.author}</Card.Text>
                <Card.Text className="fw-bold text-primary fs-5 mb-3">{product.price} €</Card.Text>
                <div className="mt-auto d-flex gap-2">
                    <Button
                        variant="outline-primary"
                        size="sm"
                        as={Link}
                        to={`/products/${product.id}`}
                        className="flex-grow-1"
                    >
                        <FaEye className="me-1" /> Détails
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="flex-grow-1"
                    >
                        <FaShoppingCart className="me-1" /> Ajouter
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
