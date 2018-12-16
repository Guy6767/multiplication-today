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

// exercise toggler
$(document).ready(function() {
  $(".exercise").hide();
});

// generates a random question based on the number clicked
function questionGenerator(num) {
  var randomNumber = Math.floor(Math.random() * 10 + 1);
  var question = num + " X " + randomNumber;
  $(".question").text(question);
}

var currentNumberExercise;

// showcase the question when number is clicked
$("#pageSubmenu a").on("click", function() {
  if (this == currentNumberExercise) {
    var answer = confirm("?אתה בטוח שאתה רוצה לצאת");
    if (answer) {
      exerciseGenerator(this);
    }
  } else {
    exerciseGenerator(this);
  }
});


function exerciseGenerator(thisButton) {

  currentNumberExercise = thisButton;
  $(thisButton).toggleClass("button-clicked");
  $(".exercise").show();
  var numberClicked = $(thisButton).attr("class");
  numberClicked = parseInt(numberClicked.slice(9));
  questionGenerator(numberClicked);
}
