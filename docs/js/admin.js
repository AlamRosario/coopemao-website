const API = "https://backend-coopemao.onrender.com";

const token = localStorage.getItem("token");
const expira = localStorage.getItem("expira");

if (!token || Date.now() > expira) {
  localStorage.clear();
  window.location.href = "login.html";
}

let afiliaciones = [];
let prestamos = [];
let verHistorial = false;

// ======================
// INICIALIZAR
// ======================
cargarDatos();

async function cargarDatos() {
  await cargarAfiliaciones();
  await cargarPrestamos();
}

// ======================
// AFILIACIONES (INSCRIPCIONES)
// ======================
async function cargarAfiliaciones() {
  const res = await fetch(`${API}/api/inscripciones`);
  afiliaciones = await res.json();

  renderAfiliaciones();
}

function renderAfiliaciones() {
  const tabla = document.getElementById("tablaAfiliaciones");
  const busqueda = document.getElementById("buscarAfiliacion")?.value.toLowerCase() || "";

  tabla.innerHTML = "";

  afiliaciones
    .filter(item => {
      if (!verHistorial && item.estado === "Completado") return false;
      return item.nombre.toLowerCase().includes(busqueda);
    })
    .forEach(item => {
      tabla.innerHTML += `
        <tr class="border-b hover:bg-gray-50">
          <td class="p-2">${item.nombre}</td>
          <td>${item.cedula}</td>
          <td>${item.telefono}</td>
          <td>${item.ocupacion}</td>

          <td>
            <span class="${
              item.estado === "Completado"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            } px-2 py-1 rounded text-xs">
              ${item.estado || "Pendiente"}
            </span>
          </td>

          <td class="flex gap-2">
            <button onclick="verDetalleAfiliacion(${item.id})"
              class="bg-blue-500 text-white px-2 py-1 rounded text-xs">
              Ver
            </button>

            <button onclick="completar(${item.id})"
              class="bg-green-500 text-white px-2 py-1 rounded text-xs">
              ✔
            </button>
          </td>
        </tr>
      `;
    });
}

// ======================
// PRÉSTAMOS
// ======================
async function cargarPrestamos() {
  const res = await fetch(`${API}/api/prestamos`);
  prestamos = await res.json();

  renderPrestamos();
}

function renderPrestamos() {
  const tabla = document.getElementById("tablaPrestamos");
  const busqueda = document.getElementById("buscarPrestamo")?.value.toLowerCase() || "";

  tabla.innerHTML = "";

  let total = 0;

  prestamos
    .filter(item => {
      if (!verHistorial && item.estado !== "Pendiente") return false;
      return item.nombre.toLowerCase().includes(busqueda);
    })
    .forEach(item => {

      total += Number(item.monto);

      tabla.innerHTML += `
        <tr class="border-b hover:bg-gray-50">
          <td class="p-2">${item.nombre}</td>
          <td>RD$${item.monto}</td>
          <td>${item.tipo_prestamo}</td>
          <td>RD$${item.ingreso}</td>

          <td>
            <span class="${
              item.estado === "Aprobado"
                ? "bg-green-200 text-green-800"
                : item.estado === "Rechazado"
                ? "bg-red-200 text-red-800"
                : "bg-yellow-200 text-yellow-800"
            } px-2 py-1 rounded text-xs">
              ${item.estado || "Pendiente"}
            </span>
          </td>

          <td class="flex gap-2">

            <button onclick="verDetallePrestamo(${item.id})"
              class="bg-blue-500 text-white px-2 py-1 rounded text-xs">
              Ver
            </button>

            <button onclick="cambiarEstado(${item.id}, 'Aprobado')"
              class="bg-green-500 text-white px-2 py-1 rounded text-xs">
              ✔
            </button>

            <button onclick="cambiarEstado(${item.id}, 'Rechazado')"
              class="bg-red-500 text-white px-2 py-1 rounded text-xs">
              ✖
            </button>

            <button onclick="eliminar(${item.id})"
              class="bg-gray-600 text-white px-2 py-1 rounded text-xs">
              🗑
            </button>
          </td>
        </tr>
      `;
    });

  document.getElementById("totalPrestamos").textContent = prestamos.length;
  document.getElementById("montoTotal").textContent = "RD$" + total;
  document.getElementById("totalAfiliaciones").textContent = afiliaciones.length;
}

// ======================
// MODAL DETALLE
// ======================
function verDetalleAfiliacion(id) {
  const item = afiliaciones.find(a => a.id === id);

  document.getElementById("contenidoDetalle").innerHTML = `
    <p><strong>Nombre:</strong> ${item.nombre}</p>
    <p><strong>Cédula:</strong> ${item.cedula}</p>
    <p><strong>Teléfono:</strong> ${item.telefono}</p>
    <p><strong>Ocupación:</strong> ${item.ocupacion}</p>
    <p><strong>Estado:</strong> ${item.estado}</p>
  `;

  abrirModal();
}

function verDetallePrestamo(id) {
  const item = prestamos.find(p => p.id === id);

  document.getElementById("contenidoDetalle").innerHTML = `
    <p><strong>Nombre:</strong> ${item.nombre}</p>
    <p><strong>Monto:</strong> RD$${item.monto}</p>
    <p><strong>Tipo:</strong> ${item.tipo_prestamo}</p>
    <p><strong>Ingreso:</strong> RD$${item.ingreso}</p>
    <p><strong>Estado:</strong> ${item.estado}</p>
  `;

  abrirModal();
}

function abrirModal() {
  const modal = document.getElementById("modalDetalle");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function cerrarModal() {
  const modal = document.getElementById("modalDetalle");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// ======================
// ACCIONES
// ======================
async function completar(id) {
  await fetch(`${API}/api/inscripciones/${id}`, { method: "PUT" });
  cargarAfiliaciones();
}

async function cambiarEstado(id, estado) {
  await fetch(`${API}/api/prestamos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado })
  });

  cargarPrestamos();
}

async function eliminar(id) {
  if (!confirm("¿Eliminar solicitud?")) return;

  await fetch(`${API}/api/prestamos/${id}`, {
    method: "DELETE"
  });

  cargarPrestamos();
}

// ======================
// BUSCADOR
// ======================
function buscarAfiliacion() {
  renderAfiliaciones();
}

function buscarPrestamo() {
  renderPrestamos();
}

// ======================
// HISTORIAL
// ======================
function toggleHistorial() {
  verHistorial = !verHistorial;
  renderAfiliaciones();
  renderPrestamos();
}

// ======================
// LOGOUT
// ======================
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}