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

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiId}`)
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
                    }
                }
            });
        }
    });
}
