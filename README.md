# 🍳 Recipe Manager

A simple web application for managing cooking recipes. Users can browse, create, edit, delete recipes, and add comments to their favorite recipes.

---

## 📋 Project Description

**Recipe Manager** is a full-stack web application built with **Node.js + Express**, **MongoDB** database, and **EJS** templates.

The project demonstrates:
- Basic CRUD operations (Create, Read, Update, Delete)
- Data filtering and sorting
- Comment system with Fetch API
- Input validation and error handling
- Custom error pages
- Responsive CSS design

Perfect for learning full-stack development with Node.js and MongoDB.

---

## ✨ Features

### 📖 Recipe Management
- ✅ **Browse** all recipes list
- ✅ **Create** new recipes with validation
- ✅ **Edit** existing recipes
- ✅ **Delete** recipes
- ✅ **View** recipe details

### 🔍 Search & Filtering
- ✅ **Search** by recipe name (with sanitization)
- ✅ **Filter** by preparation time (min/max)
- ✅ **Sort** by: name, date added, preparation time
- ✅ **Order** ascending/descending

### 💬 Comments System
- ✅ **Add** comments to recipes
- ✅ **Anonymous** or named comments
- ✅ **Delete** comments
- ✅ **API** based on Fetch (JSON communication)

### ⚠️ Error Handling
- ✅ **Input** validation
- ✅ **Custom** error pages
- ✅ **Proper** HTTP status codes
- ✅ **User-friendly** messages

---

## 🚀 Installation & Running Instructions
### Clone the repository
```bash
git clone https://github.com/zpiotrrr-prog/J132
cd J132
```

### Requirements
- **Node.js** v18+ (LTS recommended)
- **npm** (Node Package Manager)
- **MongoDB** (or Docker to run MongoDB)
- **Docker** (or Docker Desktop)
- **Git** (optional)



# Run MongoDB 6.0 in background
Check [docker.txt](docker.txt) for informations.
```bash
# Verify container is running
docker ps
```

### Step 2: Install Dependencies
```bash
# Install all required npm packages
npm install

# Clean old packages if needed
npm prune
```

### Step 3: Start Application
```bash
# Run the app
npm start

# You should see: "Server listening on port 3000"
```

### Step 4: Open in Browser
```
http://localhost:3000
```

### Docker instructions
Detailed Docker setup and notes are provided in [docker.txt](docker.txt). 
### ✅ Done!
The application is ready. You can:
- Browse recipes
- Create new recipes
- Edit existing recipes
- Add comments
- Search and filter

---

## 🔗 API Endpoints

### Main Pages (GET)
| Endpoint | Description |
|----------|-------------|
| `GET /` | Recipe list with filtering |
| `GET /?search=name` | Search recipe by name |
| `GET /?minTime=30&maxTime=60` | Filter by preparation time |
| `GET /?sortBy=recipe_name&sortOrder=asc` | Sort recipes |

### Recipe Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/recipe/new` | New recipe form |
| `POST` | `/recipe/new` | Save new recipe |
| `GET` | `/recipe/:id/edit` | Edit recipe form |
| `POST` | `/recipe/:id/edit` | Save recipe changes |
| `GET` | `/recipe/:id/details` | Recipe details + comments |
| `POST` | `/recipe/:id/delete` | Delete recipe |

### Comments API (JSON)
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/comment` | Add comment | `{ "recipeId": "...", "text": "...", "username": "..." }` |
| `POST` | `/comment/:commentId/delete` | Delete comment | `{ }` |

---

## 🛠️ Technologies

### Backend
- **Node.js** v18+ — JavaScript runtime environment
- **Express.js** — Web application framework
- **MongoDB** 6.0 — NoSQL document database

### Frontend
- **EJS** — Embedded JavaScript templating
- **CSS3** — Styling and responsive design
- **Vanilla JavaScript** — Fetch API for async communication

### Tools
- **npm** — Package manager
- **Docker** — Database containerization
- **MongoDB Shell** — Database management

### Stack Overview
- **Data Layer:** MongoDB
- **Logic Layer:** Node.js + Express
- **Presentation Layer:** EJS + CSS + JavaScript

---

## 📁 Project Structure

```
Project/
│
├── src/
│   ├── app.js                           # Express configuration
│   ├── server.js                        # Application entry point
│   │
│   ├── data/
│   │   └── connection.js                # MongoDB connection
│   │
│   ├── routes/
│   │   └── recipesRouter.js             # Route definitions
│   │
│   ├── controllers/
│   │   ├── recipesController.js         # Recipe logic
│   │   └── commentsController.js        # Comments logic
│   │
│   ├── models/
│   │   ├── recipesModels.js             # DB queries — recipes
│   │   └── commentsModels.js            # DB queries — comments
│   │
│   ├── views/
│   │   ├── pages/
│   │   │   ├── show.ejs                 # Recipe list
│   │   │   ├── new.ejs                  # Create form
│   │   │   ├── edit.ejs                 # Edit form
│   │   │   ├── details.ejs              # Details + comments
│   │   │   └── error.ejs                # Error page
│   │   └── partials/
│   │       ├── header.ejs               # Header
│   │       └── footer.ejs               # Footer
│   │
│   └── public/
│       └── css/
│           └── styles.css               # Stylesheet
│
├── package.json                         # Project configuration + dependencies
├── README.md                            # This file
├── docker.txt                           # Docker instructions
└── LICENSE                              # License
```

---

## 💾 Database Schema

### Collection: recipes
```json
{
  "_id": "ObjectId('507f1f77bcf86cd799439011')",
  "recipe_name": "Pasta Carbonara",
  "description": "Traditional Italian pasta with bacon, egg, and pecorino romano sauce.",
  "required_time": 30,
  "createdAt": "2025-12-19T10:30:00Z"
}
```

**Validation Rules:**
- `recipe_name`: required, min 3 characters
- `description`: required, min 10 characters
- `required_time`: required, positive number (minutes)
- `createdAt`: auto-generated timestamp

### Collection: comments
```json
{
  "_id": "ObjectId('507f1f77bcf86cd799439012')",
  "recipeId": "ObjectId('507f1f77bcf86cd799439011')",
  "username": "Anonymous user",
  "text": "Great recipe! I recommend it.",
  "createdAt": "2025-12-19T11:45:00Z"
}
```

**Validation Rules:**
- `recipeId`: required, reference to recipe
- `username`: optional, defaults to "Anonymous user"
- `text`: required, min 1 character
- `createdAt`: auto-generated timestamp

---

## ⚙️ Configuration

### Application Port
- Default: **3000**
- Change: edit `src/server.js`

### MongoDB Connection
- Connection String: `mongodb://localhost:27017`
- Database Name: `recipes`
- File: `src/data/connection.js`

### Additional Settings
- HTML form filtering
- Search sanitization
- 404 and 500 error handling
- Mobile-first responsive design

---

For detailed Docker instructions, see [docker.txt](docker.txt).

---

## 🐛 Troubleshooting

### Problem: "Cannot connect to MongoDB"
```bash
# Check if Docker is running
docker ps

# Check container logs
docker logs recipes-mongo

# Verify connection in src/data/connection.js
```

### Problem: "Port 27017 already in use"
```bash
# Stop existing container
docker stop recipes-mongo

# Or use different port with -p 27018:27017
# Remember to update connection string!
```

### Problem: "npm install hangs or fails"
```bash
# Clear npm cache
npm cache clean --force

# Delete and reinstall
rm -rf node_modules
npm install
```

### Problem: "Recipes not showing"
```bash
# Check if MongoDB is running
docker ps

# Check database name in src/data/connection.js

# Check browser console (F12) and server logs
```

---

##  Author

- Piotr Zając 


## 📚 Additional Resources

- **MongoDB Documentation:** https://docs.mongodb.com/
- **Express.js Guide:** https://expressjs.com/
- **Node.js Documentation:** https://nodejs.org/docs/
- **Docker Getting Started:** https://docs.docker.com/get-started/
- **EJS Template Engine:** https://ejs.co/

---

## 📝 License

Project available under **MIT** license. See [LICENSE](LICENSE) file for details.

---

## ✅ Pre-Launch Checklist

Before running the application, verify:

- ☐ Node.js v18+ installed (`node --version`)
- ☐ npm installed (`npm --version`)
- ☐ Docker installed and running
- ☐ `npm install` completed without errors
- ☐ MongoDB container is running (`docker ps`)
- ☐ Port 3000 is available
- ☐ Port 27017 is available
- ☐ Database name is `recipes`
- ☐ Connection string: `mongodb://localhost:27017`

---

**Have questions?** Check [docker.txt](docker.txt) or documentation for the technologies listed above.

**Ready to start?** Follow the "Installation & Running Instructions" section 🚀

