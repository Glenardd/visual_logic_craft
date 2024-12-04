from flask import Flask, jsonify, request
from flask_cors import CORS
import io
import sys
import textwrap
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET'])
def root():
    # the sendt request
    data = request.get_json()
    code = data.get('code', '')

    output = io.StringIO()
    sys.stdout = output

    data_ = textwrap.dedent(code)

    exec(data_, {})

    result = output.getvalue()

    return jsonify({"result": result.strip()})

@app.route("/predict", methods=['GET', 'POST'])
def predict():
    # Example input data

    # 3 = variables
    # 1 = conditionals
    # 0 = arrays
    # 2 = functions

    # 0 = easiest
    # 1 = easy
    # 3 = medium
    # 2 = hard

    data = pd.DataFrame({'Concept': [3], 'Difficulty': [0], 'Health': [90]})

    # Load the model
    with open('decision_tree_regressor_model', 'rb') as file:
        model = pickle.load(file)

    # Make prediction
    prediction = model.predict(data)

    # Return prediction as JSON
    return jsonify({'prediction': prediction.tolist()})

if __name__ == "__main__":
    app.run(debug=True)
