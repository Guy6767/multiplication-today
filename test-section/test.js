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

function hideAllAndShowThis(showElement) {
  $(".test-welcome-message").hide();
  $(".multiplication-by-number").hide();
  $(".test").hide();
  $(".contact-form").hide();
  $(".contact-form-completed").hide();
  $(".test-review").hide();
  $(".progress-bar").hide();
  $("." + showElement).show();
}

$(document).ready(function() {
  hideAllAndShowThis("test-welcome-message");
});

///////////////////////////////////////////////////////////////////////////

///////////////////////// test section /////////////////////////////////

///////////////////////////////////////////////////////////////////////////

// test toggler
$(document).ready(function() {
  startTest();
});

// initias global variables
var currentNumberTest;
var testClass;
var answer;
var answerNumber;
var userAnswer;
var answerSet;
var counter;

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

// starts the test mode and handles the sidebar buttom style
function startTest() {
  $("#pageSubmenu a, #test-random, #test-time").on("click", function() {
    hideAllAndShowThis("test");
    counter = 1;
    answerSetGenerator();

    // checks that the player didnt press on the section he's already in
    if ($(testClass).attr("class") != $(this).attr("class")) {

      counter = 0;
      // changes buttons colors
      currentNumberTest = this;
      $(currentNumberTest).toggleClass("button-clicked");
      $(testClass).toggleClass("button-clicked");
      testClass = $(this);

      // sets up the question by the chosen number
      if (testClass.attr("id") == "test-time") {
        chosenNumber = prompt("בחר מספר להיבחן עליו");
        $(".progress-bar").show();
      } else {
        chosenNumber = parseInt(testClass.attr("class").slice(5));
      }

      questionGenerator();
    }
  });
}

// generates a random question based on the number clicked
function questionGenerator() {

  // reset the progress bar for time test
  clearInterval(progressInterval);
  $(".progress").css("width", "0%");
  progressBar();

  if (counter == 10) {
    counter = 1;
    testResults();
    clearInterval(progressInterval);
    answerSetGenerator();
  }
  var randomNumber = answerSet[counter];

  // checks if the player is on random mode
  if (testClass.attr("id") == "test-random") {
    chosenNumber = randomNumberGenerator(1, 10);
  }

  // displays the question
  var quesion;
  answer = randomNumber * chosenNumber;
  if (chosenNumber == 10 && randomNumber == 10) {

    question = chosenNumber + "X" + randomNumber;
  } else {

    question = chosenNumber + " X " + randomNumber;
  }
  $(".question").text(question);
  buttonsAnswers();
  checkAnswer();
  counter++;
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

    // adds the results to the results page
    userAnswer = this;
    if (answer == parseInt($(userAnswer).text())) {
      results++;
      $(".correct-result-" + counter).text(question + " = " + answer).css("color", "#70707057");
      console.log("hey");
    } else {
      $(".correct-result-" + counter).text(question + " = " + answer).css("color", "#E53B3B");
      console.log("hello");
    }

    makeSound();
    questionGenerator();

  });
}

function makeSound() {
  setTimeout(function() {
    var selectSound = new Audio("../sounds/select.mp3");
    selectSound.play();
  });
}

var results = 0;

function testResults() {
  hideAllAndShowThis("test-review");
  if (results == 10) {
    $(".grade span").text(results);
  } else {
    $(".grade span").text("0" + results);
  }
  circleScore(results);
  results = 0;

  $(".test-review button").on("click", function() {
    results = 0;
    counter = 0;
    hideAllAndShowThis("test");
    if (testClass.attr("id") == "test-time") {
      chosenNumber = prompt("בחר מספר להיבחן עליו");
      $(".progress-bar").show();

    }
    answerSetGenerator();
    questionGenerator();
  });
}

function circleScore(score) {

  if (score < 6) {
    scoreDegree = 90 + score * 36;
    $(".circle-border").css("background", "linear-gradient(" + scoreDegree + "deg, transparent 50%, #e3e3e3 50%),linear-gradient(90deg, #e3e3e3 50%, #E53B3B 50%)");

  } else {
    scoreDegree = -90 + (score - 5) * 36;
    $(".circle-border").css("background", "linear-gradient(270deg, #E53B3B 50%, transparent 50%),linear-gradient(" + scoreDegree + "deg, #E53B3B 50%, #e3e3e3 50%)");
  }

}

var progressInterval;

function progressBar() {

  var width = 0;
  progressInterval = setInterval(filler, 10);

  function filler() {

    if (width >= 100) {
      clearInterval(progressInterval);
      $(".progress").css("width", "0%");
      $(".correct-result-" + counter).text(question + " = " + answer).css("color", "#E53B3B");
      questionGenerator();

    } else {
      width = width + 0.2;
      $(".progress").css("width", width + '%');
    }

  }
}





///////////////////////////////////////////////////////////////////////////

///////////////////////////// contact page ///////////////////////////////////

///////////////////////////////////////////////////////////////////////////

$(".contact-form-button").click(function() {
  hideAllAndShowThis("contact-form");
});

$(".gform").submit(function() {
  hideAllAndShowThis("contact-form-completed");
});

///////////////////////////////////////////////////////////////////////////

///////////////////////////// dark mode ///////////////////////////////////

///////////////////////////////////////////////////////////////////////////

// enables dark mode
$(".dark-mode").click(function() {
  $(".question-card").toggleClass("question-card-dark");
  $("body").toggleClass("body-dark");
  $(".navbar").toggleClass("navbar-dark");
  $("#sidebar").toggleClass("sidebar-dark");
  $(".test-welcome-message").toggleClass("test-welcome-message-dark");
  $("#sidebar ul li a").toggleClass("sidebar-dark-mode");
  // $(".button-clicked").css("background-color","black");
  // document.querySelector(".button-clicked").style.backgroundColor = "black !important";
  $(".contact-form").toggleClass("contact-form-dark");
  $(".test-results").toggleClass("test-results-dark");
  $(".answers").toggleClass("answers-dark");
  $(".mistakes").toggleClass("mistakes-dark");
  $(".circle").toggleClass("circle-dark");

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
