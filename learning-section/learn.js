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

function randomNumberGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// initias global variables
var currentNumberExercise;
var exerciseClass;
var answer;

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
  var randomNumber = randomNumberGenerator(1, 10);
  var question = numberClicked + " X " + randomNumber;
  answer = randomNumber * numberClicked;
  buttonsAnswers();
  $(".question").text(question);
}

function buttonsAnswers() {
  var answerNumber = randomNumberGenerator(1, 4);
  console.log(answerNumber);
  $(".button-" + answerNumber).text(answer);
  for (var i = 1; i <= 4; i++) {
    if (i != answerNumber) {
      var randomAnswer;
      if (answer <= 15) {
        randomAnswer = randomNumberGenerator(1, (answer + 15));
      } else {
        randomAnswer = randomNumberGenerator((answer - 15), (answer + 15));
      }
      $(".button-" + i).text(randomAnswer);
    }
  }
}
