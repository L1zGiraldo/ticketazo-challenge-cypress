import RegistroPage from '../support/RegistroPage';
import {generarCorreo, generarDNI} from '../support/utils';  // para validar data dinámica 

describe('Pruebas de Registro en Ticketazo', () => {
  const registroPage = new RegistroPage();
  let data;

  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser'); // URL de prueba
    cy.fixture('datos_registro').then((fData) =>{
      data=fData;
    });
  });

  // Happy path
  it('Registro exitoso de usuario nuevo', () => {
    const baseUser = data.usuarioValido;
    const correo = generarCorreo(); // un solo correo aleatorio

    // sobrescribo lo que necesito aleatorio
    const userConDatosAleatorios = {
      ...baseUser,
      email: correo,
      confirmarEmail: correo,
      dni: generarDNI()
    };


    // uso el método para llenar los datos generales 
    registroPage.completarDatosGenerales(userConDatosAleatorios);

    // interceptar la petición de registro
    cy.intercept('POST','**/api/backend/register/register-user').as('register');

    cy.get(registroPage.buttonEnviar).click();

    // validar que el usuario si se registre exitosamente consultando la respuesta de la petición de registro
    cy.wait('@register').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });
  });



  // Verificar campos vacíos y mensaje de error 
  it('Validar mensaje de error por campos requeridos vacío', () => {
    registroPage.completarDatosGenerales(data.usuarioSinDatos);
    cy.get(registroPage.buttonEnviar).click();
    // método  para evaluar el mensaje de error de completa este campo
      registroPage.validarError();
    });
 

// Verificar campos que no cumplen con el formato de la cantidad de caracteres permitidos 
//o del formato admitido para el campo como el correo.
  it('Validación de formato de datos', () => {
    registroPage.completarDatosGenerales(data.usuarioDatosNoTienenFormato);
    registroPage.validarErrorFormato(registroPage.inputTelefono, data.usuarioDatosNoTienenFormato.telefono);
    registroPage.validarErrorFormato(registroPage.inputDni, data.usuarioDatosNoTienenFormato.dni);
    registroPage.validarErrorEmail(registroPage.inputCorreo, data.usuarioDatosNoTienenFormato.email);
    cy.get(registroPage.buttonEnviar).click();    
  });



// Verificar mensaje de error cuando ingreso un correo electrónico invalido sin completar si es .es .com .net

it('Validar mensaje de error al ingresar un correo electrónico inválido', () => {
      registroPage.completarDatosGenerales(data.usuarioCorreInvalido);
      cy.get(registroPage.buttonEnviar).click();
      // método  para evaluar el mensaje de error de correo inválido
      registroPage.validarDatoInvalido();
    
  });
  


  // Verificar que los correos sean iguales una vez se complete el registro
   it('Validar coincidencia entre el correo y su confirmación en el registro', () => {
      registroPage.completarDatosGenerales(data.usuarioDiferenteCorreo);
      cy.get(registroPage.buttonEnviar).click();
      // método  para evaluar el mensaje de error de no coincidencia en los correos ingresados
      registroPage.validarCoincidenciaEmail();
  });
  
  
  // Verificar que las contraseñas sean iguales una vez se complete el registro
   it('Validar coincidencia entre la contraseña ingresada y su confirmación en el registro. ', () => {
     registroPage.completarDatosGenerales(data.usuarioDiferentePassword);
      cy.get(registroPage.buttonEnviar).click();

      
      // método  para evaluar el mensaje de error de no coincidencia en las contraseñas ingresadas
      registroPage.validarCoincidenciaPassword();
  });


// Verificar que las contraseñas cumplan con la cantidad de caracteres solicitada
   it('Validar longitud mínima y criterios de complejidad de contraseña en registro', () => {
      registroPage.completarDatosSinPassword(data.contraseñaSinFormato);

      const invalidPasswords = ['ab1@defg', 'Abcdef@#', 'Abcdef12', 'ab123']
      cy.wrap(invalidPasswords).each((pass) => {
      // escribir/limpiar usando los métodos del page object
      registroPage.escribirPassword(pass)          
      registroPage.confirmarPassword(pass)  
       // interceptar la petición de registro
       cy.intercept('POST','**/api/backend/register/register-user').as('register')       
       cy.get(registroPage.buttonEnviar).click();

       cy.wait('@register').then((interception) => {
      // asegurarse que no sea un 201 (usuario creado)
      expect(interception.response.statusCode).to.not.eq(201)
       })
      registroPage.validarFormatoPassword()

      
  });
});
  

// Verificar que se muestre mensaje de error si el usuario ya está registrado con el mismo correo
   it('Restricción de registro con correo ya existente', () => {
     registroPage.completarDatosGenerales(data.correoYaRegistrado);
      cy.get(registroPage.buttonEnviar).click();
      // método  para evaluar el mensaje de error de usuario ya registrado con el mismo correo
      registroPage.validarCorreo();

      
  });
 


  
// Verificar que se muestre mensaje de error si el usuario ya hay un usuario registrado con el mismo DNI
   it('Restricción de registro con DNI ya existente ', () => {
     registroPage.completarDatosGenerales(data.dniYaRegistrado);
      cy.get(registroPage.buttonEnviar).click();
      // método  para evaluar el mensaje de error de usuario ya registrado con el mismo DNI
      registroPage.validarDNI();

      
  });


  // Verificar que la plataforma no permita el registro de menores de 18 años 

  it('Validar restricción de registro a menores de 18 años ', () => {

    const baseUser = data.noRegistrarMenoresDe18;
    const correo = generarCorreo(); // un solo correo aleatorio

    // sobrescribo lo que necesito aleatorio
    const userConDatosAleatorios = {
      ...baseUser,
      email: correo,
      confirmarEmail: correo,
      dni: generarDNI()
    };

    // uso el método para llenar los datos generales 
    registroPage.completarDatosGenerales(userConDatosAleatorios);

    // interceptar la petición de registro
    cy.intercept('POST','**/api/backend/register/register-user').as('register');

    cy.get(registroPage.buttonEnviar).click();

    // validar que el usuario no se pueda registrar porque es menor de edad 
    cy.wait('@register').then((interception) => {
      expect(interception.response.statusCode, "El usuario NO debería registrarse siendo menor de edad")
  .to.not.eq(201);
    });
  });




  

  // Validar redirección a la vista del login, si el usuario elije la opción de que ya tiene una cuenta 
   it('Validar redirección al login', () => {
    
      cy.get(registroPage.btnLoginLink).click();
      cy.url().should('include', 'https://ticketazo.com.ar/auth/login')
     

      
  });
 
});


