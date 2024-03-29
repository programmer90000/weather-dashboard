let apiId = 'a26e4a3da85869a39cfad126f672ff04';
let click = document.getElementById("city-search-button");
let cityArray = [];

window.onload = function () {
    // Get the previously searched cities from the local storage
    if (localStorage.getItem("cityArray")) {
        cityArray = localStorage.getItem("cityArray");
        cityArray = cityArray.split(",");
        for (let i = 0; i < cityArray.length; i++) {
            generateButtons(cityArray[i]);
            if (i === 4) break;
        }
    }

    // Search for the item the user clicked on in the previous searches page
    if (localStorage.getItem("cityToSearchFor")) {
        let cityToSearchFor = localStorage.getItem("cityToSearchFor");
        document.getElementById("city-input").value = cityToSearchFor;
        document.getElementById("city-search-button").click();
        localStorage.removeItem("cityToSearchFor");

    }
}

click.addEventListener('click', function () {
    let cityName = document.getElementById("city-input").value;
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    getWeatherData(cityName);
});


// Get the weather information
function getWeatherData(cityName) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiId}`)
        .then(response => response.json())
        .then(data => {
            if (data[0]) {
                let lat = data[0].lat;
                let lon = data[0].lon;

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiId}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data) {
                            if (!cityArray.includes(cityName)) {
                                cityArray.push(cityName);
                                let city_list = document.getElementById("city-list");
                                let button = document.createElement("button");
                                button.classList.add("button");
                                button.innerText = cityName;
                                city_list.insertBefore(button, city_list.children[1]);
                                localStorage.setItem("cityArray", cityArray);

                                if (city_list.children.length > 6) {
                                    city_list.lastChild.remove();
                                }

                                button.addEventListener("click", function () {
                                    getWeatherData(button.innerText);
                                })
                            }

                            getWeatherInformationForToday(data);
                            fiveDayForecast(data);
                        }
                    })

            }
        });
}

// Get and display the current weather information
function getWeatherInformationForToday(data) {
    let current_weather = document.getElementById("current-weather");
    current_weather.innerHTML = "";

    let h1 = document.createElement("h1");

    let icon = data.weather[0].icon;
    let iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
    let iconImage = document.createElement('img');
    iconImage.src = iconURL;
    iconImage.style.filter = "brightness(50%)";

    let currentDate = new dayjs().format("DD/MM/YYYY");
    h1.innerText = data.name + " (" + currentDate + ") ";
    h1.append(iconImage);
    current_weather.append(h1);

    let temp = document.createElement("p");
    let wind = document.createElement("p");
    let humidity = document.createElement("p");

    temp.innerText = `Temp: ${data.main.temp} `;
    wind.innerText = `Wind: ${data.wind.speed}`;
    humidity.innerText = `Humidity: ${data.main.humidity}`;

    current_weather.append(temp);
    current_weather.append(wind);
    current_weather.append(humidity);
}

// Get and display the weather information for the next 5 days
function fiveDayForecast(cityName) {
    let futureWeather = document.getElementById("future-weather");
    futureWeather.innerHTML = "";

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiId}`)
        .then(response => response.json())
        .then(data => {
            if (data[0]) {
                let lat = data[0].lat;
                let lon = data[0].lon;

                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiId}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data) {
                            let arrayOfWeather = data.list;
                            let daysToShow = [8, 16, 24, 32, 39];
                            let filterdArrayOfWeather = arrayOfWeather.filter((obj, index) => {
                                return daysToShow.includes(index);
                            })

                            for (let i = 0; i < filterdArrayOfWeather.length; i++) {
                                let card = document.createElement("div");

                                let date_h3_tag = document.createElement("h3");
                                let date_text = filterdArrayOfWeather[i].dt_txt.split(' ')[0];
                                date_text = date_text.split("-");
                                let day = date_text[2];
                                let month = date_text[1];
                                let year = date_text[0]
                                date_text = day + "/" + month + "/" + year;
                                date_h3_tag.innerText = date_text;

                                let icon = filterdArrayOfWeather[i].weather[0].icon;
                                let iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
                                let iconImage = document.createElement('img');
                                iconImage.src = iconURL;

                                let temp = document.createElement("p");
                                temp.innerText = "Temp: " + filterdArrayOfWeather[i].main.temp + " C";

                                let wind = document.createElement("p");
                                wind.innerText = "Wind: " + filterdArrayOfWeather[i].wind.speed + " KPH";

                                let humidity = document.createElement("p");
                                humidity.innerText = "Humidity: " + filterdArrayOfWeather[i].main.humidity + "%";

                                card.append(date_h3_tag);
                                card.append(iconImage)
                                card.append(temp);
                                card.append(wind);
                                card.append(humidity);

                                futureWeather.append(card);
                            }
                        }
                    })
            }
        });
}

// Generate the buttons for each city
function generateButtons(text) {
    let city_list = document.getElementById("city-list");
    let button = document.createElement("button");
    button.classList.add("button");
    button.innerText = text;
    city_list.append(button);
    button.addEventListener("click", function () {
        getWeatherData(button.innerText);
    })
}