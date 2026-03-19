const API = "https://backend-coopemao.onrender.com";

// ======================
// AFILIACIONES
// ======================
fetch(`${API}/api/inscripciones`)
  .then(res => res.json())
  .then(data => {

    document.getElementById("totalAfiliaciones").textContent = data.length;

    const tabla = document.getElementById("tablaAfiliaciones");
    tabla.innerHTML = ""; // limpiar antes

    data.forEach(item => {
      tabla.innerHTML += `
        <tr class="border-b">
          <td class="p-2">${item.nombre}</td>
          <td>${item.cedula}</td>
          <td>${item.telefono}</td>
          <td>${item.ocupacion}</td>

          <td>
            <span class="${
              item.estado === 'Completado'
                ? 'bg-green-200 text-green-800'
                : 'bg-yellow-200 text-yellow-800'
            } px-2 py-1 rounded text-xs">
              ${item.estado || 'Pendiente'}
            </span>
          </td>

          <td>
            <button onclick="completar(${item.id})"
              class="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">
              Completar
            </button>
          </td>

        </tr>
      `;
    });

  });


// ======================
// PRESTAMOS
// ======================
fetch(`${API}/api/prestamos`)
  .then(res => res.json())
  .then(data => {

    document.getElementById("totalPrestamos").textContent = data.length;

    let totalMonto = 0;

    const tabla = document.getElementById("tablaPrestamos");
    tabla.innerHTML = ""; // limpiar

    data.forEach(item => {

      totalMonto += Number(item.monto);

     tabla.innerHTML += `
  <tr class="border-b">
    <td class="p-2">${item.nombre}</td>
    <td>RD$${item.monto}</td>
    <td>${item.tipo_prestamo}</td>
    <td>RD$${item.ingreso}</td>

    <td>
      <span class="${
        item.estado === 'Aprobado'
          ? 'bg-green-200 text-green-800'
          : item.estado === 'Rechazado'
          ? 'bg-red-200 text-red-800'
          : 'bg-yellow-200 text-yellow-800'
      } px-2 py-1 rounded text-xs">
        ${item.estado || 'Pendiente'}
      </span>
    </td>

    <td class="flex gap-2">
      <button onclick="cambiarEstado(${item.id}, 'Aprobado')"
        class="bg-green-500 text-white px-2 py-1 rounded text-xs">
        Aprobar
      </button>

      <button onclick="cambiarEstado(${item.id}, 'Rechazado')"
        class="bg-red-500 text-white px-2 py-1 rounded text-xs">
        Rechazar
      </button>
    </td>
  </tr>
`;
    });

    document.getElementById("montoTotal").textContent = "RD$" + totalMonto;

  });


// ======================
// ELIMINAR PRESTAMO
// ======================
async function eliminar(id) {

  if (!confirm("¿Seguro que quieres eliminar esta solicitud?")) return;

  try {

    const res = await fetch(`${API}/api/prestamos/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    alert(data.message);

    location.reload();

  } catch (error) {
    console.error(error);
    alert("Error eliminando");
  }

}


// ======================
// COMPLETAR AFILIACION
// ======================
async function completar(id) {

  if (!confirm("¿Marcar como completado?")) return;

  try {

    const res = await fetch(`${API}/api/inscripciones/${id}`, {
      method: "PUT"
    });

    const data = await res.json();

    alert(data.message);

    location.reload();

  } catch (error) {
    console.error(error);
    alert("Error actualizando");
  }

}

async function cambiarEstado(id, estado) {

  if (!confirm(`¿Seguro que quieres marcar como ${estado}?`)) return;

  try {

    const res = await fetch(`${API}/api/prestamos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ estado })
    });

    const data = await res.json();

    alert(data.message);

    location.reload();

  } catch (error) {
    alert("Error actualizando estado");
  }

}