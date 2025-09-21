
# 🎫 Ticketazo Challenge – Automatización con Cypress


## 📌 Objetivo

Este proyecto forma parte del challenge de XAcademy, cuyo propósito es poner en práctica la elaboración de planes de prueba y la automatización de casos funcionales con Cypress, aplicando buenas prácticas de reporte de defectos  y de creación de scripts de pruebas.  

___

## 🖥️ Sistema Bajo Prueba (SBP)

El sistema bajo prueba es [Ticketazo](https://ticketazo.com.ar/) , una plataforma web enfocada en la venta de entradas para eventos culturales, recitales y conferencias. Se busca automatizar las funcionalidades principales (registro, login, compra de entradas y creación de eventos) y reportar los defectos encontrados.

___

## 🗂️ Estructura del proyecto
```bash
cypress/
├── e2e/                           # Pruebas end-to-end
│   ├── Accesibilidad_1.cy.js
│   ├── Test_case_compras.cy.js
│   ├── crear_evento_neg.cy.js
│   ├── filtro_eventos.cy.js
│   ├── login.cy.js
│   ├── perfil-pass.cy.js
│   └── registro_comprador.cy.js
│
├── fixtures/                      # Datos de prueba y recursos
│   ├── carnival.png
│   ├── concierto400x400.jpg
│   ├── datos-perfil.json
│   ├── datos_invalidos_evento.json
│   ├── datos_login.json
│   ├── datos_registro.json
│   ├── datos_validos_evento.json
│   ├── estado_alternado.json
│   └── imagHorizontal.jpg
│
├── screenshots/                   # Evidencias de ejecución (screenshots)
│
└── support/                       # Soporte y utilidades para los tests
    ├── FiltroPage.js              # Page Object para filtros
    ├── RegistroPage.js            # Page Object para registro
    ├── commands.js                # Custom commands de Cypress
    ├── e2e.js                     # Configuración global de tests e2e
    ├── eventUtils.js              # Funciones utilitarias para eventos
    └── utils.js                   # Funciones utilitarias generales

```
___

## 📌 Entregables

📊 Casos de prueba (Google Sheets)
👉 [Ver casos de prueba](https://docs.google.com/spreadsheets/d/1YeyZIgGhVAkXvODsFKHLQxGjsXxmq5gBFEAY_VlRB-8/edit?usp=sharing)

___

## 🐞 Reporte de defectos

Los defectos y mejoras encontrados durante la ejecución se registran y gestionan en un tablero público de Trello.
👉 [Ver trello](https://trello.com/b/0NsNJUP3/grupo-3-tiketazo)

___

## ✅ Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado en tu máquina:

- Node.js (versión 18 o superior)

- npm (incluido con Node.js)

- Git

___

## ⚙️ Instalación y ejecución

1. 👨‍💻 Clonar el repositorio: 
```bash
git clone https://github.com/L1zGiraldo/ticketazo-challenge-cypress.git

cd ticketazo-challenge-cypress
```
2. ⬇️ Instalar dependencias:
   
```bash
npm install
```

3. 👉 Ejecutar las pruebas

Modo interactivo (abre la app de Cypress):

```bash
npx cypress open
```

Modo headless (ejecuta todo en consola):
```bash
npx cypress run
``` 

___
## 📄 Licencia
Este proyecto está bajo la licencia MIT.  
Consulta el archivo [LICENSE](https://github.com/L1zGiraldo/ticketazo-challenge-cypress/blob/main/LICENSE) para más información.

