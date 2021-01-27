//create new instance of XMLHTttpRequst object
var xhttp = new XMLHttpRequest();
//get HTML elements from page
var dataCountDown = document.getElementById("dataCountDown");
var dataTitle = document.getElementById("dataTitle");
var dataContent = document.getElementById("dataContent");
var dataDiv = document.getElementById("dataDiv");
//function to load the data and update the page, called on body load
function loadData() {
    var counter = 6; //initial counter
    var interval = setInterval(function () { //timer function
        counter--; //decrement used to count down
        dataCountDown.innerHTML = "New data in: " + counter + "s"; //update timer on page

        if (counter == 5) {
            var postId = Math.floor(Math.random() * 101); //generate random post number
            getData(postId); //function to get data from server and change post detail on page

            var color = getRandomColor(); //get random color
            dataDiv.style.backgroundColor = color; //apply color to div background
            ///change font color based on div color lightness
            if (isLight(color)) {
                dataTitle.style.color = "#000000";
                dataContent.style.color = "#000000";
            } else {
                dataTitle.style.color = "#ffffff";
                dataContent.style.color = "#ffffff";
            }
        }
        //reset counter
        if (counter == 0) {
            counter = 6;
            setInterval(interval);
        }
    }, 1000);
}
//get data from server
function getData(postId) {
    xhttp.onload = function () {
        post = JSON.parse(xhttp.responseText); //parse response body
        dataTitle.innerHTML = post.id + ". " + post.title; //apply post id and title to title div
        dataContent.innerHTML = post.body; //apply post body to div content
    }
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts/" + postId) //create new GET request
    xhttp.send(); //send request
}

// Function that returns a random hexa color when called
// e.g. calling myColor = getRandomColor() will store a 
// random hexadecimal color in myColor (i.e. myColor = '#12AC56') 
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';

    // Generate 6 random values from letters array
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function that checks the luminosity of a hexadecimal color
// Returns true if a color is light and false if a color is dark
// e.g. isLight("#FFFFFF") returns true 
//      isLight("#000000") returns false
function isLight(color) {
    var color = color.substring(1); // Strip #
    var rgb = parseInt(color, 16); // Convert RRGGBB to decimal
    var red = (rgb >> 16) & 0xff; // Extract red
    var green = (rgb >> 8) & 0xff; // Extract green
    var blue = (rgb >> 0) & 0xff; // Extract blue

    var luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // per ITU-R BT.709

    if (luminance > 128) {
        return true; // Color is light
    } else {
        return false; // Color is dark
    }
}