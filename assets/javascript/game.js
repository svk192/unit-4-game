
 $(document).ready(function() {
 
  var targetNumber;
  var counter;
  var wins = 0;
  var losses = 0;
  var numberOptions;

  function reset() {
   targetNumber = Math.floor((Math.random()*102) + 19);
    $("#number-to-guess").text(targetNumber);
   counter = 0;
   $("#total").html( counter );
   $("#crystals").html();
  // Now for the hard part. Creating multiple crystals each with their own unique number value.

  // We begin by expanding our array to include four options.
   numberOptions = [];
    for(i=0; i <4; i++) {
    do {
      // Generate your random number
      var numberOption = Math.floor((Math.random() * 12) + 1);
      // If the number already exists, the index of it on loto array will be different of -1, so it already exists
      var alreadyExists = numberOptions.indexOf(numberOption) !== -1;
  } while (alreadyExists) 
  numberOptions.push(numberOption);
}

  // Next we create a for loop to create crystals for every numberOption.
  if($("#crystals").children().length == 0 ) {
  for (var i = 0; i < numberOptions.length; i++) {
    // For each iteration, we will create an imageCrystal

    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");
    imageCrystal.attr("id",i);
    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", "assets/images/gem"+i+".png");

    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // This data attribute will be set equal to the array value.
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);

    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $("#crystals").append(imageCrystal);
  } }

else{
  for (var i = 0; i < numberOptions.length; i++) {
  var imageCrystal = $("#"+i);
  imageCrystal.attr("data-crystalvalue", numberOptions[i]);
} }

};

  reset();



  // This time, our click event applies to every single crystal on the page. Not just one.
  $(".crystal-image").on("click", function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    counter += crystalValue;
    $("#total").html( counter );
    // All of the same game win-lose logic applies. So the rest remains unchanged.
   //alert("New score: " + counter);

    if (counter === targetNumber) {
      alert("You win!");
      wins++;
      $("#wins").html(wins);
      reset();
    }

    else if (counter >= targetNumber) {
      alert("You lose!!");
      losses++;
      $("#losses").html(losses);
      reset();
    }

  });
 
});