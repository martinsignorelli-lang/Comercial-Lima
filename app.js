(function () {
  "use strict";

  var WHATSAPP = "543874681380";
  var CLAVE_PEDIDO = "lima-pedido";

  var productos = window.PRODUCTOS || [];
  var categorias = window.CATEGORIAS || [];
  var sectores = window.SECTORES || [];

  var nombreCategoria = indexar(categorias);
  var nombreSector = indexar(sectores);
  var porId = {};
  productos.forEach(function (p) { porId[p.id] = p; });

  var MOSTRAR_PRECIOS = !!window.MOSTRAR_PRECIOS;
  var sectorPorId = {};
  sectores.forEach(function (s) { sectorPorId[s.id] = s; });

  var filtro = { texto: "", categoria: "", sector: "", marca: "" };
  var params = new URLSearchParams(location.search);
  if (sectorPorId[params.get("sector")]) filtro.sector = params.get("sector");
  // Cada línea del pedido: { id, presentacion, cantidad }
  var pedido = cargarPedido();

  var $ = function (id) { return document.getElementById(id); };
  var grid = $("grid");

  var TREBOL = '<svg viewBox="0 0 258 262" aria-hidden="true"><g fill="currentColor"><path d="M196,11.8h0c31.9,0,57.7,25.9,57.7,57.7h0c0,31.9-25.9,57.8-57.7,57.8h-57.8v-57.8c0-31.9,25.9-57.7,57.7-57.7Z"/><path d="M138.2,146.4h57.8c31.9,0,57.7,25.9,57.7,57.7h0c0,31.9-25.9,57.8-57.7,57.8h0c-31.9,0-57.7-25.9-57.7-57.7v-57.8h0Z"/><path d="M3.6,11.8h57.8c31.9,0,57.7,25.9,57.7,57.7h0c0,31.9-25.9,57.8-57.7,57.8h0c-31.9,0-57.7-25.9-57.7-57.7V11.8h0Z" transform="translate(122.7 139) rotate(-180)"/><path d="M61.4,146.4h0c31.9,0,57.7,25.9,57.7,57.7h0c0,31.9-25.9,57.8-57.7,57.8H3.6v-57.8c0-31.9,25.9-57.7,57.7-57.7Z" transform="translate(122.7 408.3) rotate(-180)"/></g></svg>';

  function indexar(lista) {
    var m = {};
    lista.forEach(function (x) { m[x.id] = x.nombre; });
    return m;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function precio(p) {
    if (!MOSTRAR_PRECIOS || typeof p.precio !== "number") return "";
    return '<span class="precio">$ ' + p.precio.toLocaleString("es-AR") + ' <small>+ IVA</small></span>';
  }

  // ---------- Segmento (link por sector) ----------

  var HERO = null;
  function aplicarSector() {
    var h1 = document.querySelector(".hero h1"), sub = document.querySelector(".hero-sub"), eb = document.querySelector(".eyebrow");
    if (!HERO) HERO = { h1: h1.textContent, sub: sub.textContent, eb: eb.textContent };
    var s = sectorPorId[filtro.sector];
    h1.textContent = s && s.titulo ? s.titulo : HERO.h1;
    sub.textContent = s && s.bajada ? s.bajada : HERO.sub;
    eb.textContent = s ? "Catálogo · " + s.nombre : HERO.eb;
    $("sector").value = filtro.sector;
    var url = location.pathname + (filtro.sector ? "?sector=" + filtro.sector : "");
    try { history.replaceState(null, "", url); } catch (e) { /* sin historial */ }
    document.title = (s ? s.nombre + " · " : "Catálogo · ") + "Comercial Lima";
  }

  function compartir() {
    var s = sectorPorId[filtro.sector];
    var url = location.origin + location.pathname + (filtro.sector ? "?sector=" + filtro.sector : "");
    var titulo = s ? "Catálogo " + s.nombre + " · Comercial Lima" : "Catálogo · Comercial Lima";
    if (navigator.share) {
      navigator.share({ title: titulo, url: url }).catch(function () {});
      return;
    }
    var hecho = function () { avisar("Link copiado: " + url); };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(hecho, function () { prompt("Copiá el link:", url); });
    else prompt("Copiá el link:", url);
  }

  function normalizar(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function imagen(p) {
    if (p.imagen) return '<img src="' + esc(p.imagen) + '" alt="' + esc(p.nombre) + '" loading="lazy">';
    return '<div class="ph">' + TREBOL + '<span>' + esc(nombreCategoria[p.categoria] || "") + "</span></div>";
  }

  // ---------- Filtros ----------

  function armarFiltros() {
    var chips = [{ id: "", nombre: "Todo" }].concat(categorias.filter(function (c) {
      return productos.some(function (p) { return p.categoria === c.id; });
    }));
    $("categorias").innerHTML = chips.map(function (c) {
      return '<button class="chip" role="tab" type="button" data-cat="' + esc(c.id) + '" aria-selected="' +
        (c.id === filtro.categoria) + '">' + esc(c.nombre) + "</button>";
    }).join("");

    $("sector").insertAdjacentHTML("beforeend", sectores.map(function (s) {
      return '<option value="' + esc(s.id) + '">' + esc(s.nombre) + "</option>";
    }).join(""));

    var marcas = productos.map(function (p) { return p.marca; })
      .filter(function (m, i, a) { return m && a.indexOf(m) === i; })
      .sort(function (a, b) { return a.localeCompare(b, "es"); });
    $("marca").insertAdjacentHTML("beforeend", marcas.map(function (m) {
      return '<option value="' + esc(m) + '">' + esc(m) + "</option>";
    }).join(""));
  }

  function coincide(p) {
    if (filtro.categoria && p.categoria !== filtro.categoria) return false;
    if (filtro.sector && (p.sectores || []).indexOf(filtro.sector) === -1) return false;
    if (filtro.marca && p.marca !== filtro.marca) return false;
    if (filtro.texto) {
      var texto = normalizar([p.nombre, p.marca, p.codigo, p.descripcion, nombreCategoria[p.categoria]].concat(p.caracteristicas || []).join(" "));
      return normalizar(filtro.texto).split(/\s+/).every(function (t) { return texto.indexOf(t) !== -1; });
    }
    return true;
  }

  // ---------- Grilla ----------

  function render() {
    var lista = productos.filter(coincide);
    $("resultado").textContent = lista.length === 1 ? "1 producto" : lista.length + " productos";
    if (!lista.length) {
      grid.innerHTML = '<div class="vacio"><strong>No encontramos productos</strong>' +
        "Probá con otra búsqueda o consultanos por WhatsApp: seguro lo tenemos.</div>";
      return;
    }
    grid.innerHTML = lista.map(function (p) {
      var cant = cantidadEnPedido(p.id);
      return '<article class="card">' +
        '<button class="card-img" type="button" data-ver="' + esc(p.id) + '" aria-label="Ver ' + esc(p.nombre) + '">' + imagen(p) + "</button>" +
        '<div class="card-body">' +
        '<span class="card-marca">' + esc(p.marca) + "</span>" +
        '<h3><button type="button" data-ver="' + esc(p.id) + '">' + esc(p.nombre) + "</button></h3>" +
        "<p>" + esc(p.descripcion) + "</p>" +
        precio(p) +
        '<div class="card-acciones"><button class="btn-agregar' + (cant ? " en-pedido" : "") + '" type="button" data-agregar="' + esc(p.id) + '">' +
        (cant ? "✓ En el pedido (" + cant + ")" : "Agregar al pedido") + "</button></div>" +
        "</div></article>";
    }).join("");
  }

  // ---------- Detalle ----------

  function verDetalle(id) {
    var p = porId[id];
    if (!p) return;
    var pres = p.presentaciones || [];
    var carac = p.caracteristicas || [];
    var rel = (p.relacionados || []).map(function (id) { return porId[id]; }).filter(Boolean);
    $("detalleBody").innerHTML =
      '<div class="modal-img">' + imagen(p) + "</div>" +
      '<div class="modal-info">' +
      '<span class="card-marca">' + esc(p.marca) + "</span>" +
      '<h2 id="detalleNombre">' + esc(p.nombre) + "</h2>" +
      (p.codigo ? '<span class="codigo">Código ' + esc(p.codigo) + "</span>" : "") +
      "<p>" + esc(p.descripcion) + "</p>" +
      precio(p) +
      (carac.length ? '<h4>Características</h4><ul class="caracteristicas">' + carac.map(function (c) {
        return "<li>" + esc(c) + "</li>";
      }).join("") + "</ul>" : "") +
      (p.ficha ? '<a class="btn-ficha" href="' + esc(p.ficha) + '" target="_blank" rel="noopener">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 12v6m-3-3 3 3 3-3"/></svg>' +
        "Ficha técnica (PDF)</a>" : "") +
      (p.fds ? '<a class="btn-ficha btn-fds" href="' + esc(p.fds) + '" target="_blank" rel="noopener">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="M12 8v5m0 3h.01"/></svg>' +
        "Hoja de seguridad (PDF)</a>" : "") +
      '<h4>Categoría</h4><div class="etiquetas"><span class="etiqueta">' + esc(nombreCategoria[p.categoria] || "") + "</span></div>" +
      ((p.sectores || []).length ? '<h4>Ideal para</h4><div class="etiquetas">' + p.sectores.map(function (s) {
        return '<span class="etiqueta">' + esc(nombreSector[s] || s) + "</span>";
      }).join("") + "</div>" : "") +
      (pres.length ? '<h4>Presentación</h4><div class="presentaciones">' + pres.map(function (x, i) {
        return '<label><input type="radio" name="pres" value="' + esc(x) + '"' + (i === 0 ? " checked" : "") + ">" + esc(x) + "</label>";
      }).join("") + "</div>" : "") +
      '<div class="modal-acciones">' +
      '<div class="cantidad"><button type="button" data-menos aria-label="Menos">−</button>' +
      '<input id="detalleCant" type="number" min="1" value="1" inputmode="numeric" aria-label="Cantidad">' +
      '<button type="button" data-mas aria-label="Más">+</button></div>' +
      '<button class="btn-agregar" type="button" data-agregar-detalle="' + esc(p.id) + '">Agregar al pedido</button>' +
      "</div>" +
      (rel.length ? '<div class="combina"><h4>Combina con</h4>' + rel.map(function (r) {
        var en = cantidadEnPedido(r.id);
        return '<div class="combina-item"><button class="combina-img" type="button" data-ver-rel="' + esc(r.id) + '" aria-label="Ver ' + esc(r.nombre) + '">' + imagen(r) + "</button>" +
          '<button class="combina-nombre" type="button" data-ver-rel="' + esc(r.id) + '"><b>' + esc(r.nombre) + "</b><span>" + esc(r.marca) + "</span></button>" +
          '<button class="combina-add' + (en ? " en-pedido" : "") + '" type="button" data-agregar-rel="' + esc(r.id) + '" aria-label="Agregar ' + esc(r.nombre) + '">' + (en ? "✓" : "+") + "</button></div>";
      }).join("") + "</div>" : "") +
      "</div>";
    $("detalle").showModal();
  }

  // ---------- Pedido ----------

  function cargarPedido() {
    try {
      var guardado = JSON.parse(localStorage.getItem(CLAVE_PEDIDO) || "[]");
      return Array.isArray(guardado) ? guardado.filter(function (l) { return porId[l.id]; }) : [];
    } catch (e) {
      return [];
    }
  }

  function guardarPedido() {
    try { localStorage.setItem(CLAVE_PEDIDO, JSON.stringify(pedido)); } catch (e) { /* sin almacenamiento */ }
  }

  function cantidadEnPedido(id) {
    return pedido.reduce(function (t, l) { return l.id === id ? t + l.cantidad : t; }, 0);
  }

  function agregar(id, presentacion, cantidad) {
    var p = porId[id];
    if (!p) return;
    if (presentacion === undefined) presentacion = (p.presentaciones || [])[0] || "";
    var linea = pedido.find(function (l) { return l.id === id && l.presentacion === presentacion; });
    if (linea) linea.cantidad += cantidad;
    else pedido.push({ id: id, presentacion: presentacion, cantidad: cantidad });
    actualizar();
    avisar("Agregaste " + p.nombre + (presentacion ? " · " + presentacion : ""));
    var btn = $("abrirPedido");
    btn.classList.remove("pulso");
    void btn.offsetWidth;
    btn.classList.add("pulso");
  }

  function actualizar() {
    guardarPedido();
    $("contador").textContent = pedido.reduce(function (t, l) { return t + l.cantidad; }, 0);
    renderPedido();
    render();
  }

  function renderPedido() {
    $("enviar").disabled = !pedido.length;
    $("vaciar").hidden = !pedido.length;
    if (!pedido.length) {
      $("items").innerHTML = '<p class="panel-vacio">Todavía no agregaste productos.<br>Elegí del catálogo y armá tu pedido.</p>';
      return;
    }
    $("items").innerHTML = pedido.map(function (l, i) {
      var p = porId[l.id];
      return '<div class="item"><div class="item-info"><b>' + esc(p.nombre) + "</b>" +
        "<span>" + esc([p.marca, l.presentacion].filter(Boolean).join(" · ")) + "</span><br>" +
        '<button class="item-quitar" type="button" data-quitar="' + i + '">Quitar</button></div>' +
        '<div class="cantidad"><button type="button" data-linea="' + i + '" data-delta="-1" aria-label="Menos">−</button>' +
        '<input type="number" min="1" value="' + l.cantidad + '" data-cant="' + i + '" inputmode="numeric" aria-label="Cantidad">' +
        '<button type="button" data-linea="' + i + '" data-delta="1" aria-label="Más">+</button></div></div>';
    }).join("");
  }

  function abrirPedido(abrir) {
    $("panel").classList.toggle("abierto", abrir);
    $("panel").setAttribute("aria-hidden", String(!abrir));
    $("overlay").hidden = !abrir;
    document.body.style.overflow = abrir ? "hidden" : "";
    if (abrir) $("cerrarPedido").focus();
  }

  function mensajeWhatsApp() {
    var cliente = $("cliente").value.trim();
    var comentario = $("comentario").value.trim();
    var lineas = ["¡Hola Comercial Lima! Quiero pedir presupuesto por estos productos:", ""];
    pedido.forEach(function (l) {
      var p = porId[l.id];
      var detalle = [p.marca, l.presentacion].filter(Boolean).join(" · ");
      lineas.push("• " + l.cantidad + " × " + (p.codigo ? "[" + p.codigo + "] " : "") + p.nombre + (detalle ? " (" + detalle + ")" : ""));
    });
    if (sectorPorId[filtro.sector]) lineas.push("", "Rubro: " + sectorPorId[filtro.sector].nombre);
    if (cliente) lineas.push((sectorPorId[filtro.sector] ? "" : "\n") + "Nombre / empresa: " + cliente);
    if (comentario) lineas.push("Comentarios: " + comentario);
    return lineas.join("\n");
  }

  var tiempoAviso;
  function avisar(texto) {
    var t = $("toast");
    t.textContent = texto;
    t.classList.add("visible");
    clearTimeout(tiempoAviso);
    tiempoAviso = setTimeout(function () { t.classList.remove("visible"); }, 2200);
  }

  // ---------- Eventos ----------

  var demora;
  $("buscar").addEventListener("input", function (e) {
    clearTimeout(demora);
    demora = setTimeout(function () { filtro.texto = e.target.value.trim(); render(); }, 120);
  });
  $("sector").addEventListener("change", function (e) { filtro.sector = e.target.value; aplicarSector(); render(); });
  $("compartir").addEventListener("click", compartir);
  $("marca").addEventListener("change", function (e) { filtro.marca = e.target.value; render(); });
  $("categorias").addEventListener("click", function (e) {
    var chip = e.target.closest("[data-cat]");
    if (!chip) return;
    filtro.categoria = chip.dataset.cat;
    this.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-selected", String(c === chip)); });
    render();
  });

  grid.addEventListener("click", function (e) {
    var ver = e.target.closest("[data-ver]");
    var add = e.target.closest("[data-agregar]");
    if (ver) verDetalle(ver.dataset.ver);
    else if (add) agregar(add.dataset.agregar, undefined, 1);
  });

  var detalle = $("detalle");
  detalle.addEventListener("click", function (e) {
    if (e.target === detalle || e.target.closest("[data-cerrar]")) return detalle.close();
    var cant = $("detalleCant");
    if (e.target.closest("[data-mas]")) cant.value = (parseInt(cant.value, 10) || 0) + 1;
    if (e.target.closest("[data-menos]")) cant.value = Math.max(1, (parseInt(cant.value, 10) || 2) - 1);
    var verRel = e.target.closest("[data-ver-rel]");
    if (verRel) { detalle.close(); return verDetalle(verRel.dataset.verRel); }
    var addRel = e.target.closest("[data-agregar-rel]");
    if (addRel) {
      agregar(addRel.dataset.agregarRel, undefined, 1);
      addRel.classList.add("en-pedido");
      addRel.textContent = "✓";
      return;
    }
    var add = e.target.closest("[data-agregar-detalle]");
    if (add) {
      var pres = detalle.querySelector('input[name="pres"]:checked');
      agregar(add.dataset.agregarDetalle, pres ? pres.value : "", Math.max(1, parseInt(cant.value, 10) || 1));
      detalle.close();
    }
  });

  $("abrirPedido").addEventListener("click", function () { abrirPedido(true); });
  $("cerrarPedido").addEventListener("click", function () { abrirPedido(false); });
  $("overlay").addEventListener("click", function () { abrirPedido(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && $("panel").classList.contains("abierto")) abrirPedido(false);
  });

  $("items").addEventListener("click", function (e) {
    var b = e.target.closest("[data-linea]");
    var q = e.target.closest("[data-quitar]");
    if (b) {
      var l = pedido[+b.dataset.linea];
      l.cantidad += +b.dataset.delta;
      if (l.cantidad < 1) pedido.splice(+b.dataset.linea, 1);
      actualizar();
    } else if (q) {
      pedido.splice(+q.dataset.quitar, 1);
      actualizar();
    }
  });
  $("items").addEventListener("change", function (e) {
    if (!e.target.matches("[data-cant]")) return;
    var n = parseInt(e.target.value, 10);
    if (n > 0) pedido[+e.target.dataset.cant].cantidad = n;
    else pedido.splice(+e.target.dataset.cant, 1);
    actualizar();
  });

  $("vaciar").addEventListener("click", function () {
    if (confirm("¿Vaciar el pedido?")) { pedido = []; actualizar(); }
  });
  $("enviar").addEventListener("click", function () {
    if (!pedido.length) return;
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensajeWhatsApp()), "_blank", "noopener");
  });

  armarFiltros();
  aplicarSector();
  actualizar();
})();
