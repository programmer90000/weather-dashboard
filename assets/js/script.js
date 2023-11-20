let apiId = 'c84c2c41dab775fe126d45deb0abaaef';
let click = document.getElementById("city-search-button");
let cityArray = [];

click.addEventListener('click', function () {
    let cityName = document.getElementById("city-input").value;
    getWeatherData(cityName);
});


function getWeatherData(cityName) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiId}`)
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
                        city_list.append(button);

                        getWeatherInformationForToday(data);
                    }
                }
            })
        }
    });
}

function getWeatherInformationForToday (data) {
    let current_weather = document.getElementById("current-weather");
    current_weather.innerHTML = "";
    
    let h1 = document.createElement("h1");


    let icon = data.weather[0].icon;
    let iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
    let iconImage = document.createElement('img');
    iconImage.src = iconURL;
    iconImage.style.filter = "brightness(50%)"

    let currentDate = new dayjs().format("DD/MM/YYYY");
    h1.innerText = data.name + " (" + currentDate +") ";
    h1.append(iconImage);
    current_weather.append(h1);

    let temp = document.createElement("p");
    let wind = document.createElement("p");
    let humidity =  document.createElement("p");

    temp.innerText = `Temp: ${data.main.temp} `;
    wind.innerText = `Wind: ${data.wind.speed}`;
    humidity.innerText = `Humidity: ${data.main.humidity}`;

    current_weather.append(temp);
    current_weather.append(wind);
    current_weather.append(humidity);
}