                                                                                                                         
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

			// Log everything that's coming out of snapshot
			console.log(childSnapshot.val().trainName);
			console.log(childSnapshot.val().destination);
			console.log(childSnapshot.val().time);
			console.log(childSnapshot.val().frequency);

			$(".table tbody").append(
				"<tr><td>" + childSnapshot.val().trainName + 
				"</td><td>" + childSnapshot.val().destination +
				"</td><td>" + childSnapshot.val().frequency);
	    })  




// Wrapper End
})


// Moment JS Experimentation
// ---------------
// var convertedDate = moment(new Date());
// console.log(moment(convertedDate).format('MMMM Do YYYY, h:mm:ss a'));
// $("#time").html(moment(convertedDate).format('MMMM Do YYYY, h:mm:ss a'));
