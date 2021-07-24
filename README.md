# Obij - Restaurant

![Alt text](doc/home.png?raw=true "Accueil")
![Alt text](doc/cart.png?raw=true "Panier")
![Alt text](doc/login.png?raw=true "Connexion")
![Alt text](doc/register.png?raw=true "Inscription")
Solution e-commerce pour restaurant
roles
 - abonnés, visiteurs, manager/admin

Features
 - Inscription, authentification, panier, commande

### Avant propos
Ce projet est un challenge personnel pour maitriser vuejs et non une application complete.
Il faut souligner que :

 - Le code n'est pas testé
 - Le code ne respecte pas formément les bonnes pratiques de developpement

## Prérequis
 - MySQL 8 +
 - NodeJs
## Config Base de données
 - Créez une base de données nommée `obij`
 - Remplacez les informations correctes de la base de données dans le fichier `./api/config/database.js`
 - Importez dans MySQL le fichier SQL `./database.sql`  
## Dossier client => le front end 

Se positionner dans le dossier `./client` et executer  :

### Config 
```
npm install
```

### Compilation demarrer l'application
```
npm run serve
```
Lancez dans votre navigateur : http://localhost:8081/

## Dossier api => le backend API

Se positionner dans le dossier api et executer  :

### Config 
```
npm install
```
### Demarrer l'API
```
npm start
```

### Tester l'API 
Vous pouvez tester l'API en utilisant postman, il suffit d'importer le ficher  `./doc/OBIJ.postman_collection.json`.
## Quelques améliorations possibles
- Eviter les doublons dans le panier
- L'interface utilisateur
- Utiliser un ORM
