import os
os.environ['PIP_CERT'] = 'C:\path\to\your\ca-bundle.crt'
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True, port=5050)

