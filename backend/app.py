from flask import Flask, jsonify, request
from flask_cors import CORS
import io
import sys
import textwrap
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET', 'POST'])
def root():
    # Get the sent request
    data = request.get_json()
    code = data.get('code', '')

    # Redirect stdout to capture the print output
    output = io.StringIO()
    sys.stdout = output

    # Dedent and execute the provided code
    try:
        data_ = textwrap.dedent(code)
        exec(data_, {})
    except Exception as e:
        return jsonify({"error": str(e)})

    result = output.getvalue()
    return jsonify({"result": result.strip()})

@app.route("/predict", methods=['GET', 'POST'])
def predict():
    # Example input data

    # Concept to Difficulty mapping:
    # 3 = variables -> 0 = easiest
    # 1 = conditionals -> 1 = easy
    # 0 = arrays -> 3 = medium
    # 2 = functions -> 2 = hard

    data = request.get_json()
    concept = data.get('Concept')
    health = data.get('Health')

    if concept is None or health is None:
        return jsonify({"error": "Missing 'Concept' or 'Health' in request data"}), 400

    try:
        # Convert concept to difficulty
        difficulty_value = difficulty(concept)

        # Prepare input data for the model
        input_data = pd.DataFrame({
            'Concept': [concept],
            'Difficulty': [difficulty_value],
            'Health': [health]
        })

        # Load the model
        with open('decision_tree_regressor_model', 'rb') as file:
            model = pickle.load(file)

        # Make prediction
        damage = model.predict(input_data)

        # Return prediction as JSON
        return jsonify({'damage': damage.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)})

def difficulty(concept):
    # Ensure concept is converted to integer for comparison
    concept = int(concept)
    if concept == 3:
        return 0
    elif concept == 1:
        return 1
    elif concept == 0:
        return 3
    elif concept == 2:
        return 2
    else:
        raise ValueError("Invalid concept value. Must be 0, 1, 2, or 3.")

if __name__ == "__main__":
    app.run(debug=True)
