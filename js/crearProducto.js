import { conexionAPI } from "./conexionAPI.js";

const addProductForm = document.querySelector(".add-product");

export async function crearProducto() {
  // Consigo los valores de los inputs
  const productImg = document.getElementById("img-input").value;
  const productName = document.getElementById("name-input").value;
  let productPrecio = document.getElementById("precio-input").value;
  // Formateo el precio para agregarle puntos segun corresponda
  let precioFormateado = parseInt(productPrecio).toLocaleString();
  // Consigo el index guardado, y si no hay sera 0
  let index = parseInt(localStorage.getItem("index")) || 0;

  try {
    await conexionAPI.enviarProducto(
      index.toString(),
      productImg,
      productName,
      precioFormateado
    );
    index++;
    // Guardo el index para el proximo producto
    localStorage.setItem("index", index.toString());
  } catch (error) {
    alert(error);
  }
}
