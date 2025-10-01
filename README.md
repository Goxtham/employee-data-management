# Employee Data Management

## Project Description

Employee Data Management is a straightforward CRUD (Create, Read, Update, Delete) application that allows you to manage a list of employees. The project includes a backend with RESTful APIs and a frontend built with React and Tailwind CSS. Employees have a **name**, **email**, and **position**.

## Features

### Backend

* Full CRUD API endpoints for employees (`/api/employees`).
* SQLite database for persistent data storage.
* Backend tests for each CRUD endpoint and core business logic.
* Health check endpoint (`/api/health`).

### Frontend

* Display employees in a table.
* Add, edit (via modal), and delete employees.
* Search/filter employees by name.
* Form validation using Formik + Yup.

## Setup Instructions

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
PORT=5000
DB_FILE=./data/employees.db
```

4. Run the backend server in development mode:

```bash
npm run dev
```

The server should be running at `http://localhost:5000`.

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The frontend should open automatically at `http://localhost:3000`.

## Running Tests

### Backend Tests

1. Navigate to the backend folder:

```bash
cd backend
```

2. Run tests:

```bash
npm test
```

The tests cover all CRUD endpoints and the health check.

### Notes

* The backend tests use an in-memory SQLite database to avoid affecting production data.

## Design Choices

* Employee data includes only **name**, **email**, and **position**.
* Edit functionality is implemented via a **modal** for better UX.
* Search and filter are performed on the frontend for simplicity.
* Form validation uses **Formik + Yup** to ensure data integrity.
* The SQLite database is persisted in `backend/data/employees.db`.
* Tests are isolated and use a temporary database file to prevent data loss.

## Bonus

* Search and filter bar on the frontend.
* Form validation for both Add and Edit forms.
* Backend tests for all CRUD operations.


