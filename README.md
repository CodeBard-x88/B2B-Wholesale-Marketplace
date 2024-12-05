# B2B Wholesale Marketplace

Welcome to the B2B Wholesale Marketplace project! This README will guide you through the setup and installation process for the project.

---

## Prerequisites

Before you begin, ensure that you have the following installed:
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/) (which includes npm)

---

## Installation and Setup

### Step 1: Clone the Repository

Clone the project repository to your local machine:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the actual URL of your repository.

### Step 2: Switch to the `develop` Branch

Navigate into the project directory and switch to the `develop` branch:

```bash
git checkout develop
```

### Step 3: Open the Project in VS Code

Open the project folder in VS Code.

### Step 4: Open Two Terminals in VS Code

To manage both the frontend and backend servers, open two terminals in VS Code:

1. Press `Ctrl + Shift + ~` to open the first terminal.
2. Press `Ctrl + Shift + ~` again to open the second terminal.

---

## Backend Setup

### Step 5: Install Backend Dependencies

In the first terminal, navigate to the `Backend` directory and install the dependencies:

```bash
cd Backend
npm install
npm install cookie-parser cors debug dotenv ejs express formidable fs http-errors jsonwebtoken mongoose morgan multer nodemailer path
```

### Step 6: Run the Backend Server

Start the backend server:

```bash
npx nodemon
```

This will start the server, and you should see the server logs in the terminal.

---

## Frontend Setup

### Step 7: Navigate to the Frontend Directory

In the second terminal, move to the `frontend` directory:

```bash
cd frontend
```

### Step 8: Install Frontend Dependencies

Install the dependencies for the frontend:

```bash
npm install
```

### Step 9: Run the Frontend Server

Start the frontend server:

```bash
npm start
```

---

## Project Structure

You now have both the backend and frontend servers running:
- The backend server handles the API and database logic.
- The frontend server provides the user interface.

Access the application in your browser and start exploring the B2B Wholesale Marketplace!

---

## Notes
- Make sure to replace `<repository-url>` with the actual repository URL when cloning the project.
- For any issues or additional setup instructions, refer to the project documentation or contact the project maintainers.
