async function listarProductos() {
  const conexion = await fetch("http://localhost:3001/productos");
  const conexionConvertida = await conexion.json();

  return conexionConvertida;
}

async function enviarProducto(index, img, nombre, precio) {
  const conexion = await fetch("http://localhost:3001/productos", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      id: index,
      imagen: img,
      nombre: nombre,
      precio: precio,
    }),
  });

  const conexionConvertida = await conexion.json();

  if (!conexion.ok) {
    const errorContainer = document.querySelector(".error-container");
    const errorMensaje = document.querySelector(".error-mensaje");
    errorContainer.classList.add("displayed");
    errorMensaje.textContent = "Ha ocurrido un error al enviar el producto";
    setTimeout(() => {
      errorContainer.classList.remove("displayed");
    }, 3000);
  }

  return conexionConvertida;
}

async function eliminarProducto(id) {
  let conexionConvertida = await conexionAPI.listarProductos();
  let idAEliminar = id;
  conexionConvertida = conexionConvertida.filter(
    (producto) => producto.id !== idAEliminar
  );
  fetch(`http://localhost:3001/productos/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error("Error:", error));
}

export const conexionAPI = {
  listarProductos,
  enviarProducto,
  eliminarProducto,
};
