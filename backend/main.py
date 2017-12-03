from flask import Flask, make_response, request, current_app
from flask_cors import CORS
import json, random

app = Flask(__name__)
CORS(app)

generated_ids = []
sid_params = {}

@app.route('/create', methods=['GET', 'POST'])
def generate_ID():
  result = ""
  while result not in generated_ids:
    for i in range(4):
      if random.random() < 0.5:
        result += str(int(random.uniform(0,9.9)))
      else:
        result += chr(ord("A")+int(random.uniform(0,25.9)))
    generated_ids.append(result)

  return json.dumps({"sid": result, "sid_list": generated_ids})

@app.route('/<string:sid>')
def validate_id(sid):
  if sid not in generated_ids:
    return json.dumps({"error_code": 666})
  else:
    return json.dumps({"logged_in": True, "sid":sid})

@app.route('/<string:sid>/logout')
def logout(sid):
  if sid not in generated_ids:
    return json.dumps({"error_code": 666})
  else:
    generated_ids.remove(sid)
    sid_params.pop(sid)
    return json.dumps({"logged_out": True, "sid":sid})

@app.route('/<string:sid>/submit')
def submit(sid):
  args = request.args
  print(args)

  slices = args["slices"]
  ingredients = args["ingredients"]
  ingredients.append("cheese")

  if sid not in sid_params:
    sid_params[sid] = [[slices, ingredients]]
  else:
    sid_params[sid].append(ingredients)
