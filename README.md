# 🌦️ Atmosphere – Weather Website

Atmosphere is my **first personal web development project**, created to understand how real-world projects work using **Git, GitHub, APIs, and modern frontend tools**.

This project helped me learn:
- How Git & GitHub work
- How to structure a real project
- How APIs are used in websites
- How environment variables work
- How frontend and backend connect

> ⚠️ This project is **not deployed yet**. Deployment will be done in the future as I continue learning.

---

## 🚀 Project Overview

Atmosphere is a weather website that fetches **real-time weather data** using the **OpenWeather API**.  
It can show weather based on:
- User’s current location (via browser permission)
- City search (work in progress)

---

## ✨ Features (Current)

- 🌍 Current location weather (GPS-based)
- 🌡️ Temperature & weather condition
- 🕒 Hourly weather forecast (limited)
- 💧 Humidity
- 🌬️ Wind speed
- 👁️ Visibility
- ⚖️ Pressure
- 🫁 Air Quality Index (AQI)
- 🕓 Last updated time (updates on refresh)
- 🎨 Modern UI with icons & cards

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript  
- **Styling:** Tailwind CSS  
- **Icons:** Lucide React  
- **Backend:** Next.js API Routes  
- **API:** OpenWeather API  
- **Version Control:** Git & GitHub  

---

## 🔐 API & Security

- OpenWeather API key is stored using **environment variables**
- API requests are handled on the **server side**
- API key is **not exposed** in frontend code

---

## 📂 Project Purpose

This project was built mainly to:
- Learn **Git & GitHub workflow**
- Understand **commits, branches, resets**
- Learn how APIs are integrated
- Gain confidence in building real projects

It is **not a production app**, but a **learning project**.

---

## 🚧 Work in Progress / Future Plans

- 🔍 City search functionality
- 📅 Proper 7-day forecast
- ⚠️ Better error handling
- 📱 Improved mobile UI
- 🚀 Deployment on Vercel
- 🌗 Dark / Light mode

----

## 📌 How to Run Locally

```bash
git clone <repository-url>
cd atmosphere
npm install
npm run dev
