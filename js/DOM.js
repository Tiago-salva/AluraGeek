import { conexionAPI } from "./conexionAPI.js";
import { crearProducto } from "./crearProducto.js";
import { validacion } from "./validarFormulario.js";

const mainTitle = document.querySelector(".main__title");
const addProductForm = document.querySelector(".add-product");
const allInputs = addProductForm.querySelectorAll(".input");
const allAddProductBtn = document.querySelectorAll(".header__add-btn");
const firstLine = document.querySelector(".line-1");
const secondLine = document.querySelector(".line-2");
const resetBtn = document.querySelector(".btn-reset");
const errorMensaje = document.querySelector(".error-mensaje");
const errorContainer = document.querySelector(".error-container");

// Al cargar la pagina consigo y muestro todos los productos
window.addEventListener("DOMContentLoaded", async () => {
  let conexionConvertida = await conexionAPI.listarProductos();
  // Si no hay productos que el index sea 0 y mostrar al usuario un mensaje
  if (conexionConvertida.length === 0) {
    localStorage.setItem("index", 0);
    mainTitle.textContent = "No hay productos";
  }
});

addProductForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Detiene el envío del formulario

  // Si  el formulario esta correcto, crea el producto
  if (await validacion.validarFormulario()) {
    crearProducto();
  } else {
    // De no ser asi, mostrar el mensaje de error
    errorContainer.classList.add("displayed");
    errorMensaje.textContent = "Debes solucionar los problemas del formulario";
    setTimeout(() => {
      errorContainer.classList.remove("displayed");
    }, 3000);
  }
});

allInputs.forEach((input, index) => {
  input.addEventListener("blur", () => {
    validacion.validarInput(input, index);
  });
});

allAddProductBtn.forEach((button) => {
  button.addEventListener("click", () => {
    addProductForm.classList.toggle("displayed");
    firstLine.classList.toggle("form-displayed");
    secondLine.classList.toggle("form-displayed");
  });
});

resetBtn.addEventListener("click", () => {
  const allInputs = addProductForm.querySelectorAll(".input");
  allInputs.forEach((input) => {
    input.value = "";
  });
});
