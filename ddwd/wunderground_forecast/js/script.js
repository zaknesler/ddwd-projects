// This is a comment in JavaScript.

/*
    This is
    a multiline
    comment in JavaScript.
*/

function getName()
{
    // Open a promt so the user may time his or her name.
    // Assign that value to a new variable called 'name'.
    var name = prompt('Please enter your name', 'Zak');

    // If the user typed something into the prompt.
    // Literally, if the value is not null.
    if (name.length > 0) {
        // Get the element with an id of 'demo'.
        // Set its internal content to a string that greets the user.
        document.getElementById('name-output')
                .innerHTML = 'Hello, ' + name + '! How are you today?';
    }
}

function getLocation()
{
    // Get the user's location.
    var location = prompt('Please enter your location.', 'Hazleton, Pennsylvania');

    // If the user typed something into the prompt.
    // Literally, if the value is not null.
    if (location.length > 0) {
        // Get the element with an id of 'demo'.
        // Set its internal content to a string that greets the user.
        document.getElementById('location-output')
                .innerHTML = 'Nice! ' + location + ' is a pretty cool place to live.';
    }
}

function getCityAndState()
{
    // Get the user's city.
    var city = prompt('Please enter your city.', 'Hazleton');

    // Get the user's state.
    var state = prompt('Please enter your state.', 'PA');

    if ((city.length > 0) && (state.length > 0)) {
        document.getElementById('citystate-output')
                .innerHTML = 'You live in ' + city + ', ' + state + '.';
    }
}

function wundergroundRadar()
{
    // Get the user's city.
    var city = prompt('Please enter a city', 'Hazleton');

    // Get the user's state.
    var state = prompt('Please enter a state', 'PA');

    // The text that is displayed inside of the button.
    var hyperlink = 'Click here';

    // The final URL to be given to the user. This includes the city and the state.
    var url = hyperlink.link('http://api.wunderground.com/api/7787bf91089d35a6/animatedradar/q/'
                            + state + '/' + city + '.swf?width=500&height=500&newmaps=1&radius=400');

    // If the city and the state are both set.
    if ((city.length > 0) && (state.length > 0)) {
        // Ignore the following lines if you don't want to make the hyperlink clickable.
        document.getElementById('wunderground-radar-output')
                .innerHTML = url + ' for your radar.';
    }
}

function wundergroundConditions()
{
    // Get the user's city.
    var city = prompt('What city do you live in?', 'Hazleton');

    // Get the user's state.
    var state = prompt('What state do you live in?', 'PA');

    // If the city and the state are both set.
    if ((city.length > 0) && (state.length > 0)) {
        // When the document has been loaded.
        $(document).ready(function() {
            // Perform an ajax get request to the Wunderground API to get the weather conditions.
            $.ajax({
                url: 'http://api.wunderground.com/api/7787bf91089d35a6/conditions/q/' + state + '/' + city + '.json',
                data: {
                    country: 'us',
                    year: 2016,
                },
                dataType: 'jsonp',
                success: function(json) {
                    // When the ajax request is successful, assign the 'current_observation' to a variable.
                    var response = json.current_observation;

                    // Assign several things to variables.
                    var temp = Math.floor(response.temp_f) + '°F';
                    var weather = response.weather.toLowerCase();
                    var state_name = response.display_location.state_name;
                    var city_name = response.display_location.city;

                    // Display these to the user in a formatted string.
                    document.getElementById('wunderground-conditions-output')
                            .innerHTML = 'It is ' + temp + ' and ' + weather + ' in ' + city_name + ', ' + state_name + '.';
                }
            });
        });
    }
}

function wundergroundForecast()
{
    // Get the user's city.
    var city = prompt('What city do you live in?', 'Hazleton');

    // Get the user's state.
    var state = prompt('What state do you live in?', 'PA');

    // If the city and the state are both set.
    if ((city.length > 0) && (state.length > 0)) {
        // When the document has been loaded.
        $(document).ready(function() {
            // Perform an ajax get request to the Wunderground API to get the weather conditions.
            $.ajax({
                url: 'http://api.wunderground.com/api/7787bf91089d35a6/forecast10day/q/' + state + '/' + city + '.json',
                dataType: 'jsonp',
                success: function(json) {
                    // When the ajax request is successful, assign the 'current_observation' to a variable.
                    var response = json.forecast.simpleforecast.forecastday;

                    // Create an empty string to store all of the generated rows.
                    var rows = '';

                    // Loop through all of the objects in the array.
                    for (var i = 0; i < response.length; i++) {
                        // For each object, create a new row and append it to the 'rows' string.
                        rows += '<tr><td>' + response[i].date.monthname + ' ' + response[i].date.day+ '</td><td>' + response[i].conditions + '</td></tr>';
                    }

                    // The table is invisible by default; set its display to 'block' to make it visible.
                    document.querySelector('#wunderground-forecast-output').style.display = 'block';

                    // Set the table's body to the final 'rows' string.
                    document.querySelector('#wunderground-forecast-output table tbody').innerHTML = rows;
                }
            });
        });
    }
}
