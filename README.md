# projet-7-o-calm-back

## Voici notre superbe repo back !

Voici la partie backend d'un site web qui aide les citadins sans voiture, ou qui ne souhaitent pas l'utiliser, à trouver et partager les meilleurs trajets en transport en commun vers des endroits de détente en pleine nature. Il centralise les trajets basés sur les recommandations d'autres utilisateurs.

## Pré-requis

[NodeJS](https://nodejs.org/)\
[Npm](https://npmjs.com/)\
[Postgres](https://www.postgresql.org)\
[Sqitch](https://sqitch.org)

## Installation

```bash
git clone git@github.com:O-clock-Onigiri/projet-7-o-calm-back.git
cd projet-7-o-calm-back.git
npm install
```

## Architecture

Dupliquez les fichiers .env et sqitch.conf à partir des fichiers .examples. 
Remplissez-les avec vos propres informations.

## Sqitch

Pour déployer la base de donnée
```bash
npm run db:create
```

Pour ajouter quelques fausses données
```bash
npm run db:import
```

Pour redéployer la base de données
```bash
npm run db:reset
```

## Lancer le serveur

```bash
npm start
```

## Pour tester avec REST Client

Vous pouvez utiliser l'extension REST Client (ou autre) pour tester les routes.

## Documentation des routes

Vous pouvez trouver la documentation de cette API sur api.o-calm.fr/documentation.

