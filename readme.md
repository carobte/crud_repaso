# Métodos HTTPS

1. Get -> Obtener
2. Post -> Crear (ruta)
3. Put -> Actualizar el dato (objeto completo)
4. Patch -> Actualizar un dato específico (si no existe la propiedad, la crea)
5. Delete -> Eliminar (id)

## Para enviar información

<code> JSON.stringify(objeto) </code>

## Para obtener información

<code> const response = await fetch(url, método) </code> <br> 
-> si no tiene método es Get <br>
<code> const data = await response.json() </code>

# Notas documentación: 

## Filter

Use . to access deep properties

GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode

## Full-text search

Add q

GET /posts?q=internet

## Filtrar un dato específico en la ruta

GET /posts?name=caro

<a href="https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#plural-routes">GitHub de la documentación</a>

