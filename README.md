# Project


## Objetivos del Proyecto

- Construir una Api.

## BoilerPlate

El boilerplate cuenta con la carpeta: `products`. En esta carpeta estará el código del back-end y su entry point respectivamente.

#### Tecnologías implementadas:
- [ ] NodeJs
- [ ] Express
- [ ] DB: Postgres
- [ ] ORM: Sequelize

## Comenzando
 1. puede clonar el repositiro con el siguiente CMD: 
 git clone https://github.com/careyesp95/test-smartsoft.git


 2. En `products` crear un archivo llamado: `.env` que tenga la siguiente forma: 
 
```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
DB_NAME=products
SECRET_KEY=smartsoft
```


Reemplazar `usuariodepostgres` y `passwordDePostgres` con sus propias credenciales para conectarse a postgres. 

Adicionalmente será necesario que creen desde psql una base de datos llamada `products`

 3. instalar las dependencias en `products`  utlilizando `npm install` y para levantar la APP `npm start`

#### Backend

Se desarrolla un servidor en NodeJs junto con Express.


#### Base de datos

El modelo de la base de datos deberá tener las siguientes entidades:

- [ ] Product:
  - id: 
  - name:
  - category:
  - price:
  - quantity:

- [ ] ProductPurchase:
  - id:
  - products:
  - purchaseDate
  - total

- User:
  - id:
  - name:
  - money:
  - purchases:











