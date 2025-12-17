# 🌍 ReserHub - Weather Challenge

> This is a full-stack challenge for weather and city exploration. It consists of a modern **Reactapplication** for a rich user experience and a secure, powerful **Node.js + TypeScript + Express REST API** that serves as the central data engine.

## Architecture Overview

![Diagram architecture](img/ReserhubArchitecture.png)

## 📦 Project Components

### 1. ⚡ Reserhub Challenge Backend

### Getting started

Please follow the instructions to running backend service [Go to README.md](backend/README.md)

### 2. 🚍☀️ ReserHub Challenge - Frontend

### Getting started

Please follow the instructions to running frontend [Go to README.md](frontend/reserhub-challenge-app/README.md)

---

## Why I used this Stack?

### Frontend

- I used React + Vite + Typescript because this stack allows you to build a high-performance, maintainable, and secure application by designing a modern web ecosystem. Also, because adding a layer of static typing, you catch errors during development rather than at runtime, and its easier to handle the data.

- I used React Query because it provides out-of-the-box caching, background synchronization, and loading/error states, drastically reducing boilerplate and improving user experience.

I used TailwindCss because it eliminates the need for massive CSS files and ensures a consistent design system while keeping the final build size minimal.

- I used JWT to protect routes because the server doesn't need to store session data, the app is more scalable and works seamlessly across different platforms or subdomains.

### Backend

- - I used Node.js + Express because provides a minimalist framework to build robust routing with very little overhead. So, is easy to develop an API REST so fast.

- I used MongoDB Atlas because is a document-oriented database. It allows flexible schemas, is a cloud service ready-to-use. So, its a good option to create simple apps so fast. You dont need to create complex tables and structures.

- I consolidated the API by unifying the OpenWeather API, Reservamos API and GeoDB Cities API into a single custom endpoint because:

- Simplified Client Logic: avoid the frontend managing a lot of different sets of API keys, base URLs, and data formats.

- Security & Rate Limiting: hide sensitive API keys on the server rather than exposing them in the frontend code.

## How I used the AI to creat this challenge

To develop this challenge I used the AI as a AI Thought Partner, providing a continuous feedback loop that accelerated my development from architectural decisions to final UI.

- I evaluated Vite + React + TypeScript as the best option for Frontend apps.

- I discussed the BFF (Backend for Frontend) pattern to unify the OpenWeather, GeoDB Cities API and Reservamos APIs into a single Node.js/Express service, reducing the complexity of the frontend logic.

- I request the initial setup for React Query providers and JWT authentication interceptors.

- I shared code blocks to get ways to make them more "DRY" (Don't Repeat Yourself), such as moving repetitive API calls into custom hooks like useWeather().

- I requested to write the functions that map the raw JSON from two different APIs into a unified format for your UI. Like unify a city with its current weather.

- I consulted good practices to use JWT from API to Frontend.

- I requested Tailwind class strings for responsive grids and flexboxes.

- I requested modern design patterns like "glassmorphism" or skeleton loaders to enhance the speed while data is fetching via React Query.

### Some successful scripts

**Query to get good practices about project structure with Node.js + Express.js**

```
Hola gemini. Tengo un proyecto nodejs + express + TypeScript + mongoose.
Quiero crear un modelo de datos llamado User que contenga username y password.
Tambien quiero crear 2 endpoints en mi API REST, un endpoint para sign in y otro para sign up.
Crea una guia paso a paso como crear mi estructura en el proyecto para crear estas funcionalidades.
Quiero mantener una estructura en el proyecto para identificar rapidamente cada componente de la App.
```

**Create images to get ideas for UI/UX**

```
Basado en esta pagina web, obten la paleta de colores en codigos HEX para crear diseños basados en esa interfaz, en una app de React

https://reserhub.com/es/

Tambien crea una imagen con un formulario Login y Sign up basado en los estilos del sitio web
```

**Request feedback for UI improvements**

```
I created this card to display the city's weather.
Could you give me a feedback?

Based in UX/UI principles and best practices, Could you create an image with a better design and palette colors?
```

**Find public APIs**

```
Hola chat, necesito utilizar una API publica que me permita obtener una lista de ciudades, similar a la api publica de reservamos: https://api-docs.reservamos.mx/ Necesito poder extraer los nombres de las ciudades, hacer queries para buscar una ciudad por su nombre, obtener lat y long, etc. Puedes hacerme una lista de las paginas con API Publicas que cumplan con estas caracteristicas? Es muy importante que sean gratuitas. Necesito consumir la API desde una app con NodeJs, es importante que sea compatible
Debe cumplir con estos requisitos:
- Poder listar ciudades aleatorias
- Poder listas las ciudades de un pais en especifico
- Poder buscar una ciudad dado su nombre o un prefix
- Debe ser gratuita, no importa que tenga limite de requests
- Facil de usar e integrar a una api
- Debe regresarme por lo menos: city name, type: city, latitud and lon
```

**Find alternatives to complex libraries**

```
Estoy haciendo una API con nodejs + typescript + express Esta api consume algunos servicios de openWeather API, quiero crear un cache management para evitar hacer demasiadas request a openWeather API. Cual es la forma mas recomendada de crear un sistema de caché en una api nodejs de forma sencilla? Puedes mostrarme un ejemplo de cada recomendacion? No quiero usar Redis porque tengo pocos endpoints y complicaria mi desarrollo rapido para esta API
```

**Find an Icon Provider**

```
Cual es la mejor libreria gratuita y facil de usar para agregar iconos a mi pagina React + Vite + Tailwindcss?

Debe cumplir con lo siguiente:
- Libreria ligera.
- Amplia variedad de iconos
- Iconos gratuitos
- Facil de usar y de importat a la UI
- Modificables, que permita agregar estilos
- Documentacion easy-to-read
- Iconos responsive
```
