// sidebar behavior
$(document).ready(function() {
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');

  });
});

$(".dropdown-toggle").click(function() {
  $(".fas").toggleClass("fas-turned");
});

///////////////////////////////////////////////////////////////////////////

///////////////////////// exercise section /////////////////////////////////

///////////////////////////////////////////////////////////////////////////

// exercise toggler
$(document).ready(function() {
  $(".exercise").hide();
  startExercise();
});

// initias global variables
var currentNumberExercise;
var exerciseClass;

// starts the exercise mode
function startExercise() {
  $("#pageSubmenu a").on("click", function() {
    // checks that the player didnt press on the section he's already in
    if ($(exerciseClass).attr("class") != $(this).attr("class")) {
      $(".exercise").show();
      // changes the buttons colors
      currentNumberExercise = this;
      $(currentNumberExercise).toggleClass("button-clicked");
      $(exerciseClass).toggleClass("button-clicked");
      exerciseClass = $(this);
      questionGenerator();
    }
  });
}

// generates a random question based on the number clicked
function questionGenerator() {
  numberClicked = parseInt(exerciseClass.attr("class").slice(9));
  var randomNumber = Math.floor(Math.random() * 10 + 1);
  var question = numberClicked + " X " + randomNumber;
  answer = randomNumber * numberClicked;
  $(".question").text(question);
}
