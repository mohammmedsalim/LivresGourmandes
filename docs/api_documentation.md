# Documentation API - Livres Gourmands

## Base URL
`http://localhost:5000/api`

## Authentification
Toutes les routes protégées nécessitent un header :
`Authorization: Bearer <votre_token>`

---

## 1. Authentification

### Inscription
*   **URL** : `/auth/register`
*   **Méthode** : `POST`
*   **Body** :
    ```json
    {
      "name": "Jean Dupont",
      "email": "jean@example.com",
      "password": "password123"
    }
    ```
*   **Réponse (201)** :
    ```json
    {
      "_id": 1,
      "name": "Jean Dupont",
      "email": "jean@example.com",
      "token": "eyJhbGciOiJIUzI1..."
    }
    ```

### Connexion
*   **URL** : `/auth/login`
*   **Méthode** : `POST`
*   **Body** :
    ```json
    {
      "email": "jean@example.com",
      "password": "password123"
    }
    ```

---

## 2. Produits

### Lister les produits
*   **URL** : `/products`
*   **Méthode** : `GET`
*   **Réponse (200)** : Tableau d'objets produits.

### Détail d'un produit
*   **URL** : `/products/:id`
*   **Méthode** : `GET`

---

## 3. Commandes

### Créer une commande
*   **URL** : `/orders`
*   **Méthode** : `POST`
*   **Header** : Auth requis
*   **Body** :
    ```json
    {
      "items": [
        { "id": 1, "quantity": 2, "price": 29.99 }
      ],
      "totalAmount": 59.98
    }
    ```

### Mes commandes
*   **URL** : `/orders/myorders`
*   **Méthode** : `GET`
*   **Header** : Auth requis
