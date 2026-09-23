# 🎓 Sistema Web de Gestión Académica

Proyecto final desarrollado para la materia de **Programación Web** de la carrera de **Ingeniería en Software de la Universidad de Colima**.

El proyecto consiste en un sistema web académico desarrollado de manera colaborativa, con diferentes tipos de usuario y funcionalidades para la gestión de información académica.

## 🎯 Objetivo

Aplicar los conocimientos adquiridos durante la materia de Programación Web mediante el desarrollo de una aplicación web con frontend y backend, incorporando gestión de usuarios, diferentes vistas, sesiones y funcionalidades para la administración de información académica.

El proyecto también permitió poner en práctica un flujo de trabajo colaborativo mediante **Git y GitHub**.

## ✨ Funcionalidades

El sistema cuenta con diferentes vistas y funcionalidades de acuerdo con el tipo de usuario.

### 👨‍💼 Administrador

El módulo de administración incluye funcionalidades relacionadas con:

- Registro de alumnos.
- Registro de maestros.
- Registro y consulta de carreras.
- Registro y consulta de grupos.
- Registro y consulta de materias.
- Registro de semestres.
- Consulta de alumnos aprobados.
- Consulta de alumnos reprobados.
- Navegación mediante un panel administrativo.

### 👨‍🎓 Alumnos

El sistema incluye una sección específica para alumnos, con vistas y funcionalidades correspondientes a este tipo de usuario.

### 👩‍🏫 Maestros

El sistema incluye una sección específica para maestros, con vistas y funcionalidades correspondientes a este tipo de usuario.

### 🔐 Sesiones y acceso

El proyecto incorpora funcionalidades relacionadas con el acceso y manejo de sesiones:

- Inicio de sesión.
- Validación de sesiones activas.
- Cierre de sesión.
- Control de acceso a diferentes vistas del sistema.

## 🛠️ Tecnologías utilizadas

### Backend

- **Node.js**
- **Express.js**

### Frontend

- **HTML**
- **CSS**

### Herramientas de desarrollo y colaboración

- **Git**
- **GitHub**
- **npm**
- **Nodemon**

## 🏗️ Estructura del proyecto

El repositorio separa el backend, las vistas, los estilos y los recursos utilizados por la aplicación.

```text
Proyectofinalprogramacionweb/
│
├── backend/
│   ├── config/
│   ├── controller/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
│
├── html/
│   ├── Administrador/
│   ├── Alumnos/
│   ├── Maestros/
│   ├── Inicio-de-sesion/
│   └── inicio.html
│
├── Imagenes/
├── styles/
└── README.md
```

### Backend

La carpeta `backend/` contiene la lógica del lado del servidor y está organizada en diferentes módulos:

- `config/` — archivos de configuración del sistema.
- `controller/` — lógica relacionada con las funcionalidades de la aplicación.
- `models/` — modelos utilizados para trabajar con los datos.
- `routes/` — definición de las rutas utilizadas por el servidor.
- `app.js` — punto de entrada del backend.
- `package.json` — configuración, scripts y dependencias del proyecto.

### Frontend

La carpeta `html/` contiene las diferentes vistas del sistema organizadas de acuerdo con el tipo de usuario:

- `Administrador/`
- `Alumnos/`
- `Maestros/`
- `Inicio-de-sesion/`

Los estilos de la interfaz se encuentran organizados en la carpeta `styles/`, mientras que los recursos gráficos se almacenan en `Imagenes/`.

## 🤝 Desarrollo colaborativo

El proyecto fue desarrollado en equipo utilizando **Git y GitHub** para administrar el código y coordinar los cambios realizados por los diferentes integrantes.

Durante el desarrollo se trabajó con:

- Ramas para desarrollar diferentes funcionalidades.
- Commits para registrar el progreso y los cambios realizados.
- Pull Requests para integrar trabajo.
- Merges para incorporar cambios a la rama principal.
- Integración de cambios desarrollados por diferentes integrantes del equipo.

Este flujo permitió practicar el uso de herramientas de control de versiones dentro de un proyecto colaborativo.

## 🚀 Ejecución del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/juanpaceja/Proyectofinalprogramacionweb.git
```

### 2. Acceder al backend

```bash
cd Proyectofinalprogramacionweb/backend
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Iniciar el servidor

```bash
npm start
```

Para ejecutarlo en modo de desarrollo con Nodemon:

```bash
npm run dev
```

## 📦 Dependencias principales

El backend utiliza las siguientes dependencias principales:

- **Express.js** — framework utilizado para el servidor y manejo de rutas.
- **Nodemon** — herramienta utilizada durante el desarrollo para reiniciar automáticamente el servidor después de detectar cambios.

## 🎓 Contexto académico

Este proyecto fue realizado como trabajo final de la materia de **Programación Web** de la carrera de **Ingeniería en Software en la Universidad de Colima**.

El repositorio se conserva como evidencia del proceso de aprendizaje, desarrollo web y trabajo colaborativo realizado durante la materia.
