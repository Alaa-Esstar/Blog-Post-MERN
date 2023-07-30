# Blog-Post-MERN
this project is for learning purposes

Node v18.16.1
npm v9.5.1
React v18.2.0

The MERN Blog Post App is a full-stack web application that allows users to create, read, update, and delete blog posts. It is built using the MERN stack (MongoDB, Express, React, Node.js) and provides a user-friendly interface for managing blog content.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Technologies](#technologies)

## Demo
[live demo](https://blog-post-mern-ten.vercel.app/)

## Features

- User Registration and Authentication: Users can sign up, log in, and log out.
- Create and Edit Blog Posts: Authenticated users can create new blog posts and edit existing ones.
- View Blog Posts: Users can read all the published blog posts on the app's homepage.
- Delete Blog Posts: Authenticated users can delete their own blog posts.
- Responsive Design: The app is fully responsive and works seamlessly across different devices.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Alaa-Esstar/Blog-Post-MERN.git
cd Blog-Post-MERN

# Install server dependencies
cd api
npm install
copy .env copy to .env
# Fill in the required environment variables in .env
npm start

# Move to the client directory and install client dependencies
cd front-blog
npm install
copy .env to .env.local
# Fill in the required environment variables in .env.local
npm start

```

## Technologies

- MongoDB: Database to store blog posts and user information.
- Express.js: Backend framework to handle server-side logic.
- React: Frontend library for building user interfaces.
- Node.js: Runtime environment to run JavaScript on the server.
