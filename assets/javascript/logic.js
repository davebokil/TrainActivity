                                                                                                                         
// eeeee eeeee  eeeee e  eeeee    eeeee eeee e   e eeee eeeee e   e e     eeee    eeee e    e eeeee eeeee  eeee eeeee eeeee 
//   8   8   8  8   8 8  8   8    8   " 8  8 8   8 8    8   8 8   8 8     8       8    8    8 8   8 8   8  8    8   " 8   " 
//   8e  8eee8e 8eee8 8e 8e  8    8eeee 8e   8eee8 8eee 8e  8 8e  8 8e    8eee    8eee eeeeee 8eee8 8eee8e 8eee 8eeee 8eeee 
//   88  88   8 88  8 88 88  8       88 88   88  8 88   88  8 88  8 88    88      88   88   8 88    88   8 88      88    88 
//   88  88   8 88  8 88 88  8    8ee88 88e8 88  8 88ee 88ee8 88ee8 88eee 88ee    88ee 88   8 88    88   8 88ee 8ee88 8ee88 
//
//
// A train schedule application that incorporates Firebase to host arrival and departure data.
//
// by Dave Bokil, for Rutgers Coding Bootcamp, 2017

// Wrapper
// ------------------------------------------------------------------------------------
$(document).ready(function() {


	// Current Time Display
	function update() {
		$('#clock').html(moment().format('H:mm:ss'));
	}
	setInterval(update, 1000);


    // Variables
    // ------------------------------------------------------------------------------------
    	// Initial Form Values
    	var trainName = "";
	    var destination = "";
	    var time = "";
	    var frequency = 0;

    // Firebase
    // ------------------------------------------------------------------------------------
		// Initialize Firebase
		var config = {
		    apiKey: "AIzaSyADNlXTKTt9d8yBtIXEKdPfd98aHIHMG78",
		    authDomain: "train-schedule-express.firebaseapp.com",
		    databaseURL: "https://train-schedule-express.firebaseio.com",
		    storageBucket: "train-schedule-express.appspot.com",
		    messagingSenderId: "887626713403"
		};
		firebase.initializeApp(config);

		// variable to reference firebase database objects
		var dataRef = firebase.database();
    	

    // Operations
    // ------------------------------------------------------------------------------------
	    // When the user clicks the submit button...
	    $("#submitForm").on("click", function(event) {
	    	event.preventDefault();

	    	// retrieve form input
	    	trainName = $("#name-input").val().trim();
		    destination = $("#destination-input").val().trim();
		    time = $("#time-input").val().trim();
		    frequency = $("#frequency-input").val().trim();

		    // push the data to firebase
		    dataRef.ref().push({

		        trainName: trainName,
		        destination: destination,
		        time: time,
		        frequency: frequency,
		        dateAdded: firebase.database.ServerValue.TIMESTAMP
		    });
	    });



	    // Firebase watcher + initial loader
    	dataRef.ref().on("child_added", function(childSnapshot) {

			// --- Log all data from the snapshot ---
			// console.log(childSnapshot.val().trainName);
			// console.log(childSnapshot.val().destination);
			// console.log(childSnapshot.val().time);
			// console.log(childSnapshot.val().frequency);

			// --- Moment Calculations --- 

			// Frequency of Train stored in variable
    		var tFrequency = childSnapshot.val().frequency;
    		console.log("User input frequency: " + tFrequency)

    		// First train time stored in variable
    		var firstTime = childSnapshot.val().time;
    		console.log("User input first train time " + firstTime)

    		// First Time (pushed back 1 year to make sure it comes before current time)
    		var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    		console.log(firstTimeConverted);
    		console.log(moment(firstTimeConverted, "hh:mm"))

		    // Current Time
		    var currentTime = moment();
		    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		    // Difference between the times
    		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    		console.log("DIFFERENCE IN TIME: " + diffTime);

    		// Time apart (remainder)
		    var tRemainder = diffTime % tFrequency;
		    console.log(tRemainder);

		    // Minute Until Train
		    var tMinutesTillTrain = tFrequency - tRemainder;
		    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		    // Next Train
		    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


			// append data to train table
			$(".table tbody").append(
				"<tr><td>" + childSnapshot.val().trainName + 
				"</td><td>" + childSnapshot.val().destination +
				"</td><td>" + childSnapshot.val().frequency +
				"</td><td>" + childSnapshot.val().time +
				"</td><td>" + moment(nextTrain).format("hh:mm") +
				"</td><td>" + tMinutesTillTrain);
	    })  




// Wrapper End
})