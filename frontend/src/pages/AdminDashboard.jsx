import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import productService from '../services/productService';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        image: '',
        stock: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await productService.getProducts();
            setProducts(data);
        } catch (error) {
            toast.error('Erreur lors du chargement des produits');
        }
    };

    const handleShowModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                title: product.title,
                author: product.author,
                description: product.description || '',
                price: product.price,
                image: product.image || '',
                stock: product.stock
            });
        } else {
            setEditingProduct(null);
            setFormData({
                title: '',
                author: '',
                description: '',
                price: '',
                image: '',
                stock: ''
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await productService.updateProduct(editingProduct.id, formData);
                toast.success('Produit mis à jour avec succès !');
            } else {
                await productService.createProduct(formData);
                toast.success('Produit créé avec succès !');
            }
            fetchProducts();
            handleCloseModal();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
        }
    };

    const handleDelete = async (id, title) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
            try {
                await productService.deleteProduct(id);
                toast.success('Produit supprimé avec succès !');
                fetchProducts();
            } catch (error) {
                toast.error('Erreur lors de la suppression');
            }
        }
    };

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Dashboard Admin - Gestion des Produits</h2>
                <Button variant="primary" onClick={() => handleShowModal()}>
                    <FaPlus className="me-2" />
                    Ajouter un produit
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>Prix</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{ width: '50px', height: '60px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{product.title}</td>
                            <td>{product.author}</td>
                            <td>{product.price} €</td>
                            <td>
                                <Badge bg={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'danger'}>
                                    {product.stock}
                                </Badge>
                            </td>
                            <td>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleShowModal(product)}
                                >
                                    <FaEdit />
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(product.id, product.title)}
                                >
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Create/Edit */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Titre *</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Auteur *</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Prix (€) *</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>URL de l'image</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Stock *</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Annuler
                            </Button>
                            <Button variant="primary" type="submit">
                                {editingProduct ? 'Mettre à jour' : 'Créer'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminDashboard;
