const apiKey = "e254d30c290f5fb05353e95f3cb0fc35";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const backgrounds = {
    Clear: 'url("./img/clear-bg.jpg")',
    Clouds: 'url("./img/clouds-bg.jpg")',
    Rain: 'url("./img/rain-bg.jpg")',
    Drizzle: 'url("./img/drizzle-bg.jpg")',
    Mist: 'url("./img/mist-bg.jpg")'
};

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        const weatherCondition = data.weather[0].main;

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (weatherCondition === "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (weatherCondition === "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (weatherCondition === "Rain") {
            weatherIcon.src = "img/rain.png";
        } else if (weatherCondition === "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (weatherCondition === "Mist") {
            weatherIcon.src = "img/mist.png";
        }

        updateBackground(weatherCondition);

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

function updateBackground(weatherCondition) {
    document.body.style.backgroundImage = backgrounds[weatherCondition] || '';
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Check weather for a default city on page load
checkWeather("New York");
