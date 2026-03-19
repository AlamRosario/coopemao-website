const API = "https://backend-coopemao.onrender.com";

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
// AFILIACIONES
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

          <td>
            <button onclick="completar(${item.id})"
              class="bg-green-500 text-white px-2 py-1 rounded text-xs">
              Completar
            </button>
          </td>
        </tr>
      `;
    });
}

// ======================
// PRESTAMOS
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