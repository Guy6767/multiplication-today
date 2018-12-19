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
var answerNumber;
var userAnswer;

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
  $(".question").text(question);
  buttonsAnswers();
  checkAnswer();

}

// adds the answers to the buttons
function buttonsAnswers() {
  // adds the corrent answer to a random number
  answerNumber = randomNumberGenerator(1, 4);
  $(".button-" + answerNumber).text(answer);
  // creates a new SET of 4 numbers in the range wanted
  var buttons = new Set();
  var randomAnswer;
  for (var i = 0; i <= 100; i++) {
    if (answer <= 20) {
      randomAnswer = randomNumberGenerator(1, (answer + 20));
    } else {
      randomAnswer = randomNumberGenerator((answer - 20), (answer + 20));
    }
    // checks that the new number is different than the answer
    if (randomAnswer != answer) {
      buttons.add(randomAnswer);
    }
    // finishes the creation of the set at 4 elements
    if (buttons.size == 4) {
      break;
    }
  }
  // convert the SET "buttons" to ARRAY
  buttons = Array.from(buttons);
  // adds wrong answers to the rest of the buttons
  for (var x = 1; x <= 4; x++) {
    if (x != answerNumber) {
      $(".button-" + x).text(buttons[x - 1]);
    }
  }
}

// checks to see wheter player was right or wrong
function checkAnswer() {
  $(".answer-button").on("click", function() {
    userAnswer = this;
    if (answer == parseInt($(userAnswer).text())) {
      makeVisual("correct");
      makeSound("correct");
    } else {
      makeVisual("incorrect");
      makeSound("incorrect");
    }
    nextQuestion();
  });
}

// continues to the next exercise
function nextQuestion() {
  $(".answer-button").off("click");
  setTimeout(function() {
    questionGenerator();
  }, 600);
}

// makes the sound of wrong / right answers
function makeSound(result) {

  switch (result) {

    case "correct":
      var correctSound = new Audio("../sounds/correct.mp3");
      correctSound.play();
      break;

    case "incorrect":
      var incorrectSound = new Audio("../sounds/incorrect.mp3");
      incorrectSound.play();
      break;
  }
}

// changes the visuals to match the user's wrong / right answer
function makeVisual(result) {

  switch (result) {

    case "correct":
      $(".question-card").addClass("question-card-correct");
      setTimeout(function() {
        $(".question-card").removeClass("question-card-correct");
      }, 600);
      $(userAnswer).addClass("answer-button-correct");
      setTimeout(function() {
        $(".answer-button-correct").removeClass("answer-button-correct");
      }, 600);
      break;

    case "incorrect":
      $(".question-card").addClass("question-card-incorrect");
      setTimeout(function() {
        $(".question-card").removeClass("question-card-incorrect");
      }, 600);
      $(userAnswer).addClass("answer-button-incorrect");
      setTimeout(function() {
        $(".answer-button-incorrect").removeClass("answer-button-incorrect");
      }, 600);
      break;

  }
}
