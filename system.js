function parseTime() {
	"use strict";

	//"decl" stands for "declared".
	let declTimeString = "";
	declTimeString = document.getElementById("time-input").innerHTML;
	let declHour = "12", declMinute = "00";
	let declMeridiem = true;

	//7 is the expected number of characters from div time-input.
	for (let i = 0; i < 7; i++) {

		console.log("On char: " + declTimeString[i]);

		//For in cases like 5:00AM where there's only 1 hour digit.
		if (declTimeString[i] == ':') {
			i = 2;
			continue;
		}

		//Hour
		if (i < 2) declHour += declTimeString[i];

		//Colon; Redundancy.
		else if (i == 2) continue;

		//Minute
		else if (i > 5) declMinute += declTimeString[i];

		//Meridiem: AM = true, PM = false.
		else if (i == 6) {
			if (declTimeString[i] == 'A') declMeridiem = true;
			else if (declTimeString[i] == 'P') declMeridiem = false;
		}

		//Redundancy.
		else if (i == 7) break;
	}

	localStorage.setItem("declHour", declHour);
	localStorage.setItem("declMinute", declMinute);
	localStorage.setItem("declMeridiem", declMeridiem);
}
