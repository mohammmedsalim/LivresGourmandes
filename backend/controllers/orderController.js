const db = require('../config/db');

exports.createOrder = async (req, res) => {
    const { items, totalAmount } = req.body;
    const userId = req.user.id; // From auth middleware

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Aucun article dans la commande' });
    }

    try {
        // 1. Create Order
        const [orderResult] = await db.query(
            'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
            [userId, totalAmount, 'paid'] // Mocking payment as successful immediately
        );

        const orderId = orderResult.insertId;

        // 2. Create Order Items
        const orderItems = items.map(item => [orderId, item.id, item.quantity, item.price]);
        await db.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?',
            [orderItems]
        );

        res.status(201).json({
            id: orderId,
            user_id: userId,
            total_amount: totalAmount,
            status: 'paid',
            items: items
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la commande' });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const [orders] = await db.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
