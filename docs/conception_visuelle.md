# Conception Visuelle - Livres Gourmands

## 3. Liste Exhaustive des Pages à Maquetter

### Front-Office (Public & Client)
1.  **Accueil** : Hero banner, Nouveautés, Meilleures ventes, Catégories.
2.  **Résultats de Recherche** : Liste produits avec sidebar de filtres.
3.  **Fiche Produit** : Détails, Ajout panier, Avis, Produits similaires.
4.  **Panier** : Liste des articles, modification quantités, total.
5.  **Connexion** : Formulaire login.
6.  **Inscription** : Formulaire création compte.
7.  **Commande - Livraison** : Choix adresse et mode livraison.
8.  **Commande - Paiement** : Saisie CB (mockup) ou PayPal.
9.  **Confirmation Commande** : Récapitulatif et remerciements.
10. **Liste de Cadeaux** : Gestion des favoris.
11. **Accès Invité** : Page de suivi commande via code.

### Back-Office (Admin/Gestionnaire)
12. **Dashboard** : Vue d'ensemble (stats ventes, derniers inscrits).
13. **Gestion Produits** : Liste (CRUD), Ajout/Modif produit.
14. **Gestion Commandes** : Liste, Changement statut.
15. **Gestion Avis** : Modération des commentaires.

*Note : Toutes les pages doivent être déclinées en version Desktop et Mobile.*

---

## 4. Wireframes ASCII Textuels

### Page d'Accueil (Desktop)
```text
+---------------------------------------------------------------+
| [Logo]  [Recherche...]           [Cadeaux] [Compte] [Panier]  |
+---------------------------------------------------------------+
|                                                               |
|                      HERO BANNER (Promo)                      |
|             "Découvrez les saveurs d'automne"                 |
|                      [Voir la sélection]                      |
|                                                               |
+---------------------------------------------------------------+
|  Nouveautés                                                   |
|  +-------+  +-------+  +-------+  +-------+                   |
|  | IMG   |  | IMG   |  | IMG   |  | IMG   |                   |
|  | Titre |  | Titre |  | Titre |  | Titre |                   |
|  | Prix  |  | Prix  |  | Prix  |  | Prix  |                   |
|  +-------+  +-------+  +-------+  +-------+                   |
+---------------------------------------------------------------+
|  Catégories : [Pâtisserie] [Végétarien] [Monde] [Rapide]      |
+---------------------------------------------------------------+
| [Footer : Liens, Newsletter, Réseaux Sociaux]                 |
+---------------------------------------------------------------+
```

### Fiche Produit (Mobile)
```text
+-----------------------------+
| [Menu] [Logo]      [Panier] |
+-----------------------------+
| [ < Retour ]                |
|                             |
|        IMAGE LIVRE          |
|                             |
+-----------------------------+
| Titre du Livre              |
| Auteur: Jean Dupont         |
| ***** (12 avis)             |
|                             |
| 24.99 €                     |
| [Ajouter au Panier]         |
+-----------------------------+
| Description...              |
| ...                         |
+-----------------------------+
| Avis Clients                |
| - User1: Top !              |
+-----------------------------+
```

---

## 5. Dossier de Conception – Plan Détaillé (PDF)

Le document PDF final suivra cette structure :

1.  **Introduction**
    *   Présentation du projet
    *   Objectifs et cibles
2.  **Stratégie UX**
    *   Personas (L'étudiant fauché, Le passionné, La grand-mère)
    *   User Journeys (Parcours d'achat type)
3.  **Charte Graphique** (voir section 6)
4.  **Architecture de l'Information**
    *   Arborescence du site (Sitemap)
5.  **Maquettes (Wireframes & UI)**
    *   Présentation des écrans clés
    *   Explication des choix ergonomiques
6.  **Interactions & Prototype**
    *   Description des micro-interactions
7.  **Accessibilité**
    *   Choix des contrastes
    *   Navigation clavier

---

## 6. Charte Graphique Complète

### Palette de Couleurs
*   **Primaire** : `#D35400` (Orange Citrouille - Appétissant, dynamique)
*   **Secondaire** : `#2C3E50` (Bleu Nuit - Sérieux, lisible pour le texte)
*   **Accent** : `#27AE60` (Vert Émeraude - Validation, prix, bio)
*   **Fond** : `#FDFAF6` (Crème léger - Confort de lecture, aspect papier)
*   **Erreur** : `#C0392B` (Rouge brique)

### Typographie
*   **Titres** : *Playfair Display* (Serif) - Élégance, aspect littéraire et culinaire.
*   **Corps de texte** : *Lato* ou *Open Sans* (Sans-serif) - Lisibilité optimale sur écran.

### Iconographie
*   Style "Outline" (contours fins) pour la légèreté.
*   Bibliothèque : FontAwesome ou Heroicons.

### Composants UI
*   **Boutons** : Arrondis (border-radius: 4px), ombres légères au survol.
*   **Cartes** : Fond blanc, ombre portée douce (`box-shadow: 0 2px 5px rgba(0,0,0,0.1)`).

---

## 7. Organisation du Fichier Figma

Le fichier `.fig` sera structuré en "Pages" pour séparer les étapes :

1.  **Cover** : Miniature du projet.
2.  **UX Research** : Personas, User Flows.
3.  **Wireframes** : Maquettes basse fidélité (Gris/Blanc).
4.  **Design System** : Couleurs, Typos, Composants (Boutons, Inputs, Cards).
5.  **High-Fidelity Desktop** : Maquettes finales Desktop.
6.  **High-Fidelity Mobile** : Maquettes finales Mobile.
7.  **Prototype** : Liaisons pour le mode présentation.

---

## 8. Organisation du Prototype Adobe XD

Le prototype interactif mettra en scène les scénarios suivants :

*   **Scénario 1 : Achat simple (Invité)**
    *   Accueil -> Recherche "Chocolat" -> Clic Produit -> Ajout Panier -> Panier -> Commande -> Paiement -> Confirmation.
*   **Scénario 2 : Gestion Admin**
    *   Login Admin -> Dashboard -> Clic "Produits" -> Édition d'un livre -> Sauvegarde.

**Transitions** :
*   "Slide Left" pour la navigation mobile.
*   "Dissolve" pour les changements de page desktop.
*   "Overlay" pour les modales (Panier rapide, Connexion).
