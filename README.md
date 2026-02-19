#  BookManager — Intern Assignment

A full-stack **Book Management System** built with **Angular** (frontend) and **ASP.NET Core with C#** (backend).

---

##  Project Structure

```
Assignment_Aathif/
├── BookManagerAPI/                    ← ASP.NET Core C# Backend
│   ├── Controllers/
│   │   └── BooksController.cs         ← RESTful API endpoints
│   ├── Models/
│   │   └── Book.cs                    ← Book model (Id, Title, Author, Isbn, PublicationDate)
│   ├── Services/
│   │   ├── IBookService.cs            ← Service interface
│   │   └── BookService.cs             ← In-memory CRUD implementation
│   └── Program.cs                     ← App startup + DI + CORS config
│
└── book-manager-frontend/             ← Angular Frontend
    └── src/app/
        ├── models/
        │   └── book.model.ts          ← Book TypeScript interface
        ├── services/
        │   └── book.service.ts        ← HTTP service (calls backend API)
        └── components/
            ├── book-list/             ← Library view with search & sort
            └── book-form/             ← Add / Edit book form
```

---

##  How to Run

### 1. Start the Backend (ASP.NET Core)

```powershell
cd BookManagerAPI
dotnet run --launch-profile http
```
> Backend starts at: **http://localhost:5199**

### 2. Start the Frontend (Angular)

In a **new terminal**:
```powershell
cd book-manager-frontend
npx @angular/cli serve
```
> Frontend starts at: **http://localhost:4200**

---

##  API Endpoints

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| GET    | `/api/books`         | Get all books        |
| GET    | `/api/books/{id}`    | Get a book by ID     |
| POST   | `/api/books`         | Create a new book    |
| PUT    | `/api/books/{id}`    | Update a book        |
| DELETE | `/api/books/{id}`    | Delete a book        |

---

##  Book Model

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "publicationDate": "2008-08-01T00:00:00"
}
```

---

##  Features

-  **View** all books in an interactive, sortable table
-  **Search** books by title, author, or ISBN in real-time
-  **Add** new books with a validated form (ISBN format validation)
-  **Edit** existing books
-  **Delete** books with a confirmation dialog
-  Toast notifications for success actions
-  Pre-seeded with 3 sample books
-  Premium dark UI with animated components

---

##  Technologies

| Layer     | Technology                      |
|-----------|---------------------------------|
| Frontend  | Angular 19, TypeScript, CSS     |
| Backend   | ASP.NET Core 10, C#             |
| Storage   | In-memory List (no database)    |
| HTTP      | Angular HttpClient + REST API   |
