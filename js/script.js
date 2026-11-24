document.addEventListener("DOMContentLoaded", function () {

    // BOTÓN VOLVER ARRIBA
    const botonArriba = document.getElementById("volverArriba");

    if (botonArriba) {
        window.addEventListener("scroll", function () {
            botonArriba.classList.toggle("visible", window.scrollY > 300);
        });

        botonArriba.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // FILTROS DE PRODUCTOS
    const botonesFiltro = document.querySelectorAll(".filtro");
    const productos = document.querySelectorAll(".producto-item");

    botonesFiltro.forEach(function (boton) {
        boton.addEventListener("click", function () {
            botonesFiltro.forEach(function (elemento) {
                elemento.classList.remove("activo");
            });

            boton.classList.add("activo");

            const categoria = boton.dataset.filter;

            productos.forEach(function (producto) {
                const coincide = categoria === "todos" ||
                    producto.dataset.category === categoria;

                producto.classList.toggle("oculto", !coincide);
            });
        });
    });

    // PEDIDOS POR WHATSAPP
    const botonesPedir = document.querySelectorAll(".btn-pedir");
    const numeroWhatsApp = "573008663557";

    botonesPedir.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const producto = boton.dataset.producto;
            const precio = boton.dataset.precio;

            const mensaje = `Hola, quiero pedir un ${producto} de $${Number(precio).toLocaleString("es-CO")}. ¿Me pueden ayudar?`;
            const enlace = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

            window.open(enlace, "_blank");
        });
    });

    // FORMULARIO WEB3FORMS
    const formulario = document.getElementById("formContacto");

    if (formulario) {
        formulario.addEventListener("submit", async function (evento) {
            evento.preventDefault();

            const botonEnviar = document.getElementById("btnEnviar");
            const respuesta = document.getElementById("respuestaFormulario");

            botonEnviar.disabled = true;
            botonEnviar.textContent = "Enviando...";
            respuesta.textContent = "";

            try {
                const datos = new FormData(formulario);

                const resultado = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: datos
                });

                const respuestaServidor = await resultado.json();

                if (respuestaServidor.success) {
                    respuesta.textContent = "¡Mensaje enviado correctamente!";
                    respuesta.style.color = "green";
                    formulario.reset();
                } else {
                    respuesta.textContent = "No se pudo enviar. Revisa la configuración del formulario.";
                    respuesta.style.color = "red";
                }

            } catch (error) {
                respuesta.textContent = "Ocurrió un error. Intenta nuevamente.";
                respuesta.style.color = "red";
            }

            botonEnviar.disabled = false;
            botonEnviar.textContent = "Enviar mensaje";
        });
    }

});