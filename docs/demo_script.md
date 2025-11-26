# Scénario de Démonstration Vidéo (3-5 min)

## Introduction (30 sec)
*   **Visuel** : Page d'accueil du site.
*   **Audio** : "Bonjour, je vous présente Livres Gourmands, une plateforme e-commerce de livres de cuisine développée avec React et Node.js."

## 1. Parcours Visiteur (1 min)
*   **Action** : Scroller sur la page d'accueil.
*   **Action** : Aller sur la page "Livres" (`/products`).
*   **Action** : Utiliser la barre de recherche pour filtrer (ex: taper "Cuisine").
*   **Action** : Cliquer sur un livre pour voir les détails.
*   **Audio** : "Le visiteur peut consulter le catalogue, filtrer les produits et voir les détails sans être connecté."

## 2. Inscription et Connexion (1 min)
*   **Action** : Tenter d'ajouter au panier -> Redirection ou Message (si implémenté) OU aller sur "Connexion".
*   **Action** : Cliquer sur "S'inscrire". Remplir le formulaire avec des fausses données.
*   **Action** : Valider.
*   **Audio** : "Créons un compte client. L'authentification est gérée via JWT."

## 3. Achat (1 min)
*   **Action** : Connecté, ajouter 2 livres au panier.
*   **Action** : Aller dans le panier (`/cart`).
*   **Action** : Modifier la quantité (+/-).
*   **Action** : Cliquer sur "Commander".
*   **Audio** : "Le panier est persistant. La commande est envoyée à l'API et enregistrée en base de données."

## Conclusion (30 sec)
*   **Visuel** : Retour accueil ou message de succès.
*   **Audio** : "Merci de votre attention. Le code source est disponible sur GitHub."
