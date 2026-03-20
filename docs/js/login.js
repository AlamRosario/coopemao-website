const API = "https://backend-coopemao.onrender.com";

async function login() {

  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  try {

    const res = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", data.usuario);
    localStorage.setItem("expira", Date.now() + 3600000);

    window.location.href = "admin.html";

  } catch (error) {
    alert("Error de conexión");
  }

}