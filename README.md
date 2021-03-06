# tyba-app

![Node Version] v10.15.1

Este proyecto contiene el backend de una aplicación API REST hecho en Node JS.

## Instalación
Realice un Fork de este repositorio y realize un clone en su máquina. 
Esta aplicación se puede desplegar de dos maneras: 
- Utilizando DockerCompose
- Despliegue local en la máquina.

## Instalación con DockerCompose
Instale docker compose. Luego corra el comando a continuación:
```
sudo docker-compose -f docker-compose-run.yml up
```
Esto despliega una base de datos PostgreSQL interna y se conecta con la aplicación que se despliega localmente sobre el puerto 8010.
Para observar la correcta instalación se puede hacer una peticíon get a la dirección:
```
http://localhost:8010/api/
```
La que retorna el mensaje: "Welcome to TYBA APP API!"
## Instalación directamente sobre la máquina
Para correr el repositorio localmente se requiere de una base de datos PostgreSQL.

### Instalación de dependencies
Corra el siguiente comando para instalar localmente las dependencias:
```
npm install
```
### Correr Migraciones
Para correr las migraciones se requiere la utilización del siguiente comando:
```
node_modules/.bin/sequelize db:migrate --url 'postgres://<dbUser>:<dbPassword>@<dbUrl>:<dbPort>/mis-datos'
```


### Local
Corre el proyecto en el ambiente de desarrollo:
<br>
```
npm run local
```

### Staging
Corre el proyecto en el ambiente de staging:
<br>
```
npm run staging
```

### Production
Corre el proyecto en el ambiente de producción:
<br>
```
npm run production
```

### Testing
Documentación: https://mochajs.org/
<br>
Corre los casos de prueba:
```
npm run test
```

## EndPoints
Dentro de laaplicaciónse encuentran los siguientes endPoints:

```
type: GET
URL: http://localhost:8010/api/
Authorization: none
```

```
type: POST
URL: http://localhost:8010/api/users/register
Authorization: none
Body: {
        "firstName": "Pepito",
          "lastName": "Perez",
          "email": "pepito.perez@hotmail.com",
          "password": "pepito.perez",
          "birthDate": "2018/05/02"
      }
```


```
type: POST
URL: http://localhost:8010/api/authenticate
Authorization: none
Body: {
          "email": "pepito.perez@hotmail.com",
          "password": "pepito.perez"
      }
      
Result: {
    "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaGFuLnZlbGFzcXVlekBob3RtYWlsLmNvbSIsImlhdCI6MTU2Mzc0ODgxMywiZXhwIjoxNTYzODM1MjEzfQ.J9R4DtuVjcpFH4VvKFF_S7cIlIfIIQCs-aqGBuvBeXA",
    "user": {
        "id": 1,
        "email": "pepito.perez@hotmail.com",
        "firstName": "Pepito",
        "lastName": "Perez"
    }
}
```

```
type: GET
URL: http://localhost:8010/api/weather/bogota
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaGFuLnZlbGFzcXVlekBob3RtYWlsLmNvbSIsImlhdCI6MTU2Mzc0NjQyNywiZXhwIjoxNTYzODMyODI3fQ.TThKT273HZeUDKjmVL-ey_MVybYnQLPjOCic3ePvLZY
Content-Type: application/json
```

```
type: GET
URL: http://localhost:8010/api/population/bogota
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaGFuLnZlbGFzcXVlekBob3RtYWlsLmNvbSIsImlhdCI6MTU2Mzc0NjQyNywiZXhwIjoxNTYzODMyODI3fQ.TThKT273HZeUDKjmVL-ey_MVybYnQLPjOCic3ePvLZY
Content-Type: application/json
```

```
type: GET
URL: http://localhost:8010/api/users/1/queries
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaGFuLnZlbGFzcXVlekBob3RtYWlsLmNvbSIsImlhdCI6MTU2Mzc0NjQyNywiZXhwIjoxNTYzODMyODI3fQ.TThKT273HZeUDKjmVL-ey_MVybYnQLPjOCic3ePvLZY
Content-Type: application/json
```
