document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
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

    function applyTheme(isLightTheme) {
        if (isLightTheme) {
            document.body.classList.add('light-theme');
            document.querySelector('.card').classList.add('light-theme');
            document.querySelector('.search input').classList.add('light-theme');
            document.querySelector('.search button').classList.add('light-theme');
            document.querySelector('.error').classList.add('light-theme');
            document.querySelector('.humidity').classList.add('light-theme');
            document.querySelector('.wind').classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.querySelector('.card').classList.remove('light-theme');
            document.querySelector('.search input').classList.remove('light-theme');
            document.querySelector('.search button').classList.remove('light-theme');
            document.querySelector('.error').classList.remove('light-theme');
            document.querySelector('.humidity').classList.remove('light-theme');
            document.querySelector('.wind').classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Load saved theme from localStorage
    if (localStorage.getItem('theme') === 'light') {
        themeSwitcher.checked = true;
        applyTheme(true);
    } else {
        themeSwitcher.checked = false;
        applyTheme(false);
    }

    themeSwitcher.addEventListener('change', () => {
        applyTheme(themeSwitcher.checked);
    });

    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather-details").style.display = "none";
        } else {
            const data = await response.json();
            const weatherCondition = data.weather[0].main;

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            
            // Updated humidity display with image
            document.querySelector(".humidity").innerHTML = `<img src="img/humidity.png" width="15px" height="15px" alt="Humidity Icon"> ${data.main.humidity}%`;
            document.querySelector(".wind").innerHTML = `<img src="img/winds.png" width="20px" height="20px" alt="Wind Icon"> ${data.wind.speed} km/h`;

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

            document.querySelector(".weather-details").style.display = "block";
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
});
