# Treehouse API

### Stack

Treehouse API uses the following technologies:
* [Swagger Framework] - framework for standardizing rest features
* [Swagger UI] - interactive rest tool & schema reference
* [Exress] - modular node.js framework
* [Sequelize] - promise based orm for node.js
* [Sqlite] - sql file-based db

### Install
To get the api running, follow the following steps.  Note that this codebase has been tested on node.js versions `v7.8.0` and greater.
```sh
$ git clone http://github.com/
$ cd treehouse-api
$ npm install
$ npm start
```

### Development
To run the API with node.js dashboard, run:
```sh
$ npm run dev
```
To launch the API in standard mode, run:
```sh
$ npm start
```
To execute the swagger unit tests, run:
```sh
$ npm run test
```
To launch the api via swagger's continuous server mode, run:
```sh
$ swagger project start
```
Finally, to launch swagger's interactive edit mode, run:
```sh
$ swagger project edit
```

### Routes
*server port defaults to 10010*

Boids **(get/post)**
```sh
/boids
```
Boids **(get/edit/delete)**
```sh
/boid/:id
```
Swagger-ui
```sh
/swagger
```
