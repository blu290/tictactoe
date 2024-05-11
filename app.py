from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory(".",'index.html')

@app.route('/script.js')
def script():
    return send_from_directory('.', 'script.js')

@app.route('/style.css')
def style():
    return send_from_directory('.', 'style.css')

if __name__ == '__main__':
    app.run()