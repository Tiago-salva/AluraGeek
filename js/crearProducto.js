import { conexionAPI } from "./conexionAPI.js";

const addProductForm = document.querySelector(".add-product");

export async function crearProducto() {
  const productImg = document.getElementById("img-input").value;
  const productName = document.getElementById("name-input").value;
  let productPrecio = document.getElementById("precio-input").value;
  let precioFormateado = parseInt(productPrecio).toLocaleString();
  let index = parseInt(localStorage.getItem("index")) || 0;
  console.log(index);

  try {
    await conexionAPI.enviarProducto(
      index.toString(),
      productImg,
      productName,
      precioFormateado
    );
    index++;
    console.log(index);
    localStorage.setItem("index", index.toString());
  } catch (error) {
    alert(error);
  }
}
