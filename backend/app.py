from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/<code>",  methods=['GET'])
def root(code):

    result = eval(code)

    return jsonify({"result": result})
if __name__ == "__main__":
    app.run(debug=True)
