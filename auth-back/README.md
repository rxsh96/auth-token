# Readme

## Auth Token Backend App

Auth Token Backend App es un servidor local en Express que genera tokens de seis dígitos con una validez por 60 segundos.

## Features

- Crea una DB en Postgres.
- SELECT, INSERT y UPDATE de registros (información de clientes) en la DB.
- A cada cliente le asocia un `secret` con el cual se determinará el `token` a generar.
- Genera `tokens` de 6 dígitos con una validación inicial de 60 segundos.
- Expone endpoints para crear tokens y validar tokens.

## Tech

Auth Token Backend utiliza una serie de proyectos de código abierto para funcionar correctamente:

- [node.js] - Eventos de E/S para el backend
- [Express] - Framework de red rápido en node.js
- [speakeasy] - Generación y validación de secrets y tokens
- [knex.js] - Consultas a la DB

## Instalación

Se requiere [Node.js](https://nodejs.org/) v16+ y [PostgresSQL](https://www.postgresql.org/) v14+.

Ubicarse en el directorio del proyecto `auth-back`.

Instalar las dependencies y devDependencies.

```sh
npm install
```

Inicializar la base de datos en su ambiente.

```sh
npm run initdb [DBNAME] [DBUSER] [DBPASSWORD]
```

Iniciar el servidor.

```sh
npm start
```

## Licencia

MIT

[node.js]: http://nodejs.org
[express]: http://expressjs.com
[speakeasy]: https://github.com/speakeasyjs/speakeasy
[knex.js]: https://knexjs.org/
