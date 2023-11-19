# PROYECTO FINAL - Primera entrega

**Script para levantar servidor**: npm run test

### Implementación de multer:

**POST /uploads**

Enviar desde Postman en formato form-data un archivo de imagen con clave 'image' y el código de un producto existente con clave 'code'.

`Body`

````
image = tomate.jpg
code = abc789
````

La imagen se guardará en /static/images y se agregará la url de la imagen en el campo "thumbnail" del producto en cuestión. 