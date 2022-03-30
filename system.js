function onLoad(pageName) {

	if (pageName == "home") {
		const input = document.getElementById("time-input");

		//Creates an event that clicks the start button on ENTER.
		input.addEventListener("keyup", function(event) {
			if (event.keyCode === 13) { //13 is ID for Enter key.
				event.preventDefault(); //Removes default action.
				document.getElementById("hidden-button").click(); //Clicks
			}
		});
	}

	else if (pageName == "clock") {
		let timer = document.getElementById("timer");
		let button1 = document.getElementById("button1");

		timer.innerHTML = "Click anywhere to activate alarm.";

		button1.innerHTML = localStorage.getItem("time");
		button1.style.borderColor = "#adadad10";
		button1.style.color = "#adadad10";
	}
}

function parseTime() {
	//Declaration & Initialization
	let timeString = "12:00AM";
	let hour = "12", minute = "00";
	let meridiem = true; //true = AM, false = PM
	let tempTimeString = "";
	let hourSwitch = true; //true = hour, false = minute.
	timeString = document.getElementById("time-input").value;
	hour = "", minute = "";

	console.log("Input: " + timeString);

	/*---------------------------- Setting values ----------------------------*/
	//For every chacter of timeString
	for (const char of timeString) {

		//If char is ':' (colon), set hourSwitch to FALSE.
		if (char == ':' || hour.length == 2) hourSwitch = false;

		//If char is a number...
		if (char.match(/^([0-9]{1})$/)){

			//If hourSwitch is TRUE, add char to hour.
			if (hourSwitch) hour += char;

			//Else, add char to minute.
			else minute += char;
		}

		//Else, if char is letter 'A', set meridiem to TRUE then end the loop.
		else if (char == 'A') {
			meridiem = true;
			break;
		}

		//Else, if char is letter 'P', set meridiem to FALSE then end the loop.
		else if (char == 'P') {
			meridiem = false;
			break;
		}
	}


	/*--------------------------- Filtering inputs ---------------------------*/
	console.log("Checking inputs...")

	let intHour = parseInt(hour, 10);

	//If hour is only 1 character, add a '0' in front of it.
	if (hour.length == 1) hour = '0' + hour;

	//Else, if hour is more than 2 characters OR its value is "00"
	//OR its value is more than 23...
	else if (hour.length < 2 || hour == "00" || intHour > 23) {
		hour = "12"; //Set hour to 12.
		meridiem = true; //Set meridiem to true (AM).
	}

	//Else, if hour's value is more than 12...
	else if (intHour > 12) {
		//13+ hour is 1PM+ by default.
		intHour -= 12; //Subtract by 12.
		meridiem = false; //Set meridiem to false (PM).
		hour = intHour.toString(); //Convert back to STRING.
		if (hour.length == 1) hour = '0' + hour; //Add 0 if only 1 character.
	}

	//If minute is more than 2 characters OR its value is more than 59,
	//set minute to "00".
	if (minute.length < 2 || parseInt(minute, 10) > 59)  minute = "00";

	//Else, if minute is only 1 character, add a '0' in front of it.
	else if (minute.length == 1) minute = '0' + minute;


	/*----------------------- Saving to local storage ------------------------*/
	//Allows data to be accessed even after refresh.
	localStorage.setItem("hour", hour);
	localStorage.setItem("minute", minute);
	localStorage.setItem("meridiem", meridiem);

	let ampm = "AM";
	if (meridiem == true) ampm = "AM"; else ampm = "PM";

	timeString = hour + ':' + minute + ampm;
	localStorage.setItem("time", timeString);

	document.getElementById("time-input").value = timeString;

	console.log("Saved in local storage...\n\nHour: " + hour + "\nMinute: " + minute + "\nMeridiem: " + meridiem + "\n\nDisplay: " + timeString);
}

//Activates on button click.
function launchAlarm() {
	window.location.href = "clock.html";
}

//Activates upon "clicking anywhere on screen".
function bootAlarm() {
	let hour = localStorage.getItem("hour");
	let minute = localStorage.getItem("minute");
	let meridiemBool = localStorage.getItem("meridiem");
	let meridiem = "";
	if (meridiemBool) meridiem = "AM"; else meridiem = "PM";

	let b1 = document.getElementById("button1");

	//Updates the alarm time display.
	b1.innerHTML = hour + ':' + minute + meridiem;
	b1.style.color = "#00968840";
	b1.style.borderColor = "#343434ff";

	//Updates the clock.
	updateClock(); //Only because it's ugly without it.
	document.getElementById("timer").style.fontSize = "17vw";

	let time;

	//Repeats every second:...
	let interval = setInterval( function() {
		time = updateClock();

		//Activates when alarm reaches target.
		//If current time is equal to target time...
		if (time == localStorage.getItem("time")) {

			let clock = document.getElementById("timer");
			let button1 = document.getElementById("button1");
			let button2 = document.getElementById("button2");
			let audio = document.getElementById("annoying-sound")

			//Change clock color.
			clock.style.color = "#00ffffff";

			//Changes left button looks & behavior.
			button1.style.border = "8px solid #303030ff";
			button1.style.color = "#ff00ffff";

			//Changes button2 text.
			button2.innerHTML = "Stop";

			//Plays the "annoying audio".
			audio.play();
		}
	}, 1000);
}

function cancelAlarm() {
	window.history.back();
}

function updateClock(quickStart = false) {
	let date = new Date();
	let hh = date.getHours();
	let mm = date.getMinutes();
	let md = "AM";

	if (hh > 12) { hh -= 12; md = "PM"; }

	let time = hh.toString() + ':' + mm.toString() + md;

	time = parseTime(time);

	if (quickStart) {
		let input = document.getElementById("time-input");
		input.value = time;
		input.select();
	}
	else document.getElementById("timer").innerHTML = time;

	return time;
}
