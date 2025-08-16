# Sitio profesional de Matías Pedrós

Web estática para promocionar servicios de composición musical.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Tests

```bash
npm test
npm run test:e2e
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO`

## Envío de emails

El formulario envía una petición POST a `/.netlify/functions/sendEmail`. Esta función usa Nodemailer y las variables de entorno anteriores.

Si la función falla, se muestra un enlace `mailto:` como alternativa.

## Construcción

Sitio estático sin proceso de build. Los archivos se sirven tal cual.

