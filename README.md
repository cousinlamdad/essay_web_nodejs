# Essay Web

A simple essay management web app built with **Node.js**, **React**, **TypeScript**, **i18n**, and **MariaDB**.

## Features

- **Input Essay** — save an essay to MariaDB
- **Essay List** — view all saved essays
- **Essay Detail** — click an essay to display it
- **i18n** — switch between English and Chinese (中文)

## Tech Stack

- Frontend: React + TypeScript + Vite + react-router-dom + react-i18next
- Backend: Node.js + Express + TypeScript + mysql2
- Database: MariaDB

## Project Structure

```
essay_web/
├── server/
│   └── index.ts            # Express API server
├── src/
│   ├── locales/
│   │   ├── en.json         # English translations
│   │   └── zh.json         # Chinese translations
│   ├── pages/
│   │   ├── InputEssay.tsx
│   │   ├── EssayList.tsx
│   │   └── EssayDetail.tsx
│   ├── App.tsx
│   ├── i18n.ts
│   ├── main.tsx
│   └── style.css
├── index.html
├── vite.config.ts
├── .env.example
└── .env
```

## Prerequisites

- Node.js (>= 20)
- MariaDB running locally (or a reachable MariaDB instance)

## Database Setup

1. Create a database and user:

```sql
CREATE DATABASE IF NOT EXISTS essay_web
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'essay_app'@'localhost'
  IDENTIFIED VIA mysql_native_password USING PASSWORD('your_app_password');

GRANT ALL PRIVILEGES ON essay_web.* TO 'essay_app'@'localhost';
FLUSH PRIVILEGES;
```

2. Create the `essays` table:

```sql
CREATE TABLE IF NOT EXISTS essays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
PORT=3001
DB_HOST=localhost
DB_PORT=3307
DB_USER=essay_app
DB_PASSWORD=your_app_password
DB_NAME=essay_web
```

> `.env` is git-ignored and should never be committed.

## Install

```bash
npm install
```

## Development

Run backend + frontend together:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

Vite proxies `/api/*` to the backend.

## Production Build

```bash
npm run build
```

## Run the Built Website

After building, start the production server:

```bash
npm run start
```

Then open: http://localhost:3001

The Express backend serves the built `dist` frontend and the API from the same port.

## API Endpoints

| Method | Path              | Description               |
| ------ | ----------------- | ------------------------- |
| POST   | `/api/essays`     | Create a new essay        |
| GET    | `/api/essays`     | List all essays           |
| GET    | `/api/essays/:id` | Get one essay by ID       |

### Request body (POST)

```json
{
  "title": "My Essay",
  "content": "Essay body..."
}
```

## i18n

Translations are defined in `src/locales/`. Use the button in the top navigation to toggle between English and Chinese.

To add another language, create `src/locales/<lang>.json` and register it in `src/i18n.ts`.
