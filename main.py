from fastapi import FastAPI, Response
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pymysql

app = FastAPI()

origins = [
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Game_request(BaseModel):
    name: str
    rating:float
    imgURL: str | None = None


class Game_response(BaseModel):
    id: int
    name: str
    rating: float
    imgURL: str


def connect_and_return_cursor():
    database = pymysql.Connect(user='root', password='', host='localhost',
                               database='video_games', cursorclass=pymysql.cursors.DictCursor, autocommit=True)
    return database.cursor()


@app.get("/", response_class=HTMLResponse)
def index():
    return "<h1>Welcome!</h1><a href='/docs'>Read the docs</a>"


@app.get("/games")
def all_games():
    with connect_and_return_cursor() as cursor:
        cursor.execute("SELECT * FROM video_games")
        results = cursor.fetchall()
        return results


@app.get('/games/search')
def search_game(query:str):
    with connect_and_return_cursor() as cursor:
        cursor.execute(
                f"SELECT name FROM video_games WHERE name LIKE '%{query}%'")
        results = cursor.fetchall()
        return results


@app.get("/games/{game_id}")
def single_game(game_id: int, response: Response):
    with connect_and_return_cursor() as cursor:
        sql = "SELECT * FROM video_games WHERE id = %s"
        cursor.execute(sql, game_id)
        results = cursor.fetchall()
        if (len(results) == 0):
            response.status_code = 400
            return {"msg": "Couldn't find game with id "+str(game_id)}
        return results


@app.put("/games/edit/{game_id}")
def edit_game(game_id: int, response: Response, game: Game_request):
    with connect_and_return_cursor() as cursor:
        sql = "SELECT * FROM video_games WHERE id = %s"
        cursor.execute(sql, game_id)
        results = cursor.fetchall()
        if (len(results) == 0):
            response.status_code = 400
            return {"msg": "Couldn't find game with id "+str(game_id)}
        sql = "UPDATE video_games SET rating = %s, name = %s, imgURL = %s WHERE id = %s"
        cursor.execute(sql, [game.rating, game.name, game.imgURL, game_id])
        cursor.execute("SELECT * FROM video_games")
        results = cursor.fetchall()
        return results


# @app.put("/games/img/{game_id}")
# def change_img_URL(game_id: int, response: Response, url: str = ''):
#     with connect_and_return_cursor() as cursor:
#         if (url == ''):
#             response.status_code = 400
#             return {"msg": "Missing a url query"}
#         sql = "SELECT * FROM video_games WHERE id = %s"
#         cursor.execute(sql, game_id)
#         results = cursor.fetchall()
#         if (len(results) == 0):
#             response.status_code = 400
#             return {"msg": "Couldn't find game with id "+str(game_id)}
#         sql = "UPDATE video_games SET imgURL = %s WHERE id = %s"
#         cursor.execute(sql, [url, game_id])
#         cursor.execute("SELECT * FROM video_games")
#         results = cursor.fetchall()
#         return results


@app.post("/games")
def add_new_game(game: Game_request):
    with connect_and_return_cursor() as cursor:
        if (game.imgURL == None):
            cursor.execute(
                f"INSERT INTO video_games(name, rating) VALUES ('{game.name}',{game.rating})")
        else:
            cursor.execute(
                f"INSERT INTO video_games(name, imgURL, rating) VALUES ('{game.name}','{game.imgURL}',{game.rating})")
        cursor.execute("SELECT * FROM video_games")
        results = cursor.fetchall()
        return results


@app.delete("/games/{game_id}")
def remove_game(game_id: int, response: Response):
    with connect_and_return_cursor() as cursor:
        sql = "SELECT * FROM video_games WHERE id = %s"
        cursor.execute(sql, game_id)
        results = cursor.fetchall()

        if (len(results) == 0):
            response.status_code = 400
            return {"msg": f"Couldn't find product with id '{game_id}'"}

        cursor.execute(f"DELETE FROM video_games WHERE id = {game_id}")
        cursor.execute("SELECT * FROM video_games")
        results = cursor.fetchall()
        return results
