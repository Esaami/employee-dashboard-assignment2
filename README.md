# PeopleDesk — Employee Dashboard

A React + Vite employee dashboard built for Assignment 2.

## Features
- Responsive navigation with Home and Employee Form routes
- Employee directory loaded from `https://jsonplaceholder.typicode.com/users`
- Table view displaying ID, name, and email
- Search/filter employee records
- Employee form with Name, Designation, Location, and Salary fields
- Client-side validation only; the form does not send data to a backend
- Responsive CSS styling and Lucide icons

## Run locally
1. Install Node.js (LTS): https://nodejs.org/
2. Open a terminal in this project folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Create a production build
```bash
npm run build
```

## Push to GitHub
Create a new **empty** repository on GitHub (do not add a README or .gitignore there if you already have these files locally). Then, from this project folder run:

```bash
git init
git add .
git commit -m "Create employee dashboard assignment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your GitHub username and repository name. If Git asks you to sign in, complete the browser sign-in prompt. Never share your password or access token.
