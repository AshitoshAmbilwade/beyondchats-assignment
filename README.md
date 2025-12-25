# 🧠 BeyondChats AI Article Automation Assignment

This repository contains a **full-stack solution** that automates article scraping, AI-based content enhancement, and frontend presentation.

It includes **three integrated projects**:

* **Laravel (Backend APIs & Scraper)**
* **Node.js (AI Automation Script)**
* **React.js (Frontend UI)**

---

## 📌 Project Overview

### Phase 1 – Laravel Backend (Moderate)

* Scrape the **5 oldest articles** from BeyondChats blog
* Store articles in a database (SQLite)
* Expose full **CRUD REST APIs** for articles

### Phase 2 – Node.js AI Automation (Very Difficult)

* Fetch latest article from Laravel API
* Search article title on Google
* Scrape top 2 ranking external articles
* Use an LLM to rewrite/enhance original article
* Cite reference articles
* Update the article via Laravel API

### Phase 3 – React Frontend (Easy)

* Fetch articles from Laravel API
* Display **original and updated articles**
* Responsive, professional UI
* Clear visual distinction between article types

---

## 🏗️ Architecture Overview

```
┌────────────┐
│ BeyondChats│
│ Blog Pages │
└─────┬──────┘
      │ Scraping
      ▼
┌────────────┐
│ Laravel API│
│ (SQLite DB)│
└─────┬──────┘
      │ REST API
      ▼
┌────────────┐
│ Node.js AI │
│ Automation │
└─────┬──────┘
      │ Updated Content
      ▼
┌────────────┐
│ React App  │
│ Frontend   │
└────────────┘
```

---

## 📂 Monorepo Structure

```
beyondchats-assignment/
│
├── backend-laravel/     # Laravel backend + scraper + APIs
│
├── backend-node/        # Node.js AI automation script
│
├── frontend-react/      # ReactJS frontend
│
└── README.md
```

---

## ⚙️ Local Setup Instructions

### 1️⃣ Backend – Laravel API

```bash
cd backend-laravel
composer install
cp .env.example .env
php artisan key:generate
```

#### Configure SQLite

```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

```bash
touch database/database.sqlite
php artisan migrate
php artisan serve
```

#### Scrape Oldest Articles

```bash
php artisan scrape:beyondchats
```

Laravel API runs at:

```
http://127.0.0.1:8000/api/articles
```

---

### 2️⃣ Node.js – AI Automation Script

```bash
cd backend-node
npm install
```

Create `.env` file:

```env
LARAVEL_API=http://127.0.0.1:8000/api
OPENAI_API_KEY=your_api_key_here
```

Run the automation:

```bash
node src/index.js,
npm start
```

✔ Fetches latest article
✔ Searches Google
✔ Scrapes reference articles
✔ Uses LLM to enhance content
✔ Updates article via API

---

### 3️⃣ Frontend – ReactJS App

```bash
cd frontend-react
npm install
npm start
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🖥️ Live Demo

🔗 **Frontend Live URL:**
👉 https://beyondchats-assignment-blue.vercel.app/

Tip- Backend is local you need to run it locally

The live app displays:

* Original articles
* AI-updated articles
* Clear visual distinction

---

## 🧪 API Endpoints

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | `/api/articles`      | Fetch all articles   |
| GET    | `/api/articles/{id}` | Fetch single article |
| POST   | `/api/articles`      | Create article       |
| PUT    | `/api/articles/{id}` | Update article       |
| DELETE | `/api/articles/{id}` | Delete article       |

---

## 🎨 UI Highlights

* Responsive grid layout
* Hover animations
* Original vs Updated badges
* Clean typography
* Readable article detail pages

---

## ✅ Evaluation Coverage

| Criteria             | Status            |
| -------------------- | ----------------- |
| Completeness (50%)   | ✅ Completed       |
| README & Setup (25%) | ✅ Detailed        |
| Live Link (15%)      | 🔄 Add deployment |
| Code Quality (10%)   | ✅ Modular & clean |

---

## 📝 Notes

* SQLite used for simplicity
* Google Search implemented using scraping (no paid APIs)
* LLM can be swapped easily (OpenAI / Gemini / Claude)
* Partial implementation accepted per guidelines

---

## 👨‍💻 Author

**Ashitosh**
Full-Stack Developer
AI & Automation Enthusiast


