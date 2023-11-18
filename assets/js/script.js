fetch('http://api.openweathermap.org/geo/1.0/direct?q=london,,GB&limit=1&appid=c84c2c41dab775fe126d45deb0abaaef')
  .then(response => response.json())
  .then(data => {
        console.log(data[0].lat);
        let lat = data[0].lat;
        let lon = data[0].lon;

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c84c2c41dab775fe126d45deb0abaaef`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.list);
            });
    });