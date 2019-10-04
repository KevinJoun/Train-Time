var config = {
    apiKey: "AIzaSyBqRo7hSV21RRkAclDe-DAO8Fa1CoJPDfY",
    authDomain: "train-time-assignment-b331f.firebaseapp.com",
    databaseURL: "https://train-time-assignment-b331f.firebaseio.com",
    projectId: "train-time-assignment-b331f",
    storageBucket: "train-time-assignment-b331f.appspot.com",
    messagingSenderId: "929522689584",
    appId: "1:929522689584:web:96f5b50db16b77df482ff5"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#submit-btn").on("click",function(){
    event.preventDefault();
    var trainName = $("#nameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var trainTime = $("#trainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        trainName : trainName,
        destination : destination,
        trainTime : trainTime,
        frequency : frequency
    };

    database.ref().push(newTrain);

    $("#nameInput").val("")
    $("#destinationInput").val("")
    $("#trainTimeInput").val("")
    $("#frequencyInput").val("")
});

database.ref().on("child_added",function(childSnapshot){
    var snap = childSnapshot.val()
    var name = snap.trainName;
    var dest = snap.destination;
    var time = snap.trainTime;
    var freq = snap.frequency;
    var nextArrival;
    var minsAway;

    var timeSplit = time.split(":");
    var trainTimes = moment().hours(timeSplit[0]).minutes(timeSplit[1]);
    var max = moment.max(moment(),trainTimes)
    if(max === trainTimes){
        nextArrival = trainTime.format("hh:mm A")
        minsAway = traintimes.diff(moment(),"minutes");
    } else{
        var timeDif = moment().diff(trainTimes,"minutes");
        var timeRemain = timeDif % freq;
        minsAway = freq - timeRemain
        nextArrival = moment().add(minsAway,"m").format("hh:mm A");
    }
    console.log(freq)
    console.log(nextArrival)
    console.log(minsAway)
    $("#tableAppend").append(
        $("<tr>").append(
          $("<td>").text(name),
          $("<td>").text(dest),
          $("<td>").text(freq),
          $("<td>").text(nextArrival),
          $("<td>").text(minsAway)
        )
      );
})