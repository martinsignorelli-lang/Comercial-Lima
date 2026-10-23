// Catálogo de productos de Comercial Lima.
// Para agregar un producto, copiá un bloque { ... } y cambiá los datos.
// - id: único, sin espacios (se usa en el pedido).
// - categoria: tiene que coincidir con un "id" de CATEGORIAS.
// - sectores: uno o más "id" de SECTORES.
// - imagen: ruta a la foto dentro de la carpeta img/ (opcional).
// - presentaciones: formatos disponibles (opcional).
// - codigo: código del producto en PowerProcess (opcional, viaja en el pedido de WhatsApp).
// - caracteristicas: lista de puntos clave (opcional).
// - ficha: ruta o link al PDF de la ficha técnica, ej. "fichas/toalla-h2.pdf" (opcional).
// - relacionados: ids de productos que combinan con este (opcional). Ej.: dispensador -> repuesto.
// - precio: número sin signos, ej. 12500 (opcional; solo se muestra si MOSTRAR_PRECIOS = true).
// IMPORTANTE: los productos de abajo son ejemplos. Reemplazalos por los reales.

window.CATEGORIAS = [
  { id: "papeles", nombre: "Papeles" },
  { id: "dispensadores", nombre: "Dispensadores" },
  { id: "panos", nombre: "Paños industriales" },
  { id: "limpieza", nombre: "Limpieza y químicos" },
  { id: "amenities", nombre: "Amenities hoteleros" },
  { id: "manos", nombre: "Cuidado de manos" },
  { id: "residuos", nombre: "Residuos" },
  { id: "descartables", nombre: "Descartables" }
];

// Precios: dejar en false mientras la página sea pública.
window.MOSTRAR_PRECIOS = false;

// Cada sector tiene su link propio: .../?sector=hoteleria
// "titulo" y "bajada" reemplazan el encabezado cuando se abre ese link.
window.SECTORES = [
  { id: "hoteleria", nombre: "Hotelería",
    titulo: "Soluciones de higiene para hoteles",
    bajada: "Habitaciones, baños, lavandería y áreas comunes: todo lo que tu hotel necesita, de un solo proveedor en Salta." },
  { id: "gastronomia", nombre: "Gastronomía",
    titulo: "Higiene para cocinas y restaurantes",
    bajada: "Papeles, paños, químicos y descartables para cocina, salón y baños." },
  { id: "salud", nombre: "Salud",
    titulo: "Higiene para clínicas y centros de salud",
    bajada: "Productos para control de infecciones, higiene de manos y limpieza de superficies." },
  { id: "lavanderia", nombre: "Lavandería",
    titulo: "Productos para lavanderías",
    bajada: "Químicos y dosificación para lavado institucional." },
  { id: "industria", nombre: "Industria",
    titulo: "Higiene para industria y minería",
    bajada: "Paños, papeles y productos de limpieza para planta, taller y comedor." },
  { id: "oficinas", nombre: "Oficinas y empresas",
    titulo: "Higiene para oficinas y empresas",
    bajada: "Baños y espacios comunes siempre equipados." }
];

window.PRODUCTOS = [
  {
    id: "papel-higienico-rollo",
    nombre: "Papel higiénico en rollo",
    marca: "Tork",
    categoria: "papeles",
    sectores: ["hoteleria", "gastronomia", "salud", "oficinas", "industria"],
    descripcion: "Papel higiénico para baños de alto tránsito.",
    presentaciones: ["Rollo tradicional", "Rollo grande"],
    imagen: "",
    relacionados: ["dispensador-higienico"]
  },
  {
    id: "toalla-interfoliada",
    nombre: "Toalla de mano interfoliada",
    marca: "Tork",
    categoria: "papeles",
    sectores: ["hoteleria", "gastronomia", "salud", "oficinas"],
    descripcion: "Toallas de papel que salen de a una para un secado higiénico.",
    presentaciones: ["Caja"],
    imagen: "",
    relacionados: ["dispensador-toallas", "jabon-liquido-manos"]
  },
  {
    id: "toalla-rollo",
    nombre: "Toalla de mano en rollo",
    marca: "Scott",
    categoria: "papeles",
    sectores: ["gastronomia", "industria", "oficinas"],
    descripcion: "Toalla de papel en rollo para dispensador.",
    presentaciones: ["Bulto"],
    imagen: ""
  },
  {
    id: "servilletas",
    nombre: "Servilletas de papel",
    marca: "Tork",
    categoria: "papeles",
    sectores: ["gastronomia", "hoteleria"],
    descripcion: "Servilletas para mesa y mostrador.",
    presentaciones: ["Paquete", "Caja"],
    imagen: ""
  },
  {
    id: "dispensador-toallas",
    nombre: "Dispensador de toallas",
    marca: "Tork",
    categoria: "dispensadores",
    sectores: ["hoteleria", "gastronomia", "salud", "oficinas", "industria"],
    descripcion: "Dispensador de pared para toallas de mano.",
    presentaciones: ["Blanco", "Negro"],
    imagen: "",
    relacionados: ["toalla-interfoliada", "toalla-rollo"]
  },
  {
    id: "dispensador-higienico",
    nombre: "Dispensador de papel higiénico",
    marca: "Tork",
    categoria: "dispensadores",
    sectores: ["hoteleria", "gastronomia", "salud", "oficinas", "industria"],
    descripcion: "Dispensador de pared para papel higiénico.",
    presentaciones: ["Blanco", "Negro"],
    imagen: "",
    relacionados: ["papel-higienico-rollo"]
  },
  {
    id: "dispensador-jabon",
    nombre: "Dispensador de jabón",
    marca: "Tork",
    categoria: "dispensadores",
    sectores: ["hoteleria", "gastronomia", "salud", "oficinas", "industria"],
    descripcion: "Dispensador de pared para jabón líquido o en espuma.",
    presentaciones: [],
    imagen: "",
    relacionados: ["jabon-liquido-manos", "alcohol-gel"]
  },
  {
    id: "panos-wypall",
    nombre: "Paños de limpieza",
    marca: "WypAll",
    categoria: "panos",
    sectores: ["industria", "gastronomia", "salud"],
    descripcion: "Paños descartables para limpieza en industria y cocina.",
    presentaciones: ["Rollo", "Caja"],
    imagen: ""
  },
  {
    id: "jabon-liquido-manos",
    nombre: "Jabón líquido para manos",
    marca: "",
    categoria: "manos",
    sectores: ["hoteleria", "gastronomia", "salud", "oficinas", "industria"],
    descripcion: "Jabón líquido para recargar dispensadores.",
    presentaciones: ["Bidón", "Cartucho"],
    imagen: "",
    relacionados: ["dispensador-jabon"]
  },
  {
    id: "alcohol-gel",
    nombre: "Alcohol en gel",
    marca: "",
    categoria: "manos",
    sectores: ["salud", "oficinas", "gastronomia", "hoteleria"],
    descripcion: "Alcohol en gel para higiene de manos.",
    presentaciones: ["Bidón", "Envase con válvula"],
    imagen: ""
  },
  {
    id: "shampoo-good-cream",
    nombre: "Shampoo para hotel",
    marca: "Good Cream",
    categoria: "amenities",
    sectores: ["hoteleria"],
    descripcion: "Amenity de línea propia, personalizable con la marca del hotel.",
    presentaciones: ["Sachet", "Frasco", "Bidón"],
    imagen: "",
    relacionados: ["acondicionador-good-cream", "jabon-tocador-good-cream"]
  },
  {
    id: "acondicionador-good-cream",
    nombre: "Acondicionador para hotel",
    marca: "Good Cream",
    categoria: "amenities",
    sectores: ["hoteleria"],
    descripcion: "Amenity de línea propia, personalizable con la marca del hotel.",
    presentaciones: ["Sachet", "Frasco", "Bidón"],
    imagen: "",
    relacionados: ["shampoo-good-cream", "jabon-tocador-good-cream"]
  },
  {
    id: "jabon-tocador-good-cream",
    nombre: "Jabón de tocador",
    marca: "Good Cream",
    categoria: "amenities",
    sectores: ["hoteleria"],
    descripcion: "Jabón individual para habitaciones de hotel.",
    presentaciones: [],
    imagen: "",
    relacionados: ["shampoo-good-cream", "acondicionador-good-cream"]
  },
  {
    id: "detergente",
    nombre: "Detergente concentrado",
    marca: "",
    categoria: "limpieza",
    sectores: ["gastronomia", "hoteleria", "industria"],
    descripcion: "Detergente para vajilla y superficies.",
    presentaciones: ["Bidón"],
    imagen: ""
  },
  {
    id: "desinfectante",
    nombre: "Desinfectante de superficies",
    marca: "",
    categoria: "limpieza",
    sectores: ["salud", "gastronomia", "hoteleria", "oficinas"],
    descripcion: "Desinfectante para pisos y superficies.",
    presentaciones: ["Bidón"],
    imagen: ""
  },
  {
    id: "detergente-lavanderia",
    nombre: "Detergente para lavandería",
    marca: "",
    categoria: "limpieza",
    sectores: ["lavanderia", "hoteleria", "salud"],
    descripcion: "Detergente para lavado de ropa blanca y mantelería.",
    presentaciones: ["Bidón"],
    imagen: "",
    relacionados: ["desinfectante"]
  },
  {
    id: "bolsas-residuos",
    nombre: "Bolsas de residuos",
    marca: "",
    categoria: "residuos",
    sectores: ["hoteleria", "gastronomia", "salud", "oficinas", "industria"],
    descripcion: "Bolsas para cestos y contenedores.",
    presentaciones: ["Varias medidas"],
    imagen: ""
  },
  {
    id: "film-cocina",
    nombre: "Film para cocina",
    marca: "Coverfilm",
    categoria: "descartables",
    sectores: ["gastronomia"],
    descripcion: "Film para envolver y conservar alimentos.",
    presentaciones: ["Rollo"],
    imagen: ""
  }
];
