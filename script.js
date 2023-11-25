let weather = {
    "apikey": "8fd6b36877c088598d1689b2b869dc85",

    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apikey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    fetchWeatherByCoords: function (latitude, longitude) {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + this.apikey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    getCurrentLocationWeather: function () {
        // Use OpenWeatherMap's location detection endpoint
        fetch("https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=" + this.apikey)
            .then((response) => response.json())
            .then((data) => {
                const { lat, lon } = data.coord;
                this.fetchWeatherByCoords(lat, lon);
            })
            .catch((error) => {
                console.error("Error getting location:", error);
            });
    },

    search: function () {
        this.fetchWeather(document.querySelector(".searchbar").value);
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Fetch weather for the user's current location
weather.getCurrentLocationWeather();
