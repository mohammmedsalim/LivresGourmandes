const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        const token = generateToken(result.insertId, 'client');

        res.status(201).json({
            _id: result.insertId,
            name,
            email,
            role: 'client',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role)
            });
        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
