import RegistroPage from '../support/pages/RegistroPage';

describe('Pruebas de Registro en Ticketazo', () => {
  const registroPage = new RegistroPage();

  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser'); // URL de prueba
  });

  // Happy path
  it('Registro exitoso con datos válidos', () => {
    cy.fixture('userRegister').then((data) => {
      const user = data.usuarioValido;

      registroPage.escribirNombre(user.nombres);
      registroPage.escribirApellido(user.apellido);
      registroPage.escribirTelefono(user.telefono);
      registroPage.escribirDNI(user.dni);
      registroPage.seleccionarProvincia(user.provincia);
      registroPage.seleccionarLocalidad(user.localidad);
      registroPage.ingresarFechaNacimiento(user.dia, user.mes, user.anio);
      registroPage.escribirCorreo(user.email);
      registroPage.confirmarCorreo(user.confirmarEmail);
      registroPage.escribirPassword(user.password);
      registroPage.confirmarPassword(user.repetirPassword);

      cy.get(registroPage.buttonEnviar).click();

      
    });
  });

  // Verificar campos vacíos y mensaje de error 
  it('Validación de errores cuando los campos están vacíos', () => {
    cy.fixture('userRegister').then((data) => {
      const user = data.usuarioSinDatos;

      registroPage.escribirNombre(user.nombres);
      registroPage.escribirApellido(user.apellido);
      registroPage.escribirTelefono(user.telefono);
      registroPage.escribirDNI(user.dni);
      registroPage.seleccionarProvincia(user.provincia);
      registroPage.seleccionarLocalidad(user.localidad);
      registroPage.ingresarFechaNacimiento(user.dia, user.mes, user.anio);
      registroPage.escribirCorreo(user.email);
      registroPage.confirmarCorreo(user.confirmarEmail);
      registroPage.escribirPassword(user.password);
      registroPage.confirmarPassword(user.repetirPassword);

      cy.get(registroPage.buttonEnviar).click();

      // método  para evaluar el mensaje de error de completa este campo
      registroPage.validarError();
    });
  });



// Verificar campos que no cumplen con el formato de la cantidad de caracteres permitidos 
//o del formato admitido para el campo como el correo.
  it('Validación de formato de datos', () => {
    cy.fixture('userRegister').then((data) => {
      const user = data.usuarioDatosNoTienenFormato;
      
      registroPage.escribirNombre(user.nombres);
      registroPage.escribirApellido(user.apellido);
      registroPage.validarErrorFormato(registroPage.inputTelefono, user.telefono);
      registroPage.validarErrorFormato(registroPage.inputDni, user.dni);
      registroPage.seleccionarProvincia(user.provincia);
      registroPage.seleccionarLocalidad(user.localidad);
      registroPage.ingresarFechaNacimiento(user.dia, user.mes, user.anio);
      registroPage.validarErrorEmail(user.email);
      registroPage.confirmarCorreo(user.confirmarEmail);
      registroPage.escribirPassword(user.password);
      registroPage.confirmarPassword(user.repetirPassword);

      cy.get(registroPage.buttonEnviar).click();

      
  });
  });

  // Verificar que los correos sean iguales una vez se complete el registro
   it('Validación de consistencia en correos ingresados', () => {
    cy.fixture('userRegister').then((data) => {
      const user = data.usuarioDiferenteCorreo;
      
      registroPage.escribirNombre(user.nombres);
      registroPage.escribirApellido(user.apellido);
      registroPage.escribirTelefono(user.telefono);
      registroPage.escribirDNI(user.dni);
      registroPage.seleccionarProvincia(user.provincia);
      registroPage.seleccionarLocalidad(user.localidad);
      registroPage.ingresarFechaNacimiento(user.dia, user.mes, user.anio);
      registroPage.escribirCorreo(user.email);
      registroPage.confirmarCorreo(user.confirmarEmail);
      registroPage.escribirPassword(user.password);
      registroPage.confirmarPassword(user.repetirPassword);

      cy.get(registroPage.buttonEnviar).click();
      // método  para evaluar el mensaje de error de no coincidencia en los correos ingresados
      registroPage.validarCoincidenciaEmail();

      
  });
  });
  
  // Verificar que las contraseñas sean iguales una vez se complete el registro
   it('Validación de consistencia en contraseñas ingresadas', () => {
    cy.fixture('userRegister').then((data) => {
      const user = data.usuarioDiferentePassword;
      
      registroPage.escribirNombre(user.nombres);
      registroPage.escribirApellido(user.apellido);
      registroPage.escribirTelefono(user.telefono);
      registroPage.escribirDNI(user.dni);
      registroPage.seleccionarProvincia(user.provincia);
      registroPage.seleccionarLocalidad(user.localidad);
      registroPage.ingresarFechaNacimiento(user.dia, user.mes, user.anio);
      registroPage.escribirCorreo(user.email);
      registroPage.confirmarCorreo(user.confirmarEmail);
      registroPage.escribirPassword(user.password);
      registroPage.confirmarPassword(user.repetirPassword);

      cy.get(registroPage.buttonEnviar).click();
      // método  para evaluar el mensaje de error de no coincidencia en las contraseñas ingresadas
      registroPage.validarCoincidenciaPassword();

      
  });
  });

// Verificar que las contraseñas cumplan con la cantidad de caracteres solicitada
   it('Validación de contraseña con caracteres solicitados', () => {
    cy.fixture('userRegister').then((data) => {
      const user = data.contraseñaSinFormato;
      
      registroPage.escribirNombre(user.nombres);
      registroPage.escribirApellido(user.apellido);
      registroPage.escribirTelefono(user.telefono);
      registroPage.escribirDNI(user.dni);
      registroPage.seleccionarProvincia(user.provincia);
      registroPage.seleccionarLocalidad(user.localidad);
      registroPage.ingresarFechaNacimiento(user.dia, user.mes, user.anio);
      registroPage.escribirCorreo(user.email);
      registroPage.confirmarCorreo(user.confirmarEmail);
      registroPage.escribirPassword(user.password);
      registroPage.confirmarPassword(user.repetirPassword);

      cy.get(registroPage.buttonEnviar).click();
      // método  para evaluar el mensaje de error de contraseña no válida
      registroPage.validarFormatoPassword();

      
  });
  });

// Verificar que se muestre mensaje de error si el usuario ya está registrado con el mismo correo
   it('Validación de usuario ya registrado con el mismo correo', () => {
    cy.fixture('userRegister').then((data) => {
      const user = data.correoYaRegistrado;
      
      registroPage.escribirNombre(user.nombres);
      registroPage.escribirApellido(user.apellido);
      registroPage.escribirTelefono(user.telefono);
      registroPage.escribirDNI(user.dni);
      registroPage.seleccionarProvincia(user.provincia);
      registroPage.seleccionarLocalidad(user.localidad);
      registroPage.ingresarFechaNacimiento(user.dia, user.mes, user.anio);
      registroPage.escribirCorreo(user.email);
      registroPage.confirmarCorreo(user.confirmarEmail);
      registroPage.escribirPassword(user.password);
      registroPage.confirmarPassword(user.repetirPassword);

      cy.get(registroPage.buttonEnviar).click();
      // método  para evaluar el mensaje de error de usuario ya registrado con el mismo correo
      registroPage.validarCorreo();

      
  });
  });


  
// Verificar que se muestre mensaje de error si el usuario ya hay un usuario registrado con el mismo DNI
   it('Validación de usuario ya existente con el mismo DNI', () => {
    cy.fixture('userRegister').then((data) => {
      const user = data.dniYaRegistrado;
      
      registroPage.escribirNombre(user.nombres);
      registroPage.escribirApellido(user.apellido);
      registroPage.escribirTelefono(user.telefono);
      registroPage.escribirDNI(user.dni);
      registroPage.seleccionarProvincia(user.provincia);
      registroPage.seleccionarLocalidad(user.localidad);
      registroPage.ingresarFechaNacimiento(user.dia, user.mes, user.anio);
      registroPage.escribirCorreo(user.email);
      registroPage.confirmarCorreo(user.confirmarEmail);
      registroPage.escribirPassword(user.password);
      registroPage.confirmarPassword(user.repetirPassword);

      cy.get(registroPage.buttonEnviar).click();
      // método  para evaluar el mensaje de error de usuario ya registrado con el mismo DNI
      registroPage.validarDNI();

      
  });
  });

  // Validar redirección a la vista del login
   it('Validación redirección al login', () => {
    
      cy.get(registroPage.btnLoginLink).click();
      cy.url().should('include', 'https://ticketazo.com.ar/auth/login')

      
  });
 

});