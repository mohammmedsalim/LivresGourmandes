# Manuel d'Installation et de Déploiement

## Pré-requis
*   Node.js (v14 ou supérieur)
*   MySQL Server
*   Git

## 1. Installation de la Base de Données
1.  Ouvrez votre gestionnaire MySQL (phpMyAdmin, Workbench, ou ligne de commande).
2.  Créez une base de données nommée `livresgourmands`.
3.  Importez le script SQL situé dans `backend/database.sql`.
    *   Ce script créera les tables `users`, `products`, `orders` et insérera des données de test.

## 2. Installation du Backend (API)
1.  Ouvrez un terminal dans le dossier `backend`.
2.  Installez les dépendances :
    ```bash
    npm install
    ```
3.  Configurez le fichier `.env` (si nécessaire, ajustez le mot de passe DB) :
    ```
    DB_USER=root
    DB_PASSWORD=votre_mot_de_passe
    ```
4.  Lancez le serveur :
    ```bash
    npm run dev
    ```
    *   Le serveur démarrera sur `http://localhost:5000`.

## 3. Installation du Frontend (React)
1.  Ouvrez un **nouveau** terminal dans le dossier `frontend`.
2.  Installez les dépendances :
    ```bash
    npm install
    ```
3.  Lancez l'application :
    ```bash
    npm run dev
    ```
4.  Ouvrez votre navigateur sur l'URL indiquée (généralement `http://localhost:5173`).

## 4. Vérification
*   Allez sur la page d'accueil.
*   Essayez de vous inscrire (`/register`).
*   Connectez-vous.
*   Ajoutez un livre au panier.
*   Passez commande.
*   Vérifiez que la commande apparaît dans la base de données.

## 5. Déploiement (Optionnel)
*   **Frontend** : Peut être déployé sur Netlify ou Vercel en connectant le repo GitHub.
*   **Backend** : Peut être déployé sur Render ou Heroku.
*   **Base de données** : Nécessite une base MySQL hébergée (ex: Clever Cloud ou AWS RDS).
