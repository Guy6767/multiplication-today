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

function hideAndShow(showElement) {
  $(".learning-welcome-message").hide();
  $(".multiplication-table").hide();
  $(".multiplication-by-number").hide();
  $(".exercise").hide();
  $(".contact-form").hide();
  $(".contact-form-completed").hide();
  $("." + showElement).show();
}

///////////////////////////////////////////////////////////////////////////

///////////////////////// learn section /////////////////////////////////

///////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
  hideAndShow("learning-welcome-message");
  startLearning();
});

function startLearning() {
  $("#homeSubmenu a").on("click", function() {
    // checks that the player didnt press on the section he's already in
    if ($(exerciseClass).attr("class") != $(this).attr("class")) {
      currentNumberExercise = this;
      $(currentNumberExercise).toggleClass("button-clicked");
      $(exerciseClass).toggleClass("button-clicked");
      exerciseClass = $(this);
    }
  });
}

$(".multiplication-table-section").click(function() {
  hideAndShow("multiplication-table");
});


$(".multiplication-by-number-section").click(function() {
  hideAndShow("multiplication-by-number");
});


///////////////////////////////////////////////////////////////////////////

///////////////////////// exercise section /////////////////////////////////

///////////////////////////////////////////////////////////////////////////

// exercise toggler
$(document).ready(function() {
  startExercise();
});

// initias global variables
var currentNumberExercise;
var exerciseClass;
var answer;
var answerNumber;
var userAnswer;
var answerSet;
var counter = 0;

// creates a random number in a range
function randomNumberGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// generates a SET of pre-made answers
function answerSetGenerator() {
  answerSet = new Set();
  for (var i = 0; i <= 100; i++) {
    answerSet.add(randomNumberGenerator(1, 10));
    if (answerSet.size == 10) {
      break;
    }
  }
  // convert the SET "answerSet to ARRAY
  answerSet = Array.from(answerSet);
}

// starts the exercise mode and handles the sidebar buttom style
function startExercise() {
  $("#pageSubmenu a").on("click", function() {
    // hides all other sections
    hideAndShow("exercise");
    // returns counter to zero and creates a new set
    counter = 0;
    answerSetGenerator();
    // checks that the player didnt press on the section he's already in
    if ($(exerciseClass).attr("class") != $(this).attr("class")) {
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

  if (counter == 9) {
    counter = 0;
    answerSetGenerator();
  }
  counter++;
  var randomNumber = answerSet[counter];

  // checks what exercise the user had chosen
  if ((exerciseClass.attr("class") == "exercise-random button-clicked") || (exerciseClass.attr("class") == "exercise-random sidebar-dark-mode button-clicked")) {
    chosenNumber = randomNumberGenerator(1, 10);
  } else {
    chosenNumber = parseInt(exerciseClass.attr("class").slice(9));
  }

  // displays the question
  var quesion;
  answer = randomNumber * chosenNumber;
  if (chosenNumber == 10 && randomNumber == 10) {
    // $(".question").text(question);
    // $(".question").css("font-size","2em");
    question = chosenNumber + "X" + randomNumber;
  } else {
    question = chosenNumber + " X " + randomNumber;
  }
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
    } else if (answer >= 80) {
      randomAnswer = randomNumberGenerator((answer - 20), 100);
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
  $(".answer-button").off().on("click", function() {
    // $(".answer-button").unbind("click");
    userAnswer = this;
    if (answer == parseInt($(userAnswer).text())) {
      makeVisual("correct");
      makeSound("correct");
    } else {
      makeVisual("incorrect");
      makeSound("incorrect");
    }
  });
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
      $(userAnswer).addClass("answer-button-correct");

      setTimeout(function() {
        $(".question-card").removeClass("question-card-correct");
        $(".answer-button-correct").removeClass("answer-button-correct");
        questionGenerator();
      }, 600);
      break;

    case "incorrect":

      $(".question-card").addClass("question-card-incorrect");
      $(".button-" + answerNumber).addClass("answer-button-incorrect");

      setTimeout(function() {
        $(".question-card").removeClass("question-card-incorrect");
        $(".answer-button-incorrect").removeClass("answer-button-incorrect");
        questionGenerator();
      }, 1000);
      break;

  }
}

///////////////////////////////////////////////////////////////////////////

///////////////////////////// contact page ///////////////////////////////////

///////////////////////////////////////////////////////////////////////////

$(".contact-form-button").click(function() {
  hideAndShow("contact-form");
});

$(".gform").submit(function() {
  hideAndShow("contact-form-completed");
});

///////////////////////////////////////////////////////////////////////////

///////////////////////////// dark mode ///////////////////////////////////

///////////////////////////////////////////////////////////////////////////

// enables dark mode
$(".dark-mode").click(function() {
  $(".question-card").toggleClass("question-card-dark");
  $("body").toggleClass("body-dark");
  $(".navbar").toggleClass("navbar-dark");
  $(".multiplication-table").toggleClass("multiplication-table-dark");
  $("#sidebar").toggleClass("sidebar-dark");
  $(".learning-welcome-message").toggleClass("learning-welcome-message-dark");
  $(".by-number-card").toggleClass("by-number-card-dark");
  $("#sidebar ul li a").toggleClass("sidebar-dark-mode");
  $(".contact-form").toggleClass("contact-form-dark");
  if ($(".dark-mode-text").text() == "למצב לילה") {
    $(".dark-mode-text").text("למצב יום");
    $(".dark-mode .fas").removeClass('fa-moon').addClass('fa-sun');
  } else {
    $(".dark-mode .fas").removeClass('fa-sun').addClass('fa-moon');
    $(".dark-mode-text").text("למצב לילה");
  }
});

if ($(window).width() < 768) {

  $("#sidebarCollapse").click(function() {
    hideMainScreen();
  });

  $("#sidebar ul li li a").click(function() {
    $('#sidebar').toggleClass('active');
    $("#sidebarCollapse").toggleClass('active');
    hideMainScreen();
  });

}

function hideMainScreen() {
  if ($(".main-screen").hasClass("main-screen-hidden")) {
    setTimeout(function() {
      $(".main-screen").toggleClass("main-screen-hidden");
      $(".mobile-nav-button").toggleClass("mobile-nav-button-hidden");
    }, 600);
  } else {
    $(".main-screen").toggleClass("main-screen-hidden");
    $(".mobile-nav-button").toggleClass("mobile-nav-button-hidden");
  }
}
