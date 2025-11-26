import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Row, Col, Button, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (err) {
                const errorMsg = "Produit introuvable.";
                setError(errorMsg);
                toast.error(errorMsg, { icon: '❌' });
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;
    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
    if (!product) return null;

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <Image src={product.image} fluid rounded />
                </Col>
                <Col md={8}>
                    <h2>{product.title}</h2>
                    <h4 className="text-muted">{product.author}</h4>
                    <h3 className="text-primary my-3">{product.price} €</h3>
                    <p>{product.description}</p>
                    <Button variant="primary" size="lg" onClick={() => addToCart(product)}>
                        Ajouter au Panier
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
