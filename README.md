
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
├── e2e/                 # Archivos de pruebas end-to-end
│   └── registro_ticketazo.cy.js
├── fixtures/            # Datos de prueba (mock data)
│   └── userRegister.json
├── support/             # Comandos y Page Objects
│   ├── pages/
│   │   └── RegistroPage.js
│   └── commands.js
├── cypress.config.js    # Configuración principal de Cypress
│── README.md

```
___

## 📌 Entregables

📊 Casos de prueba (Google Sheets)
👉 [Ver casos de prueba](https://docs.google.com/spreadsheets/d/1YeyZIgGhVAkXvODsFKHLQxGjsXxmq5gBFEAY_VlRB-8/edit?usp=sharing)

___

## 🐞 Reporte de defectos

Los defectos y mejoras encontrados durante la ejecución se registran y gestionan en un tablero público de Trello.

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
git clone git@github.com:L1zGiraldo/ticketazo-challenge-cypress.git

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

Modo headless (ejecuta todo en consola)
```bash
npx cypress run
``` 

___
## 📄 Licencia
Este proyecto está bajo la licencia MIT.  
Consulta el archivo [LICENSE](https://github.com/L1zGiraldo/ticketazo-tests/blob/main/LICENSE) para más información.

