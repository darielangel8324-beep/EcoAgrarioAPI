# DOCUMENTACIÓN DE LOS SERVICIOS WEB – ECOAGRARIO

**Proyecto:** EcoAgrario
**Evidencia:** GA7-220501096-AA5-EV03 – Diseño y desarrollo de servicios web
**Aprendiz:** Dariel Angel Verjel Martinez
**Programa:** Análisis y Desarrollo de Software (ADSO)
**Tecnologías:** Node.js, Express, MongoDB y Mongoose.

## 1. Introducción

EcoAgrario es una aplicación orientada a facilitar la comercialización de productos agropecuarios, permitiendo que productores y compradores puedan establecer contacto directo, sin intermediarios.

Para apoyar el funcionamiento de la aplicación se desarrolló una API REST utilizando Node.js y Express, con MongoDB como sistema de almacenamiento de datos.

La API permite registrar usuarios, validar el inicio de sesión, publicar productos, consultar el listado de productos y realizar búsquedas por nombre.

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

Durante las pruebas se comprobó el registro e inicio de sesión de usuarios, la publicación y consulta de productos, las búsquedas por nombre y las respuestas de validación ante solicitudes incorrectas o sin resultados.

## 6. Conclusión

El desarrollo de estos servicios web permitió establecer la comunicación entre la aplicación EcoAgrario y la base de datos MongoDB.

La API proporciona las operaciones fundamentales para la gestión de usuarios y productos, facilitando la consulta y publicación de productos agropecuarios y sirviendo como base para futuras mejoras del proyecto.
