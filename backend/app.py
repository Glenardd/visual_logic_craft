from flask import Flask, jsonify, request
from flask_cors import CORS
import io
import sys
import textwrap

app = Flask(__name__)
CORS(app)

@app.route("/",  methods=['POST'])
def root():
    
    data = request.get_json()
    code = data.get('code', '')

    output = io.StringIO()
    sys.stdout = output 

    data_ = textwrap.dedent(code);

    exec(data_, {})

    result = output.getvalue()

    return jsonify({"result": result.strip()})

if __name__ == "__main__":
    app.run(debug=True)
