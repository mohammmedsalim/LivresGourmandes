# Architecture Technique - Livres Gourmands

## 1. Architecture Complète (Frontend + Backend)

### Vue d'ensemble
Le projet suit une architecture **Client-Serveur** classique avec une API RESTful.

*   **Frontend (Client)** : Application Single Page (SPA) développée avec React. Elle communique avec l'API via des requêtes HTTP (Axios).
*   **Backend (Serveur)** : Serveur Node.js avec Express. Il expose une API REST, gère la logique métier, l'authentification et interagit avec la base de données.
*   **Base de Données** : MySQL relationnelle.

### Diagramme de Flux de Données
`Client (React) <--> [JSON / HTTP] <--> Serveur (Express) <--> [SQL] <--> Base de Données (MySQL)`

---

## 2. Plan Complet du Dossier GitHub

```text
livresgourmands/
├── .gitignore
├── README.md                  # Documentation générale (Étape 3)
├── docs/                      # Documentation projet
│   ├── architecture_technique.md
│   ├── conception_visuelle.md
│   └── ...
├── frontend/                  # Application React
│   ├── public/
│   ├── src/
│   │   ├── assets/            # Images, fonts, styles globaux
│   │   ├── components/        # Composants réutilisables
│   │   ├── contexts/          # Context API (Auth, Cart)
│   │   ├── hooks/             # Custom hooks
│   │   ├── layouts/           # Layouts de pages (Main, Auth, Admin)
│   │   ├── pages/             # Composants de pages (routes)
│   │   ├── services/          # Appels API (Axios)
│   │   ├── utils/             # Fonctions utilitaires
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
└── backend/                   # API Node.js/Express
    ├── config/                # Configuration DB, variables env
    ├── controllers/           # Logique métier des routes
    ├── middlewares/           # Auth, Validation, Error handling
    ├── models/                # Modèles de données (si ORM) ou requêtes SQL
    ├── routes/                # Définition des endpoints API
    ├── services/              # Logique métier complexe (ex: paiement)
    ├── tests/                 # Tests Jest
    ├── server.js              # Point d'entrée
    ├── package.json
    └── .env
```

---

## 9. Scripts d’installation + Commandes du Projet

### Pré-requis
*   Node.js (v16+)
*   MySQL
*   Git

### Installation Initiale

**1. Cloner le repo**
```bash
git clone https://github.com/votre-user/livresgourmands.net.git
cd livresgourmands.net
```

**2. Backend Setup**
```bash
cd backend
npm install
# Configurer le fichier .env (DB_HOST, DB_USER, DB_PASS, JWT_SECRET...)
# Importer le script SQL dans MySQL
npm run dev
```

**3. Frontend Setup**
```bash
cd frontend
npm install
npm start
```

### Commandes Utiles

*   `npm run dev` (Backend) : Lance le serveur avec nodemon.
*   `npm start` (Frontend) : Lance le serveur de développement React.
*   `npm test` : Lance les tests (Jest dans backend, ou frontend).
*   `npm run build` : Crée la version de production du frontend.

---

## 11. Composants React à Créer

### Layout & Navigation
*   `Navbar` : Navigation principale, lien panier, état connexion.
*   `Footer` : Liens légaux, copyright.
*   `Sidebar` (Admin) : Navigation pour le back-office.

### Produits
*   `ProductCard` : Affichage résumé d'un livre (image, titre, prix, bouton ajout panier).
*   `ProductList` : Grille de ProductCards.
*   `ProductFilter` : Filtres (catégorie, prix, auteur).
*   `ProductDetail` : Vue complète, avis, description longue.
*   `RatingStars` : Affichage des étoiles pour les avis.

### Panier & Commande
*   `CartItem` : Ligne produit dans le panier (quantité, suppression).
*   `CartSummary` : Total, taxes, bouton commander.
*   `CheckoutForm` : Formulaire de livraison et paiement.

### UI Générique (Bootstrap Wrappers)
*   `Button` : Boutons stylisés.
*   `Input` : Champs de formulaire avec gestion d'erreur.
*   `Modal` : Fenêtres modales (confirmation, détails).
*   `Alert` : Notifications (Toast) pour succès/erreur.
*   `Loader` : Indicateur de chargement.

### Utilisateur
*   `LoginForm` / `RegisterForm`.
*   `WishlistButton` : Cœur pour ajouter aux favoris.

---

## 12. Description du Système de Panier

Le panier sera géré côté client pour une expérience fluide, avec une synchronisation optionnelle si l'utilisateur est connecté.

### Technologies
*   **React Context API** : `CartContext` pour rendre l'état du panier accessible partout (Navbar, Page Produit, Page Panier).
*   **LocalStorage** : Pour persister le panier même si l'utilisateur rafraîchit la page ou quitte le site (invité).

### Structure de Données (State)
```javascript
{
  items: [
    {
      productId: 1,
      title: "Le Grand Livre de la Cuisine",
      price: 29.99,
      quantity: 2,
      image: "url..."
    }
  ],
  totalAmount: 59.98,
  totalItems: 2
}
```

### Fonctions du Context
*   `addToCart(product, quantity)` : Ajoute un item ou incrémente la quantité si existe déjà. Met à jour le localStorage.
*   `removeFromCart(productId)` : Retire l'item.
*   `updateQuantity(productId, newQuantity)` : Modifie la quantité.
*   `clearCart()` : Vide le panier (après commande réussie).

### Flux
1.  Au chargement de l'app (`useEffect`), on lit `localStorage.getItem('cart')`.
2.  Si des données existent, on initialise le state du Context.
3.  À chaque modification (ajout/suppr), on met à jour le state ET le `localStorage`.
