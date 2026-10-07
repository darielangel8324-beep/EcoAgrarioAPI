# DOCUMENTACIÓN DE LOS SERVICIOS WEB – ECOAGRARIO

**Proyecto:** EcoAgrario
**Evidencia:** GA7-220501096-AA5-EV04 – API del proyecto
**Aprendiz:** Dariel Angel Verjel Martinez
**Programa:** Análisis y Desarrollo de Software (ADSO)
**Tecnologías:** Node.js, Express, MongoDB y Mongoose.

## 1. Introducción

EcoAgrario es una aplicación orientada a facilitar la comercialización de productos agropecuarios, permitiendo que productores y compradores puedan establecer contacto directo, sin intermediarios.

Para apoyar el funcionamiento de la aplicación se desarrolló una API REST utilizando Node.js y Express, con MongoDB como sistema de almacenamiento de datos.

La API permite registrar usuarios, validar el inicio de sesión, publicar productos, consultar productos, realizar búsquedas por nombre, actualizar productos y eliminar productos.

## 2. Servicios de autenticación

### 2.1. Registro de usuarios

**Método HTTP:** POST
**Endpoint:** `/api/auth/registro`
**Descripción:** Permite registrar un nuevo usuario en el sistema.

**Datos de entrada (JSON):**

```json
{
  "usuario": "dariel",
  "contrasena": "123456"
}
```

**Validaciones:**

* El usuario y la contraseña son obligatorios.
* No se permite registrar un usuario que ya exista.

**Respuestas:**

* `201 Created`: Usuario registrado correctamente.
* `400 Bad Request`: Faltan datos obligatorios.
* `409 Conflict`: El usuario ya está registrado.
* `500 Internal Server Error`: Error al registrar el usuario.

### 2.2. Inicio de sesión

**Método HTTP:** POST
**Endpoint:** `/api/auth/login`
**Descripción:** Verifica las credenciales ingresadas por el usuario.

**Datos de entrada (JSON):**

```json
{
  "usuario": "dariel",
  "contrasena": "123456"
}
```

**Validaciones:**

* El usuario y la contraseña son obligatorios.
* Las credenciales deben coincidir con los datos almacenados.

**Respuestas:**

* `200 OK`: Autenticación satisfactoria.
* `400 Bad Request`: Faltan datos obligatorios.
* `401 Unauthorized`: Error en la autenticación.
* `500 Internal Server Error`: Error al realizar la autenticación.

## 3. Servicios de productos

### 3.1. Publicar un producto

**Método HTTP:** POST
**Endpoint:** `/api/productos`
**Descripción:** Permite registrar un nuevo producto agropecuario.

**Datos de entrada (JSON):**

```json
{
  "nombre": "Tomate",
  "descripcion": "Tomate fresco de producción local",
  "cantidad": 50,
  "precio": 2000,
  "ubicacion": "Ocaña, Norte de Santander"
}
```

**Validaciones:**

* Todos los campos son obligatorios.
* La cantidad debe ser un número mayor o igual a 1.
* El precio debe ser un número mayor o igual a 0.
* Los campos de texto eliminan espacios al inicio y al final.
* El estado del producto se establece automáticamente como `activo` si no se especifica.

**Respuestas:**

* `201 Created`: Producto publicado correctamente.
* `400 Bad Request`: Datos faltantes o inválidos.
* `500 Internal Server Error`: Error al publicar el producto.

### 3.2. Consultar productos

**Método HTTP:** GET
**Endpoint:** `/api/productos`
**Descripción:** Permite consultar los productos almacenados en la base de datos.

**Datos de entrada:** No requiere cuerpo de solicitud.

**Respuestas:**

* `200 OK`: Consulta realizada correctamente. Devuelve un arreglo con los productos encontrados, que puede estar vacío si no hay registros.
* `500 Internal Server Error`: Error al consultar los productos.

### 3.3. Buscar productos por nombre

**Método HTTP:** GET
**Endpoint:** `/api/productos/buscar/:nombre`
**Descripción:** Permite buscar productos utilizando su nombre o una parte de este.

**Ejemplo de solicitud:**

`GET /api/productos/buscar/tomate`

**Características:**

* La búsqueda no distingue entre mayúsculas y minúsculas.
* Permite encontrar coincidencias parciales en el nombre del producto.

**Respuestas:**

* `200 OK`: Se encontraron productos que coinciden con la búsqueda.
* `404 Not Found`: No se encontraron productos.
* `500 Internal Server Error`: Error al realizar la búsqueda.

### 3.4. Actualizar un producto

**Método HTTP:** PUT
**Endpoint:** `/api/productos/:id`
**Descripción:** Permite actualizar la información de un producto existente mediante su identificador.

**Datos de entrada (JSON):**

```json
{
  "nombre": "Tomate",
  "descripcion": "Tomate fresco actualizado",
  "cantidad": 40,
  "precio": 2500,
  "ubicacion": "Ocaña, Norte de Santander",
  "estado": "activo"
}
```

**Validaciones:**

* El producto debe existir en la base de datos.
* La cantidad debe ser un número mayor o igual a 1.
* El precio debe ser un número mayor o igual a 0.
* El estado debe corresponder a uno de los valores permitidos.

**Respuestas:**

* `200 OK`: Producto actualizado correctamente.
* `400 Bad Request`: Los datos del producto no son válidos.
* `404 Not Found`: Producto no encontrado.
* `500 Internal Server Error`: Error al actualizar el producto.

### 3.5. Eliminar un producto

**Método HTTP:** DELETE
**Endpoint:** `/api/productos/:id`
**Descripción:** Permite eliminar un producto existente mediante su identificador.

**Datos de entrada:** No requiere cuerpo de solicitud.

**Respuestas:**

* `200 OK`: Producto eliminado correctamente.
* `404 Not Found`: Producto no encontrado.
* `500 Internal Server Error`: Error al eliminar el producto.

## 4. Modelo de datos

### Usuario

El modelo de usuario contiene los siguientes campos:

| Campo      | Tipo   | Características      |
| ---------- | ------ | -------------------- |
| usuario    | String | Obligatorio y único. |
| contrasena | String | Obligatorio.         |

### Producto

El modelo de producto contiene los siguientes campos:

| Campo       | Tipo   | Características                                                       |
| ----------- | ------ | --------------------------------------------------------------------- |
| nombre      | String | Obligatorio.                                                          |
| descripcion | String | Obligatorio.                                                          |
| cantidad    | Number | Obligatorio, mínimo 1.                                                |
| precio      | Number | Obligatorio, mínimo 0.                                                |
| ubicacion   | String | Obligatorio.                                                          |
| estado      | String | Valores permitidos: activo, reservado o agotado. Por defecto: activo. |

## 5. Pruebas de funcionamiento

Los servicios fueron probados mediante Postman, verificando el funcionamiento de las solicitudes HTTP y las respuestas de la API.

Durante las pruebas se comprobó:

* Registro de usuarios.
* Inicio de sesión exitoso.
* Autenticación fallida.
* Publicación de productos.
* Consulta de productos.
* Búsqueda de productos por nombre.
* Actualización de productos.
* Eliminación de productos.
* Validación de datos incorrectos.
* Respuestas cuando un usuario o producto no existe.
* Control de registros duplicados.

Entre las respuestas obtenidas durante las pruebas se verificaron códigos HTTP como `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `404 Not Found` y `409 Conflict`, de acuerdo con cada situación.

## 6. Conclusión

El desarrollo de estos servicios web permitió establecer la comunicación entre la aplicación EcoAgrario y la base de datos MongoDB.

La API proporciona operaciones fundamentales para la gestión de usuarios y productos, incluyendo el registro y autenticación de usuarios, publicación, consulta, búsqueda, actualización y eliminación de productos agropecuarios.

Las pruebas realizadas mediante Postman permitieron comprobar el correcto funcionamiento de los diferentes endpoints y validar las respuestas de la API ante solicitudes correctas e incorrectas.
