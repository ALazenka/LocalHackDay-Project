import csv

sizes = [4, 6, 8, 12] #must be sorted
pizzas = []

def algorithm():
	data = parse("input.csv", ",")
	legacy_data = list(data) #copy cuz we gonna fuk wit

	fieldNames = data.pop(0)

	d = {} #{toppings_id: num_slices}

	new_data = []
	for x in data:
		new_data.append(tuple(map(int, x)))

	#print(toppings_matrix)
	for i in new_data:
		toppings = tuple(i[1:])
		if tuple(toppings) in d.keys():
			d[toppings] += i[0]
		else:
			d[toppings] = i[0]

	while len(d) > 0:
		a = find_most_unique(d)

		if d[a] in sorted(sizes):
			pizzas.append((a, d[a]))
			d.pop(a)
			print("perf size")
		else:
			for s in sorted(sizes):
				if a in d.keys() and d[a] < s:
					if len(d) == 1:
						pizzas.append((a, s))
						d.pop(a)
						print("{0} | last pizza".format(a))
						break
					difference = s - d[a]
					print("a:{za}|size:{0} | difference:{1}".format(s, difference, za=a))
					while difference > 0:
						temp = find_most_alike(d, a)
						if temp == None:
							pizzas.append((a, s))
							print("{0} | difference {1}".format(a, difference))
							break
						elif d[temp] < difference:
							difference -= d[temp]
							d.pop(temp) #gone
							print("popped {0} | difference {1}".format(temp, difference))
						else:
							d[temp] -= difference
							difference = 0
							pizzas.append((a, s))
							print("made pizza {0} | difference {1}".format(temp, d[temp]))
					d.pop(a)
	print(pizzas)


def find_most_unique(d):
	'''Unique and lowest slices'''
	toppings = list(d.keys())

	result = {}

	for x in toppings:
		result[x] = 0

	#most unique&picky
	for i in range(0,len(toppings)):
		for j in range(0, len(toppings)):
				result[toppings[i]] += num_matches(toppings[i], toppings[j])

	lowest_matches = min(result.values())

	lowest_slices = (0, 99999999999999999999999999)

	#lowest num of slices
	for i in result.keys():
		if result[i] == lowest_matches and d[i] < lowest_slices[1]:
			lowest_slices = (i, d[i])

	return lowest_slices[0]

def find_most_alike(d, val):
	'''most alike and most slices'''
	toppings = list(d.keys())

	toppings.remove(val)

	result = {}

	for x in toppings:
		result[x] = 0

	#most unique&picky
	for t in toppings:
		if val == t:
			continue
		for i in range(len(val)):
				if val[i] == t[i]:
					result[t] += 1

	if len(result.values()) == 0:
		return None
	highest_matches = max(result.values())

	lowest_slices = (0, 99999999999999999999999999)

	#lowest num of slices
	for i in result.keys():
		if result[i] == highest_matches and d[i] < lowest_slices[1]:
			lowest_slices = (i, d[i])

	return lowest_slices[0]


def num_matches(t1, t2):
	count = 0
	for i in range(len(t1)):
		if t1[i] == 1 and t2[i] == 1:
			count += 1
	return count


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