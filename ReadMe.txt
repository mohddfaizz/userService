Tech stack: Nodejs, Mongodb,express
User registration, login, profile management.

npm init -y

//Install all the required dependency
npm i express mongoose jsonwebtoken cookie-parser bcrypt

//Install nodemon as dev dependency
npm i --save-dev nodemon

npm i dotenv
npm i validator cors

npm run dev

docker build -t user-service .
docker run -it -p 3000:3000 user-service
docker run -it -p 3000:3000 --add-host=host.docker.internal:host-gateway user-service

add a validatetoken method:
Dockerize the app
use search restaurant by location

docker ps 
docker stop container_id