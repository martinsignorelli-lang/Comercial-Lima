// Catálogo de productos de Comercial Lima.
// Para agregar un producto, copiá un bloque { ... } y cambiá los datos.
// - id: único, sin espacios (se usa en el pedido).
// - categoria: tiene que coincidir con un "id" de CATEGORIAS.
// - sectores: uno o más "id" de SECTORES.
// - imagen: ruta a la foto dentro de la carpeta img/ (opcional).
// - presentaciones: formatos disponibles (opcional).
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

window.SECTORES = [
  { id: "hoteleria", nombre: "Hotelería" },
  { id: "gastronomia", nombre: "Gastronomía" },
  { id: "salud", nombre: "Salud" },
  { id: "lavanderia", nombre: "Lavandería" },
  { id: "industria", nombre: "Industria" },
  { id: "oficinas", nombre: "Oficinas y empresas" }
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
    imagen: ""
  },
  {
    id: "toalla-interfoliada",
    nombre: "Toalla de mano interfoliada",
    marca: "Tork",
    categoria: "papeles",
    sectores: ["hoteleria", "gastronomia", "salud", "oficinas"],
    descripcion: "Toallas de papel que salen de a una para un secado higiénico.",
    presentaciones: ["Caja"],
    imagen: ""
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
    imagen: ""
  },
  {
    id: "dispensador-higienico",
    nombre: "Dispensador de papel higiénico",
    marca: "Tork",
    categoria: "dispensadores",
    sectores: ["hoteleria", "gastronomia", "salud", "oficinas", "industria"],
    descripcion: "Dispensador de pared para papel higiénico.",
    presentaciones: ["Blanco", "Negro"],
    imagen: ""
  },
  {
    id: "dispensador-jabon",
    nombre: "Dispensador de jabón",
    marca: "Tork",
    categoria: "dispensadores",
    sectores: ["hoteleria", "gastronomia", "salud", "oficinas", "industria"],
    descripcion: "Dispensador de pared para jabón líquido o en espuma.",
    presentaciones: [],
    imagen: ""
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
    imagen: ""
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
    imagen: ""
  },
  {
    id: "acondicionador-good-cream",
    nombre: "Acondicionador para hotel",
    marca: "Good Cream",
    categoria: "amenities",
    sectores: ["hoteleria"],
    descripcion: "Amenity de línea propia, personalizable con la marca del hotel.",
    presentaciones: ["Sachet", "Frasco", "Bidón"],
    imagen: ""
  },
  {
    id: "jabon-tocador-good-cream",
    nombre: "Jabón de tocador",
    marca: "Good Cream",
    categoria: "amenities",
    sectores: ["hoteleria"],
    descripcion: "Jabón individual para habitaciones de hotel.",
    presentaciones: [],
    imagen: ""
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
    imagen: ""
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
