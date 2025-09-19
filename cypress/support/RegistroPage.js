class RegistroPage {
  inputNombres = '[aria-label="Nombres"]';  
  inputApellidos = '[aria-label="Apellido"]';
  inputTelefono = '[aria-label="Teléfono"]';
  inputDni ='[aria-label="DNI"]'; 
  dropdownProvincia = '[aria-label="Provincia"]';
  dropdownLocalidad = '[aria-label="Localidad"]';
  inputDia  = '[aria-label="día, "]';
  inputMes  = '[aria-label="mes, "]';
  inputAnio = '[aria-label="año, "]';
  inputCorreo = '[aria-label="Email"]';
  selectCalendario= '[aria-label="Calendario"]'
  inputConfirmcorreo= '[aria-label="Confirmar Email"]';
  inputPassword = '[aria-label="Contraseña"]';
  inputConfPass= '[aria-label="Repetir Contraseña"]';
  buttonEnviar= '[data-cy="btn-registrarse"]';
  btnLoginLink   = '[data-cy="btn-login-link"]';
  mensajeError= '.text-tiny.text-danger';    // usando clase
  dataError = '[data-cy="error-message"]'; 


  // Métodos que hacen acciones condicionando a solo escribir si no se manda data vacia 
  escribirNombre(nombre) {
    if (nombre) cy.get(this.inputNombres).type(nombre);
  }

  escribirApellido(apellido){
    if (apellido) cy.get(this.inputApellidos).type(apellido);
  }

  escribirTelefono(telefono){
   if (telefono) cy.get(this.inputTelefono).type(telefono);
  }


  escribirDNI(dni){
    if (dni) cy.get(this.inputDni).type(dni);
  }

   ingresarFechaNacimiento(dia, mes, anio) {
    if (dia) cy.get(this.inputDia).clear().type(dia);
    if (mes) cy.get(this.inputMes).clear().type(mes);
    if (anio) cy.get(this.inputAnio).clear().type(anio);
  }

  escribirPassword(password){
    if (password) cy.get(this.inputPassword).clear().type(password);
  }

  confirmarPassword(password){
   if (password) cy.get(this.inputConfPass).clear().type(password);
  }

   escribirCorreo(correo){
    if (correo) cy.get(this.inputCorreo).type(correo);
  }


 confirmarCorreo(correo){
   if (correo)  cy.get(this.inputConfirmcorreo).type(correo);
  }

// Método para seleccionar opción de provincia o localidad (génerico para otros test)
  seleccionarOpcion(elemento, valor) {
  if (valor) {
    cy.get(elemento).then(($el) => {
      if ($el.is('select')) {
        // Caso <select> nativo
        cy.wrap($el).select(valor);
      } else {
        // Caso dropdown custom
        cy.wrap($el).click(); // abre el dropdown
        cy.contains('li', valor)
          .scrollIntoView()
          .should('be.visible')
          .click();
      }
    });
  }
}

// Seleccionar provincia
seleccionarProvincia(provincia) {
  this.seleccionarOpcion(this.dropdownProvincia, provincia);
}

// Seleccionar localidad
seleccionarLocalidad(localidad) {
  this.seleccionarOpcion(this.dropdownLocalidad, localidad);
}

  //Método para validar que hayan  mensajes de error y se muestre el texto "Completa este campo"


  validarError() {
  cy.get(this.mensajeError)
  .should('have.length', 11)
  .each(($el) => {
    cy.wrap($el).should('have.text', 'Completa este campo');
  });
}

// método para validar el formato de algunos campos del formulario 

validarErrorFormato(campoSelector, valor) {
  cy.get(campoSelector)
    .clear()
    .type(valor, { delay: 100 }) // escribe más despacio
    .should('have.value', valor) // espera a que se escriba
    .blur();

  cy.get(campoSelector)
    .parents('form') // ajusta al contenedor correcto
    .find(this.mensajeError)
    .should('be.visible')
    .and('contain.text', 'Haz coincidir el formato solicitado.');
}

// Método para la validación de un correo

validarErrorEmail (correo) {
  // Limpiar el campo
  cy.get(this.inputCorreo).clear();

  // Escribir valor si se pasa
  if (correo) {
    cy.get(this.inputCorreo).type(correo);
  }

  // Hacer blur para disparar validación
  cy.get(this.inputCorreo).blur();

  // Buscar el mensaje de error (clase común) y validar el texto
  cy.get(this.mensajeError, { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', 'Ingresa texto después del signo "@". La dirección "liz@" está incompleta.');

  

}

// Método para completar datos generales (todo el formulario)
completarDatosGenerales(user) {
  this.escribirNombre(user.nombres);
  this.escribirApellido(user.apellido);
  this.escribirTelefono(user.telefono);
  this.escribirDNI(user.dni);
  this.seleccionarProvincia(user.provincia);
  this.seleccionarLocalidad(user.localidad);
  this.ingresarFechaNacimiento(user.dia, user.mes, user.anio);
  this.escribirCorreo(user.email);
  this.confirmarCorreo(user.confirmarEmail);
  this.escribirPassword(user.password);
  this.confirmarPassword(user.repetirPassword);
}


// Método para completar datos generales menos contraseña
completarDatosSinPassword(user) {
  this.escribirNombre(user.nombres);
  this.escribirApellido(user.apellido);
  this.escribirTelefono(user.telefono);
  this.escribirDNI(user.dni);
  this.seleccionarProvincia(user.provincia);
  this.seleccionarLocalidad(user.localidad);
  this.ingresarFechaNacimiento(user.dia, user.mes, user.anio);
  this.escribirCorreo(user.email);
  this.confirmarCorreo(user.confirmarEmail);
}



//Método para validar el mensaje de error sobre un correo electrónico no válido 
validarDatoInvalido(){
  cy.get(this.dataError)
  .should('be.visible')
  .and('contain.text', 'El correo electrónico no es válido');
}

// Método para validar el mensaje de error sobre correos electrónicos que no coinciden 
validarCoincidenciaEmail(){
  cy.get(this.dataError)
  .should('be.visible')
  .and('contain.text', 'Los correos electrónicos no coinciden');
  
}

//Método para validar el mensaje de error sobre contraseñas que no coinciden
validarCoincidenciaPassword(){
  cy.get(this.dataError)
  .should('be.visible')
  .and('contain.text', 'Las contraseñas no coinciden');
  
}


//Método para validar el mensaje de error sobre los caracteres necesarios para la contraseña
validarFormatoPassword(){
  cy.get(this.dataError)
  .should('be.visible')
  .and('contain.text', 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.');
  
}


//Método para validar el mensaje de error cuando ya hay un usuario registrado con el mismo DNI
validarDNI(){
  cy.get(this.dataError)
  .should('be.visible')
  .and('contain.text', 'Ya existe un usuario registrado con ese DNI');
  
}


//Método para validar el mensaje de error cuando ya hay un usuario registrado con el mismo correo 
validarCorreo(){
  cy.get(this.dataError)
  .should('be.visible')
  .and('contain.text', 'Ya existe un usuario registrado con ese correo electrónico');
  
}
}

export default RegistroPage;
