var window_height = $( window ).height();
var window_divisor = 2.6;

if ((window_height/window_divisor - 10) > 350) {
  $(".main_truck").width( window_height/window_divisor - 10 );
  $(".main_truck").height( window_height/window_divisor - 10 );

  $( window ).bind("resize", function(){
      // Change the width of the div
      window_height = $( window ).height();
      $(".main_truck").width( window_height/window_divisor - 10 );
      $(".main_truck").height( window_height/window_divisor - 10 );
  });
} else {
  $(".main_truck").width( 350 );
  $(".main_truck").height( 350 );
}



// Get the images that open the modals
var food_truck_1 = document.getElementById("food_truck_1");
var food_truck_2 = document.getElementById("food_truck_2");
var food_truck_3 = document.getElementById("food_truck_3");
var food_truck_4 = document.getElementById("food_truck_4");




// Get the modals
var modal_food_truck_1 = document.getElementById('modal_food_truck_1');
var modal_food_truck_2 = document.getElementById('modal_food_truck_2');
var modal_food_truck_3 = document.getElementById('modal_food_truck_3');
var modal_food_truck_4 = document.getElementById('modal_food_truck_4');
// Get the <span> element that closes the modal
var span_food_truck_1 = document.getElementsByClassName("close")[0];
var span_food_truck_2 = document.getElementsByClassName("close")[1];
var span_food_truck_3 = document.getElementsByClassName("close")[2];
var span_food_truck_4 = document.getElementsByClassName("close")[3];

// When the user clicks on the image, open the modal
food_truck_1.onclick = function() {
    console.log("food_truck_1 was clicked");
    modal_food_truck_1.style.display = "block";
}
food_truck_2.onclick = function() {
    console.log("food_truck_2 was clicked");
    modal_food_truck_2.style.display = "block";
}
food_truck_3.onclick = function() {
    console.log("food_truck_3 was clicked");
    modal_food_truck_3.style.display = "block";
}
food_truck_4.onclick = function() {
    console.log("food_truck_4 was clicked");
    modal_food_truck_4.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
span_food_truck_1.onclick = function(event) {
  modal_food_truck_1.style.display = "none";
}
span_food_truck_2.onclick = function(event) {
  modal_food_truck_2.style.display = "none";
}
span_food_truck_3.onclick = function(event) {
  modal_food_truck_3.style.display = "none";
}
span_food_truck_4.onclick = function(event) {
  modal_food_truck_4.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal_food_truck_1) {
        modal_food_truck_1.style.display = "none";
    } else if (event.target == modal_food_truck_2) {
        modal_food_truck_2.style.display = "none";
    } else if (event.target == modal_food_truck_3) {
        modal_food_truck_3.style.display = "none";
    } else if (event.target == modal_food_truck_4) {
        modal_food_truck_4.style.display = "none";
    }
}

$(document).keyup(function(e) {
  if (e.keyCode == 27) { // escape key maps to keycode `27`
    modal_food_truck_1.style.display = "none";
    modal_food_truck_2.style.display = "none";
    modal_food_truck_3.style.display = "none";
    modal_food_truck_4.style.display = "none";
  }
});
