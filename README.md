# Livres Gourmands - E-Commerce de Livres de Cuisine

Application e-commerce moderne pour la vente de livres de cuisine, développée avec React, Node.js, Express et MySQL.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

## Description du Projet

**Livres Gourmands** est une plateforme e-commerce complète permettant aux utilisateurs de parcourir, acheter et gérer des livres de cuisine. Le projet inclut :

- **Système de panier** avec gestion des quantités
- **Authentification** complète (inscription, connexion, gestion de session)
- **Dashboard Admin** pour la gestion CRUD des produits
- **Interface responsive** avec design moderne
- **Notifications toast** pour toutes les actions utilisateur
- **Système de commandes** avec historique
- **UI/UX premium** avec animations et effets

## Démo & Design

- **Vidéo de démonstration** : [Lien vers la vidéo](#) *(à ajouter)*
- **Design Figma** : [Lien Figma](#) *(à ajouter)*
- **Maquettes Adobe XD** : [Lien XD](#) *(à ajouter)*

## Architecture Technique

### Stack Technologique

**Frontend :**
- React 18.3.1 avec Vite
- React Router DOM pour la navigation
- Bootstrap 5 pour le styling
- React Toastify pour les notifications
- Axios pour les requêtes HTTP
- React Icons pour les icônes

**Backend :**
- Node.js avec Express
- MySQL (via mysql2)
- JWT pour l'authentification
- Bcrypt pour le hashing des mots de passe
- Helmet pour la sécurité
- CORS pour les requêtes cross-origin

**Base de données :**
- MySQL 8.0+
- Docker pour la conteneurisation (optionnel)

## Structure du Dépôt

```
projet-finale/
├── backend/                    # API Node.js/Express
│   ├── config/                # Configuration DB
│   ├── controllers/           # Logique métier
│   ├── middlewares/           # Auth & validation
│   ├── routes/                # Routes API
│   ├── database.sql           # Schéma DB
│   └── server.js              # Point d'entrée
│
├── frontend/                   # Application React
│   ├── public/                # Assets statiques
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   ├── contexts/          # Context API (Auth, Cart)
│   │   ├── pages/             # Pages de l'application
│   │   ├── services/          # Services API
│   │   └── App.jsx            # Composant principal
│   └── package.json
│
└── docs/                       # Documentation
    ├── api_documentation.md    # Documentation API
    ├── architecture_technique.md
    └── manuel_installation.md
```

## Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MySQL Server 8.0+
- npm ou yarn
- Git

### Installation Backend

```bash
# Cloner le dépôt
git clone https://github.com/mohammmedsalim/LivresGourmandes.git
cd LivresGourmandes/backend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env avec :
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=livresgourmands
DB_PORT=3306
JWT_SECRET=votre_secret_jwt_tres_securise
PORT=5000

# Importer la base de données
mysql -u root -p < database.sql

# Démarrer le serveur
npm run dev
```

Le serveur backend démarre sur `http://localhost:5000`

### Installation Frontend

```bash
# Ouvrir un nouveau terminal
cd frontend

# Installer les dépendances
npm install

# Démarrer l'application
npm run dev
```

L'application frontend démarre sur `http://localhost:5173`

### Installation avec Docker (optionnel)

```bash
# Démarrer MySQL avec Docker
docker run --name mysql-livresgourmands \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=livresgourmands \
  -p 3307:3306 \
  -d mysql:8.0

# Importer le schéma
cat backend/database.sql | docker exec -i mysql-livresgourmands mysql -u root -proot livresgourmands
```

## Commandes Disponibles

### Backend
```bash
npm run dev      # Démarrer en mode développement (nodemon)
npm start        # Démarrer en mode production
```

### Frontend
```bash
npm run dev      # Démarrer le serveur de développement Vite
npm run build    # Créer le build de production
npm run preview  # Prévisualiser le build de production
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentification

#### Inscription
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "password": "password123"
}
```

#### Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "jean@example.com",
  "password": "password123"
}
```

### Produits

#### Lister les produits
```http
GET /api/products
```

#### Détail d'un produit
```http
GET /api/products/:id
```

#### Créer un produit (Admin)
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nouveau Livre",
  "author": "Chef Dupont",
  "description": "Description du livre",
  "price": 29.99,
  "image": "https://example.com/image.jpg",
  "stock": 10
}
```

#### Modifier un produit (Admin)
```http
PUT /api/products/:id
Authorization: Bearer <token>
```

#### Supprimer un produit (Admin)
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Commandes

#### Créer une commande
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    { "id": 1, "quantity": 2, "price": 29.99 }
  ],
  "totalAmount": 59.98
}
```

#### Mes commandes
```http
GET /api/orders/myorders
Authorization: Bearer <token>
```

## Gestion des Rôles

### Rôles Disponibles

#### 1. Client (Utilisateur standard)
**Permissions :**
- Parcourir les produits
- Ajouter au panier
- Passer des commandes
- Voir l'historique de ses commandes
- Pas d'accès au dashboard admin

**Inscription :** Automatique lors de la création de compte

#### 2. Admin (Administrateur)
**Permissions :**
- Toutes les permissions Client
- Accès au Dashboard Admin
- Créer des produits
- Modifier des produits
- Supprimer des produits
- Gérer le stock
- Voir toutes les commandes

**Accès :** Promotion manuelle en base de données
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

### Promotion d'un utilisateur en Admin

```bash
# Via MySQL
mysql -u root -p livresgourmands
UPDATE users SET role = 'admin' WHERE email = 'votre-email@example.com';

# Via Docker
docker exec -i mysql-livresgourmands mysql -u root -proot livresgourmands \
  -e "UPDATE users SET role = 'admin' WHERE email = 'votre-email@example.com';"
```

## Fonctionnalités Principales

### Pour les Clients
- Page d'accueil avec hero section et produits mis en avant
- Catalogue de livres avec recherche
- Panier persistant (localStorage)
- Système de commande
- Gestion de compte (inscription, connexion, profil)
- Notifications toast pour toutes les actions

### Pour les Admins
- Dashboard admin dédié
- Création de nouveaux produits
- Modification des produits existants
- Suppression de produits
- Gestion du stock
- Vue d'ensemble des produits

## Design & UX

- **Design moderne** avec gradients et glassmorphism
- **Animations fluides** et micro-interactions
- **Responsive** sur tous les appareils
- **Dark mode** pour la navbar
- **Toast notifications** avec icônes
- **Badges** de stock colorés (vert/orange/rouge)
- **Cartes produits** avec effets hover

## Sécurité

- Mots de passe hashés avec bcrypt
- Authentification JWT
- Protection CORS
- Helmet pour les headers HTTP
- Validation des entrées
- Routes protégées par middleware
- Séparation des rôles (Client/Admin)

## Documentation Complète

- [Documentation API](docs/api_documentation.md)
- [Architecture Technique](docs/architecture_technique.md)
- [Manuel d'Installation](docs/manuel_installation.md)

## Tests

Pour tester l'application :

1. **Créer un compte** sur `/register`
2. **Se connecter** sur `/login`
3. **Parcourir les livres** sur `/products`
4. **Ajouter au panier** et voir le badge se mettre à jour
5. **Passer commande** sur `/cart`
6. **Promouvoir en admin** (voir section Rôles)
7. **Accéder au dashboard** via le menu utilisateur
8. **Gérer les produits** (créer, modifier, supprimer)

## Contribution

Ce projet est développé dans un cadre académique. Pour toute question ou suggestion :

1. Ouvrir une issue
2. Créer une pull request
3. Contacter l'équipe de développement

## Licence

Ce projet est développé à des fins éducatives.

## Auteur

**Mohammed Salim**
- GitHub: [@mohammmedsalim](https://github.com/mohammmedsalim)

---

N'oubliez pas de mettre une étoile si vous aimez ce projet !
