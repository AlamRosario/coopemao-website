const API = "https://backend-coopemao.onrender.com";

// ======================
// AFILIACIONES
// ======================
fetch(`${API}/api/inscripciones`)
  .then(res => res.json())
  .then(data => {

    document.getElementById("totalAfiliaciones").textContent = data.length;

    const tabla = document.getElementById("tablaAfiliaciones");

    data.forEach(item => {
      tabla.innerHTML += `
        <tr class="border-b">
          <td class="p-2">${item.nombre}</td>
          <td>${item.cedula}</td>
          <td>${item.telefono}</td>
          <td>${item.ocupacion}</td>
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

    data.forEach(item => {

      totalMonto += Number(item.monto);

      tabla.innerHTML += `
        <tr class="border-b">
          <td class="p-2">${item.nombre}</td>
          <td>RD$${item.monto}</td>
          <td>${item.tipo_prestamo}</td>
          <td>RD$${item.ingreso}</td>
          <td>
            <span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">
              Pendiente
            </span>
          </td>
        </tr>
      `;
    });

    document.getElementById("montoTotal").textContent = "RD$" + totalMonto;

  });