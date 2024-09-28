from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/details')
def details():
    media_id = request.args.get('id')
    media_type = request.args.get('type')
    return render_template('details.html', media_id=media_id, media_type=media_type)

@app.route('/watchlist')
def watchlist():
    return render_template('watchlist.html')

if __name__ == '__main__':
    app.run()
