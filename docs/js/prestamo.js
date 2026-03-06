const form = document.getElementById("formPrestamo");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    telefono: form.telefono.value,
    correo: form.correo.value,
    direccion: form.direccion.value,
    monto: form.monto.value,
    ingreso: form.ingreso.value,
    empleo: form.empleo.value
  };

  try {
    const response = await fetch("http://localhost:3000/api/prestamos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    alert(result.message);
    form.reset();

  } catch (error) {
    console.error(error);
    alert("Error enviando solicitud");
  }
});