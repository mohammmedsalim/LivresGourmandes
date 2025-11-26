import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBook, FaShippingFast, FaLock, FaHeart } from 'react-icons/fa';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts();
                setFeaturedProducts(data.slice(0, 4)); // Get first 4 products
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <div
                className="hero-section text-white text-center py-5"
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    minHeight: '500px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <FaBook size={80} className="mb-4" />
                            <h1 className="display-3 fw-bold mb-4">Livres Gourmands</h1>
                            <p className="lead mb-4" style={{ fontSize: '1.3rem' }}>
                                Découvrez notre collection exclusive de livres de cuisine pour tous les passionnés de gastronomie
                            </p>
                            <Button
                                as={Link}
                                to="/products"
                                variant="light"
                                size="lg"
                                className="px-5 py-3 fw-bold"
                                style={{ borderRadius: '50px' }}
                            >
                                Voir nos Livres
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Features Section */}
            <Container className="py-5">
                <Row className="g-4 text-center">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm h-100 p-4">
                            <Card.Body>
                                <FaShippingFast size={50} className="text-primary mb-3" />
                                <h5 className="fw-bold">Livraison Rapide</h5>
                                <p className="text-muted">Recevez vos livres en 48h partout en France</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm h-100 p-4">
                            <Card.Body>
                                <FaLock size={50} className="text-primary mb-3" />
                                <h5 className="fw-bold">Paiement Sécurisé</h5>
                                <p className="text-muted">Vos transactions sont 100% sécurisées</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm h-100 p-4">
                            <Card.Body>
                                <FaHeart size={50} className="text-primary mb-3" />
                                <h5 className="fw-bold">Sélection Premium</h5>
                                <p className="text-muted">Des livres soigneusement sélectionnés</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Featured Products Section */}
            <div className="bg-light py-5">
                <Container>
                    <h2 className="text-center fw-bold mb-5">Nos Coups de Cœur</h2>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {featuredProducts.map(product => (
                            <Col key={product.id}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                    <div className="text-center mt-5">
                        <Button
                            as={Link}
                            to="/products"
                            variant="primary"
                            size="lg"
                            className="px-5"
                        >
                            Voir Toute la Collection
                        </Button>
                    </div>
                </Container>
            </div>

            {/* CTA Section - Only show when NOT logged in */}
            {!isAuthenticated && (
                <Container className="py-5 text-center">
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <h2 className="fw-bold mb-4">Prêt à cuisiner comme un chef ?</h2>
                            <p className="lead text-muted mb-4">
                                Rejoignez des milliers de passionnés qui ont déjà trouvé leur bonheur dans notre collection
                            </p>
                            <Button
                                as={Link}
                                to="/register"
                                variant="outline-primary"
                                size="lg"
                                className="px-5"
                            >
                                Créer un Compte
                            </Button>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default Home;
