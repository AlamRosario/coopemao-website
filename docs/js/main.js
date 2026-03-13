/* =====================================================
VARIABLES DEL MENU MOVIL
===================================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("navLinks");

/* =====================================================
ABRIR / CERRAR MENU EN MOVIL
===================================================== */

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

/* =====================================================
CERRAR MENU MOVIL AL HACER CLICK EN UN LINK
===================================================== */

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});

/* =====================================================
ANIMACION AL HACER SCROLL (REVEAL)
===================================================== */

function revealOnScroll() {

    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const visiblePoint = 120;

        if (elementTop < windowHeight - visiblePoint) {
            element.classList.add("active");
        }

    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =====================================================
EFECTO DEL NAVBAR AL HACER SCROLL
===================================================== */

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

/* =====================================================
CALCULADORA DE PRESTAMO
===================================================== */

function calcularPrestamo(){

    const montoInput = document.getElementById("monto");
    const mesesInput = document.getElementById("meses");

    if(!montoInput || !mesesInput) return;

    let monto = parseFloat(montoInput.value);
    let meses = parseInt(mesesInput.value);

    const tasaAnual = 0.20;
    const tasaMensual = tasaAnual / 12;

    if(isNaN(monto) || isNaN(meses)){
        alert("Completa todos los campos correctamente");
        return;
    }

    if(monto > 500000){
        alert("El monto máximo permitido es RD$500,000");
        return;
    }

    let cuota =
        monto *
        (tasaMensual * Math.pow(1 + tasaMensual, meses)) /
        (Math.pow(1 + tasaMensual, meses) - 1);

    const resultado = document.getElementById("resultadoCuota");

    if(resultado){
        resultado.innerText = "RD$ " + cuota.toFixed(2);
    }

    const btnSolicitar = document.getElementById("btnSolicitar");

    if(btnSolicitar){
        btnSolicitar.style.display = "inline-block";
    }
}

/* =====================================================
BOTON SOLICITAR PRESTAMO
COPIA EL MONTO AL FORMULARIO Y BAJA AL FORMULARIO
===================================================== */

const btnSolicitar = document.getElementById("btnSolicitar");

if(btnSolicitar){

    btnSolicitar.addEventListener("click", function(){

        const monto = document.getElementById("monto");
        const formMonto = document.getElementById("formMonto");

        if(monto && formMonto){
            formMonto.value = monto.value;
        }

        const formulario = document.querySelector("#solicitud-prestamo");

        if(formulario){
            formulario.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}