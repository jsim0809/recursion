// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // getElementsByClassName does the following
  // returns a HTMLCollection object, which is kind of similar to an array, of all the elements of a particular name in an HTML document.
  // Since there seems to be no great way to create an HTMLCollection object, and the test suite actually expects an array, we will return an array.

  // document.body returns the entire body of the HTML document, i.e. the "root node".
  // element.childNodes returns the child nodes of an element, as a NodeList object. A NodeList is array-like and can be accessed by numerical index.
  var rootNode = document.body
  var arrayOfElements = grabElementAndRunOnChildren(className, rootNode);
  // flatten the array
  arrayOfElements = superFlat(arrayOfElements);

  // return the conglomerated array
  return arrayOfElements;

};


// Helper function to check if a node is an instance of a particular className.
  // element.classList return the list of an element's class(es), as a DOMTokenList object.

function isThisAnInstance(className, node) {
	if (!node.classList) { 
		return false; 
	} else {
		return node.classList.contains(className); 
	}
};

// Helper function to run recursion on a particular node and recursively run on the branches until it reached the leaves.

function grabElementAndRunOnChildren(className, node) {
	var children = Array.from(node.childNodes);
	var arrayOfElements = [];
	if (isThisAnInstance(className, node)) {
		arrayOfElements.push(node);
	}
	for (var i = 0; i < children.length; i++) {
		arrayOfElements.push(grabElementAndRunOnChildren(className, children[i]));
	}
	return arrayOfElements;
};

// Helper function to recursively flatten an array

function superFlat(arr) {

	var boolArray = arr.map(Array.isArray);
	while (boolArray.includes(true)) {
		arr = arr.flat();
		boolArray = arr.map(Array.isArray);
	}
	return arr;
}