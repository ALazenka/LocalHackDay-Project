from flask import Flask
import json, random
app = Flask(__name__)
generated_ids = []

@app.route('/')
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
		return json.dumps({"logged_out": True, "sid":sid})