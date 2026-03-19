/* =====================================================
FORMULARIO DE SOLICITUD DE PRESTAMO
ENVIA LOS DATOS AL BACKEND
===================================================== */

const formPrestamo = document.getElementById("formPrestamo");

if(formPrestamo){

formPrestamo.addEventListener("submit", async function(e){

e.preventDefault();

/* OBTENER DATOS DEL FORMULARIO */

const data = {
  nombre: formPrestamo.nombre.value,
  telefono: formPrestamo.telefono.value,
  correo: formPrestamo.correo.value,
  direccion: formPrestamo.direccion.value,
  ingreso: formPrestamo.ingreso.value,
  empleo: formPrestamo.empleo.value,
  tipo_prestamo: formPrestamo.tipo_prestamo.value,
  monto: formPrestamo.monto.value
};
try {

/* ENVIAR DATOS AL SERVIDOR */

const response = await fetch("https://backend-coopemao.onrender.com/api/prestamos", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify(data)

});

if (!response.ok) {
  throw new Error("Error en la respuesta del servidor");
}

const result = await response.json();

/* RESPUESTA DEL SERVIDOR */

alert(result.message || "Solicitud enviada correctamente");

formPrestamo.reset();

}

catch(error){

console.error(error);

alert("Error enviando solicitud. Intente nuevamente.");

}

});

}

