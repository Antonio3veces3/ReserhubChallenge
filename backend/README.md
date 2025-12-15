# Reserhub Challenge Backend

# 🌩️ ReserHub - Weather & Cities REST API

A robust and secure backend service built with **Node.js, TypeScript, and Express** that centralizes city data and real-time weather information, using **MongoDB** for persistence and **JWT** for authentication.

## ✨ Features & Capabilities

- **Secure Authentication:** Utilizes JSON Web Tokens (JWT) for user sign-up and sign-in, ensuring secure, protected access to API endpoints.

- **Cache management:** cache external API responses to improve the performance for requests.

- **Comprehensive City Data**: Offers various endpoints to query city information:
  - Retrieve a random city.
  - Search/autocomplete cities by prefix.
  - Filter cities by country code.
  - Filter cities by population range.

- **Real-time Weather Integration:** Connects to external services to provide accurate weather information:
  - Fetch current weather conditions. **(OpenWeather)**

  - Retrieve the multi-day forecast. **(OpenWeather)**

- **Cities API Integration:** connected to GEO DB Cities API.

## 🛠️ Technology Stack

- Node.js
- Express.js
- Mongoose
- MongoDB
- Node cache
- JWT
- Open Weather API
- Geo Cities DB API

## 🚀 Getting Started

### Prerequisites

You need to have **Node.js >= v.22.21.1** and **npm** installed on your system.

### Installation

1.  Install dependencies:

```bash
cd backend/

npm install
```

2. Create environment file

Create a copy of `example.env` and rename as `.env`
Then, add the `secret keys` from the file I attached to the email, when I confirm the challenge was completed.

### Running the App

Start the development server:

```bash
npm run dev
```

### Next step

The server should be running on **http://localhost:3000**
