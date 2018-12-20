
for (var i = 1; i <= 10; i++) {
    console.log("<div class='col-lg-3 col-md-4 col-sm-6 col-12'>");
    console.log("<ul class='by-number-card'>");
    console.log("<h1>כפולות</h1>");
    console.log("<hr></hr>");
    for (var x = 1; x <= 10; x++) {
        console.log("<li>"+i+" X "+x+" = "+(i*x)+"</li>");
    }
    console.log("</ul>");
    console.log("</div>");
}
