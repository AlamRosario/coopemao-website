const API = "https://backend-coopemao.onrender.com";

async function login() {

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");
  const boton = document.querySelector("button");

  // 🔴 Validación básica
  if (!usuario || !password) {
    mostrarError("Completa todos los campos");
    return;
  }

  try {

    // ⏳ Estado loading
    boton.textContent = "Entrando...";
    boton.disabled = true;

    const res = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario, password })
    });

    const data = await res.json();

    if (!res.ok) {
      mostrarError(data.message || "Error al iniciar sesión");
      boton.textContent = "Entrar";
      boton.disabled = false;
      return;
    }

    // 💾 Guardar sesión
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", data.usuario);
    localStorage.setItem("expira", Date.now() + 3600000);

    // 🚀 Redirigir
    window.location.href = "admin.html";

  } catch (error) {
    mostrarError("Error de conexión");
    boton.textContent = "Entrar";
    boton.disabled = false;
  }

}


// 🔴 Mostrar error bonito (sin alert)
function mostrarError(msg) {
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = msg;
  mensaje.classList.remove("hidden");
}

document.getElementById("usuario").addEventListener("input", ocultarError);
document.getElementById("password").addEventListener("input", ocultarError);

function ocultarError() {
  document.getElementById("mensaje").classList.add("hidden");
}