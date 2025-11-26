import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FaShoppingCart, FaUser, FaBook, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { cartItems } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
                    <FaBook className="me-2" />
                    Livres Gourmands
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                        <Nav.Link as={Link} to="/products">Livres</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/cart" className="position-relative">
                            <FaShoppingCart className="me-1" />
                            Panier
                            {totalItems > 0 && (
                                <Badge
                                    bg="danger"
                                    pill
                                    className="position-absolute top-0 start-100 translate-middle"
                                    style={{ fontSize: '0.7rem' }}
                                >
                                    {totalItems}
                                </Badge>
                            )}
                        </Nav.Link>

                        {isAuthenticated ? (
                            <NavDropdown
                                title={
                                    <span>
                                        <FaUserCircle className="me-1" />
                                        {user.name}
                                    </span>
                                }
                                id="user-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item disabled className="text-muted small">
                                    {user.email}
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                {user.role === 'admin' && (
                                    <>
                                        <NavDropdown.Item as={Link} to="/admin/dashboard">
                                            Dashboard Admin
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                )}
                                <NavDropdown.Item onClick={handleLogout}>
                                    <FaSignOutAlt className="me-2" />
                                    Déconnexion
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    <FaUser className="me-1" />
                                    Connexion
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">Inscription</Nav.Link>
                            </>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
