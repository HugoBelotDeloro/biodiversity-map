# Biodiversity map

# To run this project:

You will need nodejs (currently built against v14.19.1) and docker.

- Run `npm install` to prepare node dependencies.
- Run `docker compose up` to start the Redis cache.
- Run `npm start` to start the dev server.
- Connect to http://localhost:3000/ to see the application.

This project uses *nodemon* to automatically restart the server when server files are changed, you will have to reload your browser manually when modifying front-end-related files.
