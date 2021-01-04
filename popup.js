
const frtxt = document.getElementById('frtxt'); //french text holder
const entxt = document.getElementById('entxt'); //english text holder
const type = document.getElementById('type'); //holder for type of word
const prev = document.getElementById('prev'); //button to move to previous word
const repeat = document.getElementById('repeat'); //button to repeat the word
const next = document.getElementById('next'); //button to move to next word
const url = chrome.runtime.getURL("data.json"); //get the data required 

fetch(url)
	.then((response) => response.json())
	.then(function(json){
		let numbers = []; //array to hold the ids of the list of words we've gone through
		let pointer =0 //shows where in the list we are
		let number = Math.floor(Math.random()*758); //choose random id for random word
		let eng = json[String(number)+"."].english; //set english translation
		numbers.push(number); //add id to list
		frtxt.innerHTML = json[String(number)+ "."].french; //set french label to word
		type.innerHTML = json[String(number)+"."].type; //set type to type of word e.g. noun, verb, etc.
		chrome.tts.speak(frtxt.innerHTML, {'lang':'fr','rate':1.0, 'volume': 0.25}); //get chrome to say word with tts

		repeat.onclick = function(){ //repeat saying the word 
			chrome.tts.speak(frtxt.innerHTML, {'lang':'fr','rate':1.0, 'volume': 0.25});
		}

		next.onclick = function(){ //move to next word
			if (pointer<(numbers.length-1)){ //change pointer to correct index
				pointer += 1;
				number = numbers[pointer];
			} else {
				while(numbers.includes(number)){
					number = Math.floor(Math.random()*758); //choose new random id for next word
				}
				numbers.push(number);
				pointer += 1
			}
			frtxt.innerHTML = json[String(number)+ "."].french; //set values for different labels
			entxt.innerHTML = "Click to reveal translation";
			eng = json[String(number)+"."].english;
			type.innerHTML = json[String(number)+"."].type;
			chrome.tts.speak(frtxt.innerHTML, {'lang':'fr','rate':1.0, 'volume': 0.25});
		}

		prev.onclick = function(){ //move back to previous words
			if (pointer){ //check if pointer is at start of list 
				pointer = pointer -1 
			} 
			number = numbers[pointer]; //get id of previous word
			frtxt.innerHTML = json[String(number)+ "."].french; //set labels
			entxt.innerHTML = "Click to reveal translation";
			eng = json[String(number)+"."].english;
			type.innerHTML = json[String(number)+"."].type;
			chrome.tts.speak(frtxt.innerHTML, {'lang':'fr','rate':1.0, 'volume': 0.25});
		}

		entxt.onclick = function(){ //when clicked the english translation is revealed
			entxt.innerHTML = eng; 
		}



	})