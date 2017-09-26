$(document).ready(function(){
	// sounds
    var playClick = function(){
	    var audio = document.getElementById("click");
	    audio.play();
	    };
    var playEquals = function(){
	    var audio = document.getElementById("calculate");
	    audio.play();
	    };
	// declaring variables of each button on calculator
	var numParts = [];
	var firstNum = ""
	var operators = ["+", "-", "*", "/", "=", "Enter"];
	var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
	var operatorToUse = "";
	var operant = "";

	var maths = {
		'+': function(x, y) {return x + y},
		'-': function(x, y) {return x - y},
		'/': function(x, y) {return x / y},
		'*': function(x, y) {return x * y}
	};

	var refactor = function(value){
		if (numbers.indexOf(value) === -1 && operators.indexOf(value) === -1){
			alert("Please use a number or operator")
		};
		// if it starts with an operator, raise an error
		if ((numParts.length < 1 && firstNum.length === 0) && operators.indexOf(value) != -1) {
			alert("Can not start with an operator.");
		}
		// otherwise if the input is a number, append it to the page 
		// and "num parts"(which will later be combined)
		else if (firstNum.length === 0 && numbers.indexOf(value) != -1){
			if (numParts.length === 0) {
				$("h2").empty();
			}
			playClick();
			$("h2").append(value);
			numParts.push(value);
			console.log("num parts:", numParts);
		};

		// if there are numbers ready to be combined into one number and an operator is pressed,
		// firstNum is created by combining the number parts
		if (firstNum.length != 0 && numParts.length === 0 && operators.indexOf(value) != -1) {
			operatorToUse = value;
			playClick();
			$("h2").append(" ", operatorToUse, " ");
		};

		if (firstNum.length === 0 && numParts.length > 0 && operators.indexOf(value) != -1) {
			firstNum = numParts.join("");
			numParts = [];
			operatorToUse = value;
			playClick();
			$("h2").append(" ", operatorToUse, " ");
			console.log("first number: ", firstNum, "operator to use: ", operatorToUse);
		};

		// once we have a first number and the inputs are all numbers,
		// we will push them to the numparts array until an operator is pushed
		if (firstNum.length != 0 && numbers.indexOf(value) != -1) {
			playClick();
			$("h2").append(value);
			numParts.push(value);
			console.log("first number: ", firstNum, ";", "second number's parts: ", numParts);
		};

		// now that there's a first number and a second number to be built, we are going to 
		// use the 'operatorToUse' with the 'maths' function and take in the firstNum
		// and our built second number. We'll empty the "numParts" incase we want to operate with 
		// more numbers later
		if (firstNum.length != 0 && numParts.length > 0 && operators.indexOf(value) != -1) {
			var x = Number(firstNum);
			var y = Number(numParts.join(""));
			firstNum = maths[operatorToUse](x, y);
			var listItemString = "<li>" + x + " " + operatorToUse + " "+ y + " = " + firstNum+ "</li>";
			console.log(listItemString);
			firstNum = maths[operatorToUse](x, y);
			$("#calculations").append(listItemString)
			numParts = []
			if (value != "Enter"){
				$("h2").empty();
				operatorToUse = value
				playEquals();
				$("h2").append(firstNum)
			}
			else if (value === ("Enter" || "=")) {
				console.log(firstNum);
				$("h2").empty();
				playEquals();
				$("h2").append(firstNum);	
			}
		};
	};

	// for using the calculator ui
	$("#calculator").on("click", function(event){
		refactor(event.target.value);
	});

	// for using the keyboard
	$(document).keypress(function(event){
		refactor(event.originalEvent.key);
	});

});