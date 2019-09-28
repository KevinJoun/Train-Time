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
        frequncy : frequency
    };

    database.ref().push(newTrain);

    $("#nameInput").val("")
    $("#destinationInput").val("")
    $("#trainTimeInput").val("")
    $("#frequencyInput").val("")
});

database.ref().on("child_added",function(childSnapshot){
    console.log(childSnapshot);
})