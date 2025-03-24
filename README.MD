# Reciplanner Documentation

## Project Overview
**Name:** Reciplanner  

**Description:**  
The project was originally a MERN project, which later got modified to ASP.NET core backend, and Postgresql database.
The app also got extended features in the change.

*Disclaimer: The project was started in an earlier phase of my studies, not being familar with proper version control & github usage.*

**App demo:**

![App Demo](./Documentation/demo.gif)
*https://youtu.be/9zYHoHwPVG0*

**Deployed version**

https://reciplanner-v2-client.onrender.com/

##  1. Main features: 
- Choose recipes from external API
- Save recipe with desired date, mealtype, servings amount into local sql db
- Track your calendar of planned food
- Weekly / Monthly calendar
- Edit & delete saved recipes

## 2. Technology Stack
- **Frontend:** React, Vite
- **Backend:** ASP.NET Core, C#
- **Database:** PostgreSQL

## 3. Installation and Running

- **Github repo:** https://github.com/Gele93/Reciplanner_v2.git

### 3.1. Prerequisites
- Node.js & npm
- .NET SDK
- PostgreSQL

### 3.2. Starting the Backend
```sh
cd server
cd ReciPlanner
dotnet restore
dotnet run
```

### 3.3. Starting the Frontend
```sh
cd client
npm install
npm run dev
```

### 3.4. Starting the Database
```sh
run CreateDatabase.sql
```

## 4. Usage Examples
### 4.1. API Endpoints
- **POST /api/recipes** - Create recipe element
- **GET /api/recipes** - Get recipes for user
- **POST /api/user/register** - Register user
- **POST /api/user/login** - Login user

## 5. Architecture
The project is built with an **MVC-based backend** and a **component-based frontend**.

## 6. Database Structure (SQL)
- **Users**
- **Recipes**
- *sub-tables* 
- *sub-tables-to-recipes* -> many-to-many relationship 

## 7. Contribution
- **Fork the repo**
- **Create a branch**
- **Submit a PR**

## 8. Contact
Developer: **[Gelecsák Tamás]**  
Email: **[gelecsak.tamas@gmail.com]**  
LinkedIn: **[https://www.linkedin.com/in/tamasgelecsak]**
