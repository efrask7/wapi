# WAPI - Uptime Kuma WhatsApp API Webhook Integration

Una API para enviar mensajes de WhatsApp a través de un Webhook de Uptime Kuma.

## Requisitos

- Node.js v16 o superior
- NPM
- Uptime Kuma

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/efrask7/wapi.git
cd wapi
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
Crear un archivo `.env` con las siguientes variables:
```env
PORT=9090
API_KEY=tu_api_key_secreta
WHATSAPP_CLIENT=nombre_cliente <- ID Unico para identificar la sesión
```

4. Configurar la base de datos con cualquiera de los 2 comandos
```bash
npx prisma migrate dev
npx prisma db push
```

5. Dependencias para Linux Ubuntu (requeridas)
```bash
sudo apt-get install chromium-browser
sudo apt-get install libasound2
sudo apt-get install libgbm1
```

## Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

## Endpoints

### POST /api/alert
Envía una alerta a todos los usuarios registrados.

Headers:
```
Authorization: API_KEY
Content-Type: application/json
```

Body: *se envia automaticamente por Uptime Kuma*

Es posible ignorar los usuarios de la base de datos y enviar la alerta a numeros especificos por medio de la siguiente estructura en el **Body** *(los numeros deben estar separados por comas)*:
```json
{
  "msg": "{{ msg }}",
  "toUsers": "59812345678, 59887654321"
}
```
De lo contrario, se enviará la alerta a todos los usuarios registrados en la base de datos.

### POST /api/user
Registra un nuevo usuario para recibir alertas.

Headers:
```
Authorization: API_KEY
```

Body: *(importante que el número de teléfono sea válido e incluya la región)*
```json
{
  "phone": "598912345678" 
}
```

### GET /api/users
Obtiene la lista de usuarios registrados.

Headers:
```
Authorization: API_KEY
```

### DELETE /api/user
Elimina un usuario de la base de datos.

Headers:
```
Authorization: API_KEY
```

Body:
```json
{
  "phone": "598912345678" 
}
```

## Notas
- Al iniciar por primera vez, se deberá escanear un código QR para autenticar WhatsApp
- La sesión se mantiene entre reinicios usando LocalAuth *(sesion identificada por WHATSAPP_CLIENT)*

## Importante
> From [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js):
> 
> This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates. The official WhatsApp website can be found at whatsapp.com. "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners. Also it is not guaranteed you will not be blocked by using this method. WhatsApp does not allow bots or unofficial clients on their platform, so this shouldn't be considered totally safe.

*Este proyecto no esta afiliado, asociado, authorizado o conectado de ninguna manera por Whatsapp o sus afiliados. La página oficial de Whatsapp puede ser encontrada en [whatsapp.com](https://whatsapp.com). "WhatsApp" y sus nombres relacionados, marcas, emblemas e imágenes son registradas marcas de sus respectivos dueños. Tampoco se garantiza que no seras bloqueado por usar este método. WhatsApp no permite bots o clientes no oficiales en su plataforma, por lo que esto no debe considerarse totalmente seguro.*
## Créditos

- [Uptime Kuma](https://github.com/louislam/uptime-kuma)
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [Prisma](https://www.prisma.io/)