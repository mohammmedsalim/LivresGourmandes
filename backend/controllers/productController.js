const pool = require('../config/db');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const [products] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Get single product
exports.getProductById = async (req, res) => {
    try {
        const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (product.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(product[0]);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Create product (Admin only)
exports.createProduct = async (req, res) => {
    try {
        const { title, author, description, price, image, stock } = req.body;

        // Validation
        if (!title || !author || !price) {
            return res.status(400).json({ message: 'Titre, auteur et prix sont requis' });
        }

        const [result] = await pool.query(
            'INSERT INTO products (title, author, description, price, image, stock) VALUES (?, ?, ?, ?, ?, ?)',
            [title, author, description || '', price, image || '', stock || 0]
        );

        res.status(201).json({
            message: 'Produit créé avec succès',
            productId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du produit' });
    }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
    try {
        const { title, author, description, price, image, stock } = req.body;
        const { id } = req.params;

        // Check if product exists
        const [existing] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        await pool.query(
            'UPDATE products SET title = ?, author = ?, description = ?, price = ?, image = ?, stock = ? WHERE id = ?',
            [title, author, description, price, image, stock, id]
        );

        res.json({ message: 'Produit mis à jour avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du produit' });
    }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if product exists
        const [existing] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        await pool.query('DELETE FROM products WHERE id = ?', [id]);

        res.json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
    }
};
