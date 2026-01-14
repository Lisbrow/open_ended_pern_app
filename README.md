# Mood Ledger

![Preview](moodLedgerScreenshot.png)

Mood Ledger is a full-stack PERN (PostgreSQL, Express, React, Node.js) web application that allows users to log daily moods, add optional reflections, and track emotional trends over time.

## Table of Contents
- [Mood Ledger](#mood-ledger)
  - [Table of Contents](#table-of-contents)
  - [Purpose](#purpose)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Deployment](#deployment)
  - [Future Work](#future-work)
  - [Acknowledgements](#acknowledgements)

## Purpose
This project was developed as a full-stack open-ended PERN application to practice building and integrating a RESTful backend with a modern React frontend. The primary goal was to create a simple, intuitive mood-tracking tool while demonstrating state management, component-driven UI design, database integration, and automated testing.

## Features
- Emoji-based mood selection with clear visual feedback
- Optional text reflections for each mood entry
- Automatic mood categorization (positive, neutral, negative)
- Mood history list with delete functionality
- Calendar view showing mood entries by date
- Persistent data storage using PostgreSQL
- Frontend and backend test coverage using Jest and React Testing Library

## Technologies
- PostgreSQL
- Express.js
- React.js
- Node.js
- JavaScript
- HTML
- CSS
- Jest
- React Testing Library

## Getting Started

### Prerequisites
Before you begin, ensure you have the following:
- Node.js installed on your machine
- npm
- PostgreSQL (local or hosted)
- Git

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Lisbrow/open_ended_pern_app.git
    cd mood-ledger-app
    ```

2. Install backend dependencies:
    ```bash
    cd server
    npm install
    ```

3. Install frontend dependencies:
    ```bash
    cd ../client
    npm install
    ```

4. (Optional) Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    DATABASE_URL=your_postgres_connection_string
    ```

5. Start the backend server:
    ```bash
    cd server
    npm start
    ```

6. Start the frontend development server:
    ```bash
    cd client
    npm start
    ```

## Usage
1. Open your browser and navigate to `http://localhost:3000` to view the app locally.
2. Select a mood using the emoji-based mood grid.
3. Optionally write a short note describing how you feel.
4. Click "Save Entry" to log your mood.
5. View previous entries in the mood history list or calendar view.
6. Delete entries as needed using the trash icon.

## Testing
The project includes automated tests for both the frontend and backend to ensure stability and maintainability.

### Frontend
- **Framework:** Jest + React Testing Library  
- Run tests with coverage:
    ```bash
    cd client
    npm test -- --coverage
    ```
- This will test React components, utility functions, and simulate user interactions.

### Backend
- **Framework:** Jest + Supertest  
- Run backend tests:
    ```bash
    cd server
    npm test
    ```
- This will test API routes, database operations, and server logic.

## Deployment
Mood Ledger is deployed to [Render](https://render.com/) for live access.

## Future Work
- User authentication and individual user accounts
- Mood analytics and trend visualization
- Filters for viewing mood history by category or date range
- Mobile-first UI enhancements

## Acknowledgements
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)
- [Render](https://render.com/)
