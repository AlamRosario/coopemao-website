/* =====================================================
FORMULARIO DE AFILIACION
ENVIA LOS DATOS AL SERVIDOR
===================================================== */

const formAfiliacion = document.getElementById("formAfiliacion");

if(formAfiliacion){

formAfiliacion.addEventListener("submit", async function(e){

e.preventDefault();

/* OBTENER DATOS DEL FORMULARIO */

const data = {

nombre: formAfiliacion.nombre.value,
cedula: formAfiliacion.cedula.value,
telefono: formAfiliacion.telefono.value,
correo: formAfiliacion.correo.value,
direccion: formAfiliacion.direccion.value,
mensaje: formAfiliacion.mensaje.value

};

try{

/* ENVIAR DATOS AL SERVIDOR */

const response = await fetch("https://backend-coopemao.onrender.com/api/inscripciones",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

const result = await response.json();

/* RESPUESTA DEL SERVIDOR */

alert(result.message || "Solicitud enviada correctamente");

formAfiliacion.reset();

}

catch(error){

console.error(error);

alert("Solicitud enviada correctamente. Nos pondremos en contacto contigo.");

formAfiliacion.reset();

}

});

}