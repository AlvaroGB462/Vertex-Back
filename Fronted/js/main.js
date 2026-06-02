document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre: document.querySelector("[name='nombre']").value,
      email: document.querySelector("[name='email']").value,
      empresa: document.querySelector("[name='empresa']").value,
      mensaje: document.querySelector("[name='mensaje']").value,
    };

    try {
      const res = await fetch("http://13.60.248.10:3000/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.ok) {
        alert("Mensaje enviado correctamente");
        form.reset();
      } else {
        alert("Error al enviar el mensaje");
      }

    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  });
});