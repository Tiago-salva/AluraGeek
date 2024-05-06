import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector(".main__productos-container-lista");

function crearCard(index, img, nombre, precio) {
  const producto = document.createElement("li");
  producto.classList.add("producto");
  lista.appendChild(producto);

  const productoImg = document.createElement("img");
  productoImg.src = img;
  productoImg.classList.add("producto-img");
  producto.appendChild(productoImg);

  const productoName = document.createElement("p");
  productoName.textContent = nombre;
  productoName.classList.add("producto-name");
  producto.appendChild(productoName);

  const productoPrecio = document.createElement("p");
  productoPrecio.textContent = `$ ${precio}`;
  productoPrecio.classList.add("producto-precio");
  producto.appendChild(productoPrecio);

  const productoDeleteBtn = document.createElement("button");
  productoDeleteBtn.classList.add("producto-delete-btn");
  productoDeleteBtn.addEventListener("click", () => {
    console.log(`Index: ${index}`);
    conexionAPI.eliminarProducto(index);
  });
  producto.appendChild(productoDeleteBtn);
}

export async function listarProductos() {
  try {
    const listaAPI = await conexionAPI.listarProductos();
    listaAPI.forEach((producto) => {
      const id = producto.id;
      const img = producto.imagen;
      const nombre = producto.nombre;
      const precio = producto.precio;

      crearCard(id, img, nombre, precio);
    });
  } catch {
    const errorContainer = document.querySelector(".error-container");
    const errorMensaje = document.querySelector(".error-mensaje");
    errorContainer.classList.add("displayed");
    errorMensaje.textContent = "Ha ocurrido un problema con la  conexión";
    setTimeout(() => {
      errorContainer.classList.remove("displayed");
    }, 3000);
  }
}

listarProductos();
