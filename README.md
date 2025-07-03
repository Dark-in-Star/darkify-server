
# 🎵 Darkify Server - Spotify OAuth Backend

A Node.js & TypeScript backend that authenticates users via Spotify OAuth 2.0 and retrieves access & refresh tokens. Built with Express, Axios, and Pino for structured logging.

---

## 🚀 Features

- 🔐 Spotify OAuth 2.0 login (Authorization Code Flow)
- 🎫 Callback handling to retrieve access and refresh tokens
- 🌍 Environment-configurable server address
- 📄 Typed using TypeScript
- 🧾 Logs using Pino and Morgan

---

## 📁 Project Structure

```
darkify-server/
├── src/
│   ├── services/
│   │   └── callback.service.ts
│   │   └── login.service.ts
│   ├── types/
│   │   └── token.ts
│   ├── utils/
│   │   └── logger.ts
│   │   └── getBaseUrl.ts
│   ├── handlers/
│   │   ├── error.handler.ts
│   │   └── route.handler.ts
│   ├── server.ts
│   └── index.ts
│   └── main.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/darkify-server.git
cd darkify-server
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
PORT=5000
ENV=development
COOKIE_SECRET_KEY=any_256-bit_WEP_Keys
COOKIE_SESSION_KEY1=any_152-bit_WEP_Keys
COOKIE_SESSION_KEY2=any_152-bit_WEP_Keys
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_CLIENT_ID=your_spotify_client_id
```

> Make sure your redirect URI is set to `http://127.0.0.1:5000/api/auth/callback` in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).

### 4. Run in development

```bash
yarn dev
```

> you can also Use `yarn dev:watch` for hot reload.

### 5. Build and run in production

```bash
yarn build
yarn start
```

---

## 🔁 OAuth Flow

1. Visit: `GET /api/auth/login`  
   ➜ Redirects to Spotify login

2. After login, Spotify redirects to:  
   `GET /api/auth/callback?code=...`  
   ➜ Backend exchanges code for access & refresh tokens

---

## 📦 API Endpoints

| Method | Endpoint                 | Description                       |
|--------|--------------------------|-----------------------------------|
| GET    | `/api/auth/login`        | Redirects to Spotify login        |
| GET    | `/api/auth/callback`     | Handles Spotify callback          |

---

## 📄 Example Response

```json
{
  "success": true,
  "data": {
    "access_token": "BQD...",
    "refresh_token": "AQD..."
  }
}
```

---

## 🧪 Testing

1. Open your browser:  
   `http://127.0.0.1:5000/api/auth/login`

2. Complete the Spotify login

3. You’ll be redirected to `/callback`, and the server will return the token JSON.

---

## 🛠 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **Axios** (HTTP requests)
- **Pino** + **Morgan** (logging)
- **dotenv** (env config)
- **cookie-session**, **passport** (ready for extensions)

---

## 🔐 Notes on Security

- Always use `127.0.0.1` instead of `localhost` in redirect URIs
- Never expose your `CLIENT_SECRET` in the frontend

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## ✨ Author

Developed by [Sounak Guha](https://github.com/dark-in-star)