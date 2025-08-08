from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'roottoor'
app.config['MYSQL_DB'] = 'movieblue'

mysql = MySQL(app)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/add-movie', methods=['post'])
def add_movie():
    try:
        json = request.get_json()
        title = json.get('title')
        description = json.get('description')
        release_date = json.get('release_date')
        rating = json.get('rating')
        image = json.get('image')
        cur = mysql.connection.cursor()
        sql = 'INSERT INTO moviedata (title, description, release_date, rating, image) VALUES (%s,%s,%s,%s,%s)'
        val = (title, description, release_date, rating, image)
        cur.execute(sql, val)
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Movie added successfully'})
    except Exception as e:
        return f'Error in adding movie {e}'
    

@app.route('/get-movies', methods=['get'])
def get_movies():
    try:
        cur = mysql.connection.cursor()
        sql = 'select * from moviedata'
        cur.execute(sql)
        res = cur.fetchall()
        cur.close()

        movie_list = []
        for row in res:
            movie_list.append({
                'id': row[0],
                'title': row[1],
                'description': row[2],
                'release_date': row[3],
                'rating': row[4],
                'image': row[5]
            })
        return jsonify(movie_list)
    except Exception as e:
        return f'Error in getting movie {e}'
    


if __name__ == '__main__':
    app.run()