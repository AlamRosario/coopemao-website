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
monto: formPrestamo.monto.value,
ingreso: formPrestamo.ingreso.value,
empleo: formPrestamo.empleo.value

};

try {

/* ENVIAR DATOS AL SERVIDOR */

const response = await fetch("http://localhost:3000/api/prestamos", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify(data)

});

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