import csv


def algorithm():
	data = parse("input.csv", ",")

	fieldNames = data.pop(0)

	d = {} #{toppings_id: num_slices}

	for row in data:
		_id = "cheese"
		for i, topping in enumerate(data):
			if i == 0: continue #first one is slices
			if topping:
				_id += "|{0}".format(fieldNames[i])

		#add slices
		if _id in d:
			d[_id] += int(row[0])
		else: 
			d[_id] = int(row[0]) 






def parse(raw_file, delimiter):
	"""Parses a raw CSV file to a JSON-like object.
	First row is fields"""
	
	with open(raw_file, "r") as opened_file:
		csv_data = csv.reader(opened_file, delimiter=delimiter)

		parsed_data = []

		for row in csv_data:
			parsed_data.append(row)

	return parsed_data


def main():
	algorithm()

if __name__ == "__main__":
	main()