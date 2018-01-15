// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBmOTVPwpqM4LLR3QKRbGwJOvtrKM0f5rw",
    authDomain: "train-scheduler-5cf46.firebaseapp.com",
    databaseURL: "https://train-scheduler-5cf46.firebaseio.com",
    projectId: "train-scheduler-5cf46",
    storageBucket: "train-scheduler-5cf46.appspot.com",
    messagingSenderId: "786511354833"
  };

  firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
  var database = firebase.database();

// Whenever a user clicks the submit button
  $("#submit").on("click", function (){
  	event.preventDefault();

// Input values
  	var name = $("#trainName").val().trim();
  	var destination = $("#destination").val().trim();
  	var time = $("#trainTime").val().trim();
  	var frequency = $("#frequency").val().trim();

  	console.log(name);
  	console.log(destination);
  	console.log(time);
  	console.log(frequency);

  	database.ref().push({
  		name: name,
  		destination: destination,
  		time: time,
  		frequency: frequency,		
  	});

//Clear all text-boxes
  	$("#trainName").val("");
  	$("#destination").val("");
  	$("#trainTime").val("");
  	$("#frequency").val("");


  });


//Firebase event for adding train info to the database and a row in the html
  	database.ref().on("child_added", function trainInfo(snapshot){
  		
  		console.log(snapshot.val().name);
  		console.log(snapshot.val().destination);
  		console.log(snapshot.val().time);
  		console.log(snapshot.val().frequency);

  		var name = snapshot.val().name;
  		var destination = snapshot.val().destination;
  		var time = snapshot.val().time;
  		var frequency = snapshot.val().frequency;

  		console.log(name);
  		console.log(destination);
  		console.log(time);
  		console.log(frequency);

  
   		// First Time 
    	var timeConverted = moment(time, "hh:mm")
    	

		// Current Time
    	var currentTime = moment();
    	
    	// Difference between the times
    	var difference = moment().diff(moment(timeConverted), "minutes");
    	

    	// Time apart (remainder)
    	var tRemainder = difference % frequency;
    	

    	//Minute Until Train
    	var minutesAway = frequency - tRemainder;
    	

    	// Next Train
   	 	var nextArrival = moment().add(minutesAway, "minutes");
   	 	nextArrival = moment(nextArrival).format("hh:mm");
    

    	
  		// Add train info to the table
  		$(".table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" +  minutesAway + "</td></tr>");
  	
  		update();

  	});

function update(){
	setInterval(updatetime, 60000);
}
 
function updatetime(){

}

