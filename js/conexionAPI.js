async function listarProductos() {
  // Consigo todos los productos que existan
  const conexion = await fetch(
    "https://alura-geek-api-sage.vercel.app/productos"
  );
  const conexionConvertida = await conexion.json();

  return conexionConvertida;
}

async function enviarProducto(index, img, nombre, precio) {
  const conexion = await fetch(
    "https://alura-geek-api-sage.vercel.app/productos",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: index,
        imagen: img,
        nombre: nombre,
        precio: precio,
      }),
    }
  );

  const conexionConvertida = await conexion.json();

  // Si hay algun error con la conexion, un pop up aparecera
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
  // Obtengo el id del producto a eliminar gracias al boton
  let conexionConvertida = await conexionAPI.listarProductos();
  let idAEliminar = id;
  // Filtro los elementos para quitar el que tenga el mismo id que obtuve anteriormente
  conexionConvertida = conexionConvertida.filter(
    (producto) => producto.id !== idAEliminar
  );
  // Se elimina el elemento
  fetch(`https://alura-geek-api-sage.vercel.app/productos/${id}`, {
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
