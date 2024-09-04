
const frtxt = document.getElementById('frtxt');  // french text holder
const entxt = document.getElementById('entxt');  // english text holder
const type = document.getElementById('type');  // holder for type of word (e.g. noun, verb, etc.)
const prev = document.getElementById('prev');  // button to move to previous word
const repeat = document.getElementById('repeat');  // button to repeat the word (using tts)
const next = document.getElementById('next');  // button to move to next word
const url = chrome.runtime.getURL("data.json");  // get the data required 

fetch(url)
	.then((response) => response.json())
	.then(function(json){
		let prevWordIds = []; 
		let locationInList = 0
		let nextWordId = Math.floor(Math.random()*758);
		let eng = json[String(nextWordId)+"."].english; 
		prevWordIds.push(nextWordId);
		frtxt.innerHTML = json[String(nextWordId)+ "."].french;
		type.innerHTML = json[String(nextWordId)+"."].type;
		chrome.tts.speak(frtxt.innerHTML, {'lang':'fr','rate':1.0, 'volume': 0.25});

		repeat.onclick = function(){
			chrome.tts.speak(frtxt.innerHTML, {'lang':'fr','rate':1.0, 'volume': 0.25});
		}

		next.onclick = function(){
			if (locationInList < (prevWordIds.length-1)){
				// if pointer is not at the end of the list, move to next word
				locationInList += 1;
				nextWordId = prevWordIds[locationInList];
			} else {
				// if pointer is at the end of the list, generate a new word
				while(prevWordIds.includes(nextWordId)){
					nextWordId = Math.floor(Math.random()*758);
				}
				prevWordIds.push(nextWordId);
				locationInList += 1
			}
			frtxt.innerHTML = json[String(nextWordId)+ "."].french;
			entxt.innerHTML = "Click to reveal translation";
			eng = json[String(nextWordId)+"."].english;
			type.innerHTML = json[String(nextWordId)+"."].type;
			chrome.tts.speak(frtxt.innerHTML, {'lang':'fr','rate':1.0, 'volume': 0.25});
		}

		prev.onclick = function(){
			if (locationInList){  // check if pointer is at start of list 
				locationInList = locationInList -1 
			} 
			nextWordId = prevWordIds[locationInList];
			frtxt.innerHTML = json[String(nextWordId)+ "."].french;
			entxt.innerHTML = "Click to reveal translation";
			eng = json[String(nextWordId)+"."].english;
			type.innerHTML = json[String(nextWordId)+"."].type;
			chrome.tts.speak(frtxt.innerHTML, {'lang':'fr','rate':1.0, 'volume': 0.25});
		}

		entxt.onclick = function(){  // when clicked the english translation is revealed
			entxt.innerHTML = eng; 
		}
	})
