## Back End ToDo App

# Overview

This ToDo app is connected to a database using MongoDB and allows you to get, delete, and edit todos from that database. This app is rendered using the templating engine EJS (Embedded JavaScript) to render the front end and the javascript in the same file. It uses Node.js on the backend for the endpoints. This app uses mongoose, ejs, dotenv, and express as dependencies.

# To Run Locally

Install the following dependencies:

-   express
-   mongoose
-   ejs
-   dotenv (for database password link)

Use a MongoDB cluster and whitelist your IP addresss.

    npm start

# Methods/Endpoints

    GET '/'

Renders "todo.ejs" which is the frontend of the app as well as the todos in the database.

    GET '/edit/:id'

Renders "todoEdit.ejs" which allows a user to edit the post as well as the selected todo which is found by its id.

    POST '/'

Takes the todo and the category inputs from the user and stores them to the databse.

    POST '/edit/:id

Submits the edited post to the database

*Instead of using DELETE, `findByIdAndRemove` is used since we have mongoose installed.