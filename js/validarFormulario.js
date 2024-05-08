const allInputs = document.querySelectorAll(".input");
const allFixMessages = document.querySelectorAll(".fix-mensaje");

async function validarFormulario() {
  let esValido = true;
  // Valido cada input
  allInputs.forEach((input, index) => {
    // Si algun input es incorrecto, cambiar la variable
    if (!validarInput(input, index)) {
      esValido = false;
    }
  });

  // Si todos los inputs son validos, validar el URL de la imagen
  if (esValido) {
    const resultadoImagen = await validarImagenUrl(allInputs[2].value);
    return resultadoImagen;
  } else {
    return false;
  }
}

function validarInput(input, index) {
  // Valido el pattern
  if (input.validity.patternMismatch) {
    allFixMessages[index].textContent =
      index === 1 ? "Solo se permiten números" : "Introduce una URL válida";
    return false;
  }
  // Valido la cantidad de caracteres
  else if (input.validity.tooLong) {
    allFixMessages[index].textContent =
      "El nombre debe tener menos de 25 carácteres";
    return false;
  }
  // Valido si el input esta vacio
  else if (input.validity.valueMissing) {
    allFixMessages[index].textContent = "Por favor, rellene este campo";
    return false;
  }
  // Valido si el input del precio empieza con 0
  else if (input.value.startsWith("0")) {
    allFixMessages[index].textContent =
      index === 1 ? "El valor no puede empezar con 0" : "";
    return false;
  }
  // Si nada de esto sucede, vaciar todos los mensajes
  else {
    allFixMessages[index].textContent = "";
    return true;
  }
}

function validarImagenUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => {
      allFixMessages[2].textContent = "La URL no apunta a una imagen válida";
      resolve(false); // Utiliza `resolve` en lugar de `reject` para manejar el caso de error como una "resolución falsa".
    };
    img.src = url;
  });
}

export const validacion = {
  validarFormulario,
  validarInput,
  validarImagenUrl,
};
