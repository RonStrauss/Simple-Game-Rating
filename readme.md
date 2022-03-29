<div align="center"><h1>Simple Game Rating</h1>

A simple Fullstack app where you can add a game and change it's rating.

 </div>

## Purpose

<p>To learn python-based backend.</p>

## Tech Stack Used

**Client Side:**

-   [Angular 13](https://angular.io/)

**Back End:**

-   [Python 3.10.4](https://www.python.org/)
-   [MySQL 8](https://www.mysql.com/)
-   [XAMPP with phpMyAdmin](https://www.apachefriends.org/)

## How to use

`Assumes you're in the git cloned project, running Windows 10`

-   After cloning or downloading the repository, create a virtual environment in the directory with `python3 -m venv venv`.

-   Use the created virtual environment by typing `venv/Scripts/activate.bat`

-   Then, install all needed python packages with `python -m pip install -r requirements.txt`.

-   upload `db.sql` with [phpMyAdmin](http://localhost/phpmyadmin/) to a database called `video_games`.

-   Run `uvicorn` development server with `uvicorn main:app`

-   cd to the `client` folder, and run `npm install`

-   Then, `ng s -o` will start the Angular [development server](http://localhost:4200).

Make sure you have the [Angular CLI](https://angular.io/cli) installed to run any `ng` commands.
