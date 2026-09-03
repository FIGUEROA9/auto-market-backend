# AutoMarket

Marketplace de compra, venta y permuta de vehículos entre particulares en Colombia. Quien publica es dueño del anuncio: recibe ofertas, contraofertas y decide. AutoMarket no intermedia dinero ni tramita el traspaso.

## Qué puede hacer un usuario

- Crear cuenta con nombres, apellidos, documento, ciudad, teléfono, WhatsApp, dirección y correo.
- Entrar con correo y contraseña, o con Google / X.
- Completar el perfil, cambiar todos sus datos y cambiar su contraseña.
- Pedir verificación de identidad subiendo el frente y el reverso de la cédula.
- Publicar un vehículo (venta, permuta o ambas) con hasta 6 fotos.
- Registrar SOAT, tecnomecánica, impuestos (si están al día, cuáles no y el valor) y comparendos.
- Si acepta permuta, indicar si recibe cualquier vehículo o filtrar por marca, línea, año, kilometraje, estado, combustible, caja, carrocería, ciudad y rango de precio.
- Ver el catálogo público, filtrar y guardar favoritos.
- Ofertar compra o permuta, y contraofertar.
- Escribir al vendedor por WhatsApp o correo con un mensaje ya armado.
- Enviar un mensaje general desde Contacto.

Un anuncio **no es público** hasta que un administrador lo apruebe, salvo que el vendedor ya esté verificado. Los verificados publican de inmediato y llevan un sello en el perfil y en cada anuncio.

## Qué puede hacer un administrador

El primer usuario real que se registra queda como administrador. Desde `/admin` puede:

- Ver métricas (usuarios, anuncios, ofertas, contactos, cola de revisión y verificaciones).
- Editar datos de cualquier usuario **excepto la contraseña**.
- Cambiar el rol (admin / cliente).
- Deshabilitar o volver a habilitar una cuenta.
- Eliminar un usuario (borra anuncios, ofertas y el acceso).
- Aprobar o rechazar verificaciones de cédula. Si se aprueba, los anuncios que tenía en cola salen al catálogo.
- Aprobar, pausar, marcar vendido o rechazar anuncios.
- Revisar ofertas y mensajes de contacto.

## Organización del proyecto

```
src/
  routes/                 Páginas (una ruta = un archivo)
    index.tsx             Inicio y destacados
    catalogo.tsx          Búsqueda pública
    vehiculo.$id.tsx      Ficha del vehículo
    publicar.tsx          Alta de anuncio
    login.tsx             Entrar / crear cuenta
    perfil.tsx            Datos, contraseña y verificación
    mis-anuncios.tsx      Inventario propio
    ofertas.tsx           Ofertas enviadas y recibidas
    favoritos.tsx
    contacto.tsx
    terminos.tsx
    admin.tsx             Layout del panel
    admin/                Inicio, usuarios, verificaciones, anuncios, ofertas, contactos
    api/auth/$.ts         Autenticación
  components/             Cabecera, tarjetas, galería, papeles, sello verificado
  lib/
    market.ts             Toda la lógica de negocio (consultas y mutaciones)
    format.ts             Moneda, etiquetas, WhatsApp / correo
    swap.ts               Preferencias de permuta y coincidencia
    images.ts             Compresión de fotos en el navegador
    auth/                 Sesión (no modificar salvo email-password.ts)
    db.ts                 Postgres / base embebida de desarrollo
  styles.css              Tokens de color y tipografía
migrations/
  0001_auth.sql           Tablas de sesión
  0002_automarket.sql     Perfiles, vehículos, ofertas, favoritos, contactos
  0003_verificacion_y_papeles.sql
                          Verificación, papeles, galería, contraofertas
public/vehicles/          Fotos de catálogo y de demostración
```

Las rutas se generan a partir de los archivos en `src/routes`. El servidor de desarrollo las descubre solo.

## Modelo de datos

### `profiles`

Cuenta de la aplicación, ligada al id de autenticación.

| Campo | Uso |
|---|---|
| `user_id` | Id de la sesión |
| `first_name`, `last_name`, `display_name` | Identidad visible |
| `email`, `phone`, `whatsapp`, `city`, `address` | Contacto |
| `document_type`, `document_number` | CC, CE, NIT o pasaporte |
| `id_front_url`, `id_back_url` | Fotos de cédula |
| `verification_status` | `sin_verificar`, `pendiente`, `verificado`, `rechazado` |
| `account_status` | `activo` o `deshabilitado` |
| `role` | `admin` o `cliente` |

### `vehicles`

| Campo | Uso |
|---|---|
| `brand`, `model` | Marca y **línea** de vehículo (`model` es la línea) |
| `images` | JSON con hasta 6 fotos; `image_url` es la portada |
| `listing_type` | `venta`, `permuta`, `ambos` |
| `status` | `pendiente_revision`, `activo`, `pausado`, `vendido`, `rechazado` |
| `soat_expires`, `tecno_expires` | Fechas |
| `taxes_current`, `taxes_detail`, `taxes_amount` | Impuestos |
| `fines_current`, `fines_detail`, `fines_amount` | Comparendos |
| `swap_any`, `swap_prefs` | Filtro de permuta (JSON) |

El catálogo público solo lista `status = 'activo'`.

### `offers` y `offer_events`

Una oferta nace en `pendiente`. Cada movimiento (oferta, contraoferta, aceptación, rechazo) queda en `offer_events`. `last_actor_id` indica a quién le toca responder. Estados: `pendiente`, `contraoferta`, `aceptada`, `rechazada`, `cerrada`.

Si se acepta, el anuncio pasa a `vendido` y el resto de ofertas abiertas de ese vehículo se cierran.

### `favorites` y `contacts`

Favoritos por usuario. Mensajes del formulario de contacto, visibles en el panel.

## Flujos

### Registro y perfil

1. En `/login` elige Crear cuenta y llena nombres, apellidos, documento, teléfono, WhatsApp, ciudad, dirección, correo y contraseña.
2. El primer usuario real queda como administrador y verificado.
3. En `/perfil` puede corregir todo, incluida la contraseña.
4. Para verificarse sube frente y reverso de la cédula. El administrador decide en `/admin/verificaciones`.

### Publicación

1. En `/publicar` completa ficha, línea (no “modelo”), papeles y galería (máximo 6).
2. Si elige permuta o ambos, marca “recibo cualquier vehículo” o arma el filtro.
3. Si está verificado (o es admin) el anuncio sale `activo`. Si no, queda `pendiente_revision`.
4. En `/mis-anuncios` puede pausar, marcar vendido o borrar. No puede autoaprobar lo que está en revisión.

### Oferta y contraoferta

1. Desde la ficha, compra (monto) o permuta (uno de tus anuncios activos, con diferencia opcional).
2. Si el carro ofertado no encaja con el filtro del vendedor, se avisa pero no se bloquea.
3. En `/ofertas` la otra parte acepta, rechaza o contraoferta. No se puede responder dos veces seguidas: hay que esperar el turno.

### Contacto directo

En la ficha hay botones de WhatsApp y correo si el vendedor dejó teléfono o email. El texto sale prearmado con título y precio.

## Interfaz

- Paleta oscura, acento dorado, tipografías Fraunces (títulos) y Outfit (cuerpo).
- La galería recorre sola las fotos, se puede pausar, pasar a mano y abrir zoom.
- El sello **Verificado** aparece en tarjetas, ficha y perfil.
- El panel de papeles marca SOAT, tecnomecánica, impuestos y comparendos al día o con saldo.

## Stack

- React 19 y TanStack Start / Router / Query
- TypeScript
- Tailwind CSS v4
- Better Auth (correo, Google, X)
- Postgres (Neon en producción; base embebida en desarrollo)
- Kysely / `pg` a través de `@/lib/db`

La lógica de negocio vive en `src/lib/market.ts`. Las páginas no hablan con la base: llaman funciones de servidor.

## Convenciones

- Textos de producto en español de Colombia.
- En la interfaz se dice **línea de vehículo**. En base de datos la columna sigue llamándose `model`.
- Los montos son pesos colombianos, sin decimales.
- Una cuenta deshabilitada no publica ni oferta; sí puede ver el perfil.
- El administrador no cambia contraseñas ajenas.

## Datos de demostración

La migración `0002` carga un catálogo de ejemplo (Corolla, CX-5, Onix, Duster, Sportage, Frontier, Ranger, Tiguan, Hilux, Mazda 3) con fotos en `public/vehicles/`. La `0003` les agrega galería, papeles y, en algunos, deudas de impuestos o comparendos y filtro de permuta.

## Cómo trabajar el código

- Páginas nuevas: un archivo en `src/routes`.
- Campos nuevos de vehículo o usuario: migración `0004_…sql` (no reescribir migraciones ya aplicadas) y tipos en `src/lib/market.ts`.
- Estilos: tokens en `src/styles.css`, no colores sueltos en JSX.

## Términos

El marketplace no es parte del contrato de compraventa. La verificación identifica a la persona, no certifica el estado del vehículo. El detalle legal está en `/terminos`.
