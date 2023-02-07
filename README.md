<p align="center">
  <img src="https://i.imgur.com/X4dHh5o.png" width="500" alt="codevolution back-end logo" /></a>
</p>

  <p align="center">Back-end service for the INT20H-2023 Test</p>
    <p align="center">

## Description

Web-app that helps you to organise recipes, check their availability and try new dishes
## Installation

Clone the repository and execute:
```bash
$ npm install
```
Install husky:
```bash
$ npm run prepare
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run build
$ npm run start
```

## Documentation

On main page you will be redirected to `/recipes`, where you can see all recipes in data base. You can sort them, group by category, edit and delete.

If you are not logged in, you should go to the login page and login into system. If you don't have the account - you can go to the signup page via link below

App is fully responsive, so you can comfortably use it on any device

You can create entities such as `Ingredient` or `Recipe`, edit them and delete. Before deleting you will be asked whether you are sure to delete item or not. It is made to prevent accidental deleting

## Stay in touch

- Authors - [Andrew Vitrenko](https://github.com/andrewvitrenko), [Oleksandr Humeniuk](https://github.com/OleksandrHumeniuk)
- Deployed [Vercel](https://codevolution-web.vercel.app/).

## License

Back-end service is [MIT licensed](LICENSE).
