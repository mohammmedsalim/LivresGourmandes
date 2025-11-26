import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';
import { toast } from 'react-toastify';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts();
                setProducts(data);
            } catch (err) {
                const errorMsg = "Impossible de charger les produits.";
                setError(errorMsg);
                toast.error(errorMsg, { icon: '❌' });
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;
    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Nos Livres Gourmands</h2>

            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Rechercher un livre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>

            <Row xs={1} md={2} lg={4} className="g-4">
                {filteredProducts.map(product => (
                    <Col key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
