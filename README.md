# Comercial Lima · Catálogo digital

Catálogo web de productos de higiene institucional de Comercial Lima. El cliente busca y filtra productos, arma su pedido y lo envía por WhatsApp (+54 387 468 1380) para pedir presupuesto. Los precios están desactivados por defecto (`MOSTRAR_PRECIOS` en `data/productos.js`).

## Qué hace

- Búsqueda por nombre, marca o descripción (sin importar tildes).
- Filtros por categoría, sector (hotelería, gastronomía, salud…) y marca.
- Ficha de cada producto con código, características, presentaciones, sectores y botón a la ficha técnica en PDF.
- **Link por rubro** con encabezado propio: `?sector=hoteleria`, `?sector=gastronomia`, `?sector=salud`, `?sector=lavanderia`, `?sector=industria`, `?sector=oficinas`. Botón "Compartir link" para mandarlo por WhatsApp.
- **Combina con**: en cada producto, los relacionados (dispensador → repuesto) con botón para sumarlos al pedido.
- Pedido con cantidades; se guarda en el navegador aunque se cierre la página.
- Botón "Pedir presupuesto por WhatsApp" que arma el mensaje con la lista, el código de PowerProcess y el rubro.
- Se adapta a celular y se puede imprimir o guardar como PDF (Ctrl + P).

## Cómo verlo

Abrí `index.html` con doble clic: funciona sin instalar nada.

## Cómo cargar o cambiar productos

Todo está en **`data/productos.js`**. Cada producto es un bloque así:

```js
{
  id: "toalla-interfoliada",          // único, sin espacios
  nombre: "Toalla de mano interfoliada",
  marca: "Tork",
  categoria: "papeles",               // id de una categoría de la lista CATEGORIAS
  sectores: ["hoteleria", "salud"],   // ids de la lista SECTORES
  descripcion: "Texto corto.",
  presentaciones: ["Caja"],           // opcional
  imagen: "img/toalla-interfoliada.jpg", // opcional; sin foto se muestra el trébol Lima
  codigo: "12345",                      // opcional; código en PowerProcess
  caracteristicas: ["Doble hoja", "Para dispensador H2"], // opcional
  ficha: "fichas/toalla-interfoliada.pdf", // opcional; PDF en la carpeta fichas/
  relacionados: ["dispensador-toallas"],   // opcional; ids que combinan
  precio: 12500                          // opcional; solo si MOSTRAR_PRECIOS = true
}
```

Las fotos van en la carpeta `img/` (cuadradas, fondo blanco o transparente, idealmente ~800×800 px).

> ⚠️ Los productos cargados ahora son **ejemplos** para mostrar el funcionamiento. Reemplazalos por el listado real.

## Publicarlo en internet (gratis)

Con GitHub Pages: en el repositorio, **Settings → Pages → Source: Deploy from a branch**, elegí la rama y la carpeta `/ (root)`. En unos minutos queda online en `https://<usuario>.github.io/Comercial-Lima/`. También se puede subir la carpeta tal cual a cualquier hosting (por ejemplo, el de comerciallima.com.ar).

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | Estructura de la página |
| `styles.css` | Estilo (verde #008200, Inter) |
| `app.js` | Búsqueda, filtros, pedido y WhatsApp |
| `data/productos.js` | Productos, categorías y sectores |
| `img/` | Fotos de productos |
| `fichas/` | Fichas técnicas en PDF |
