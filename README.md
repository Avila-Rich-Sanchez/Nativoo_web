# NATIVO · Landing estática

Landing de una página para la hamburguesería NATIVO. Está hecha con HTML, CSS, Tailwind por CDN y JavaScript vanilla; Supabase es opcional hasta que se quiera publicar el menú real y recibir reseñas. No requiere Node, servidor propio, login ni carrito.

## Estructura

```text
.
├── index.html
├── css/styles.css
├── js/
│   ├── supabase-client.js
│   ├── menu.js
│   ├── resenas.js
│   └── whatsapp.js
├── assets/
├── supabase/
│   ├── schema.sql
│   └── seed.sql
└── README.md
```

## Vista previa

El sitio puede publicarse como archivos estáticos. Para desarrollo local, abre la carpeta con VS Code y usa una extensión de servidor estático, por ejemplo Live Server. No hace falta iniciar un backend.

Sin credenciales, la carta muestra datos de demostración y el formulario de reseñas explica que Supabase debe configurarse. Las reseñas no se simulan ni se guardan localmente.

## Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com/) y abre **SQL Editor**.
2. Ejecuta `supabase/schema.sql` para crear las tablas, índices, permisos y políticas RLS.
3. Ejecuta `supabase/seed.sql` para cargar 8 hamburguesas de ejemplo, 2 acompañamientos y 2 bebidas. Ejecuta el seed una sola vez para evitar duplicados.
4. En **Project Settings → API**, copia la URL del proyecto y la clave pública `anon` (o publishable key compatible).
5. Sustituye `TU-PROYECTO` y `TU_ANON_KEY` en `js/supabase-client.js` por esos valores. Esa clave pública está diseñada para el navegador; la seguridad depende de las políticas RLS.
6. En **Table Editor → resenas**, revisa los envíos y cambia `aprobada` a `true` solo para los comentarios que quieras publicar. Las filas pendientes no se pueden leer desde el frontend.

La integración está preparada de forma que el formulario concentra el envío en `resenas.js`. Si aparece spam, se puede cambiar esa ruta de envío por una Edge Function sin rehacer la interfaz. El MVP actual inserta directamente con la clave pública y no incluye CAPTCHA.

## Pedidos por WhatsApp

Edita `NATIVO_WHATSAPP_NUMBER` al inicio de `js/whatsapp.js` y coloca el teléfono del negocio en formato internacional, solo con dígitos y sin `+`, espacios ni guiones (por ejemplo, `5491112345678`). El botón del Hero y el botón flotante usan el mismo número y abren WhatsApp con un mensaje para coordinar el pedido. Sin número configurado, WhatsApp permite elegir un contacto manualmente.

## Seguridad

- Nunca pongas `service_role` en HTML, JavaScript ni en variables expuestas al navegador.
- RLS permite leer solo platos disponibles y reseñas aprobadas.
- La clave pública solo puede insertar reseñas pendientes. No puede aprobarlas ni modificar/eliminar filas.
- Las políticas no reemplazan medidas anti-spam. La Opción A es un MVP moderado manualmente; la Edge Function queda como siguiente paso si hiciera falta.

## Personalizar antes del lanzamiento

- **Logo:** coloca el archivo proporcionado en `assets/logo-nativo.png`. Si es SVG o tiene otro nombre/extensión, actualiza las tres referencias `assets/logo-nativo.png` en `index.html`. El wordmark de texto es el fallback mientras no esté el archivo.
- **Ciudad y SEO:** cambia título, descripción, Open Graph, dirección, horarios y el texto `Tu ciudad` de `index.html` por la ubicación real. Configura también el idioma/locale si corresponde.
- **Mapa:** reemplaza la URL del iframe y el enlace “Cómo llegar” por la ubicación exacta. Para el iframe, usa el código de inserción de Google Maps.
- **Redes:** sustituye los enlaces de Instagram/Facebook en `index.html` por los perfiles oficiales.
- **Moneda y carta:** actualiza nombres, precios, descripciones e imágenes del seed y de `menu.js` si Supabase todavía no está conectado. Los precios de ejemplo son ilustrativos; `menu.js` los presenta como importes enteros con separador local.
- **Imágenes:** las fotos de ejemplo son remotas y cargan bajo demanda en la carta. Para producción, sube imágenes WebP optimizadas a un hosting/CDN propio o a Supabase Storage y actualiza `imagen_url`.

## Deploy estático

Publica la raíz del repositorio en Netlify, Vercel, GitHub Pages o Cloudflare Pages. No hay comando de build ni carpeta de salida: `index.html` está en la raíz. Revisa que las URLs y políticas de Supabase estén configuradas antes del lanzamiento. Tailwind CDN es apropiado para esta demo; si el proyecto crece, conviene pasar a un build estático de Tailwind para reducir CSS y depender menos del CDN.