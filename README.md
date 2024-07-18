# projet-7-o-calm-back

## Voici notre superbe repo back !

This is the backend part of a website that helps car-free city dwellers find and share the best public transportation routes to green relaxation spots. It centralizes trips based on recommendations from other users.

## What you need

[NodeJS](https://nodejs.org/)\
[Npm](https://npmjs.com/)\
[Postgres](https://www.postgresql.org)\
[Sqitch](https://sqitch.org)

## Install

```bash
git clone git@github.com:O-clock-Onigiri/projet-7-o-calm-back.git
cd projet-7-o-calm-back.git
npm install
```

## Architecture

Duplicate .env and sqitch.conf from .examples. Fill in your own informations.

## Sqitch

To deploy database
```bash
npm run db:create
```

To add fakes data
```bash
npm run db:import
```

To reset database
```bash
npm run db:reset
```

## Run server 
```bash
npm start
```

## REST testing

You can get REST Client (or else) extension to test the roads.


## Documentation roads

You can get documentation to this API on api.o-calm.fr/documentation
