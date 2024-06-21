<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```
5 - Path de conexion
mongodb://localhost:27017/nest-pokemon 

6 - Recontruir la base de datos con la semilla
http://localhost:3000/API/seed


7. Clonar el archivo ```.env.template``` y renombar la copia a ```
.env```

8. Llenar las variables de entorno definidas en el ```.env```

9. Ejecutar la aplicación en dev:
```
npm start:dev
```

## Stack usado
* MongoDB
* Nest

# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen
```

https://gist.github.com/Klerith/e7861738c93712840ab3a38674843490
Editar - yarm.lock por package-lock.json y RUN yarn build x npm RUN build- segun el caso 
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
# Notas
Heroku redeploy sin cambios:
```
git commit --allow-empty -m "Tigger Heroku deploy"
git push heroku <master|main>
```