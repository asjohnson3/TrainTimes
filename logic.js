  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB7CSrUM-74fyD5SIxMK_oobKWguJsopPs",
    authDomain: "traintimes-87561.firebaseapp.com",
    databaseURL: "https://traintimes-87561.firebaseio.com",
    projectId: "traintimes-87561",
    storageBucket: "traintimes-87561.appspot.com",
    messagingSenderId: "169392212016"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#employee-name-input").val().trim();
    var destName = $("#role-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var tFrequency = $("#rate-input").val().trim();

  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      role: destName,
      start: trainStart,
      rate: tFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    alert("Train time successfully added");
  
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destName = childSnapshot.val().role;
    var trainStart = childSnapshot.val().start;
    var tFrequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(destName);
    console.log(trainStart);
    console.log(tFrequency);




    // Time is 3:30 AM
    // var trainStart = "12:00";
  
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
  
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
    var beautyTrainTime = moment(nextTrain).format("hh:mm");





  
    // Prettify the employee start
    var empStartPretty = moment.unix(trainStart).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(trainStart, "X"), "months");
    console.log(empMonths);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destName),
      $("<td>").text(tFrequency),
      $("<td>").text(beautyTrainTime),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case


