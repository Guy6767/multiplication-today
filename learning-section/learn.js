
$(document).ready(function() {
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
  });
});

$(".dropdown-toggle").click(function() {
  $(".fas").toggleClass("fas-turned");
});
