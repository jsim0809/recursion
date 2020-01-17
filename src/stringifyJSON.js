// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // There are optional second and third arguments to JSON.stringify. 
  // Looking over the test cases, and based on this funciton being defined with one parameter (function(obj) {...}), 
  // I assume they are not in the scope of this assignment.

	objType = typeof obj;

	// 0: Does not stringify functions, Symbols, or undefined
	if (objType === 'function' || objType === 'symbol' || obj === undefined) {
		return '';
	}
	// 1a: Infinity, null, and NaN are null
	if (obj === Infinity || obj === -Infinity || obj === NaN || obj === null) {
		return 'null';
	}
	// 1: Stringifies literals: numbers and strings
	if (objType === 'string') {
		return '"' + obj.toString() + '"';
	}
	if (objType === 'number' || objType === 'boolean') {
		return obj.toString();
	}
 	// 1d: Dates are converted to strings using date.toISOString().
	if (obj instanceof Date) {
		return obj.toISOString();
	}

	// 2: Converts arrays into [...] form
	if (Array.isArray(obj)) {
		if (obj.length === 0) {
			return '[]';
		}
		var middle = stringifyJSON(obj.shift());
		while (obj.length) {
			middle += ',';
			middle += stringifyJSON(obj.shift());
		}
		return '[' +  middle + ']';
	}

    // 3: Converts objects into {...} form
    if (objType === 'object') {
    	if (isEmptyObject(obj)) {
    		return '{}';
    	}
    	var middle = '';
    	// Collects "first" key-element pair, ignoring keys with functions and undefined values
    	while (middle === '' && !isEmptyObject(obj)) {
			for (var k in obj) {
				if (typeof obj[k] === 'function' || obj[k]===undefined) {
					delete obj[k];
					break;
				}
				middle = stringifyJSON(k) + ':' + stringifyJSON(obj[k]);
				delete obj[k];
				break;
			}
		}
    	// Collects the rest of the key-element pairs, ignoring keys with functions and undefined values
    	// Is there a better way to interpolate these commas without repeating these lines of code?
		while (!isEmptyObject(obj)) {
			for (var k in obj) {
				if (typeof obj[k] === 'function' || obj[k]===undefined) {
					delete obj[k];
					break;
				}
				middle += ',';
				middle += stringifyJSON(k) + ':' + stringifyJSON(obj[k]);
				delete obj[k];
				break;
			}
		}
		return '{' +  middle + '}';
    }

    // Catches any overflow types (not sure if there would be any)
    return '';
};


// Helper function: checks if an Object is empty.

function isEmptyObject(obj) {
	for (var k in obj) {
		if (obj[k] !== undefined) {
			return false;
		}
	}
	return true;
};
