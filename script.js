document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const apiKey = "e254d30c290f5fb05353e95f3cb0fc35"; //OpenWeatherMap API key
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // Base URL for API requests
    const searchBox = document.querySelector(".search input"); // Search input element
    const searchBtn = document.querySelector(".search button"); // Search button element
    const weatherIcon = document.querySelector(".weather-icon"); // Weather icon element

    // Define background images for different weather conditions
    const backgrounds = {
        Clear: 'url("./img/clear-bg.jpg")',
        Clouds: 'url("./img/clouds-bg.jpg")',
        Rain: 'url("./img/rain-bg.jpg")',
        Drizzle: 'url("./img/drizzle-bg.jpg")',
        Mist: 'url("./img/mist-bg.jpg")'
    };

    // Function to apply theme based on the boolean parameter `isLightTheme`
    function applyTheme(isLightTheme) {
        if (isLightTheme) {
            // Apply light theme classes
            document.body.classList.add('light-theme');
            document.querySelector('.card').classList.add('light-theme');
            document.querySelector('.search input').classList.add('light-theme');
            document.querySelector('.search button').classList.add('light-theme');
            document.querySelector('.error').classList.add('light-theme');
            document.querySelector('.humidity').classList.add('light-theme');
            document.querySelector('.wind').classList.add('light-theme');
            localStorage.setItem('theme', 'light'); // Save light theme preference
        } else {
            // Remove light theme classes
            document.body.classList.remove('light-theme');
            document.querySelector('.card').classList.remove('light-theme');
            document.querySelector('.search input').classList.remove('light-theme');
            document.querySelector('.search button').classList.remove('light-theme');
            document.querySelector('.error').classList.remove('light-theme');
            document.querySelector('.humidity').classList.remove('light-theme');
            document.querySelector('.wind').classList.remove('light-theme');
            localStorage.setItem('theme', 'dark'); // Save dark theme preference
        }
    }

    // Load saved theme from localStorage and apply it
    if (localStorage.getItem('theme') === 'light') {
        themeSwitcher.checked = true; // Set switcher to light mode
        applyTheme(true); // Apply light theme
    } else {
        themeSwitcher.checked = false; // Set switcher to dark mode
        applyTheme(false); // Apply dark theme
    }

    // Add event listener to the theme switcher
    themeSwitcher.addEventListener('change', () => {
        applyTheme(themeSwitcher.checked); // Apply theme based on switcher's checked state
    });

    // Function to fetch weather data for a given city
    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            
            if (response.status === 404) {
                // Handle city not found
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather-details").style.display = "none";
            } else {
                const data = await response.json(); // Parse weather data
                const weatherCondition = data.weather[0].main; // Get the main weather condition

                // Update weather details in the DOM
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector(".humidity").innerHTML = `<img src="img/humidity.png" width="15px" height="15px" alt="Humidity Icon"> ${data.main.humidity}%`;
                document.querySelector(".wind").innerHTML = `<img src="img/winds.png" width="20px" height="20px" alt="Wind Icon"> ${data.wind.speed} km/h`;

                // Update weather icon based on the weather condition
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

                updateBackground(weatherCondition); // Update background based on weather condition

                // Display weather details and hide error message
                document.querySelector(".weather-details").style.display = "block";
                document.querySelector(".error").style.display = "none";
            }
        } catch (error) {
            console.error('Error fetching weather data:', error); // Log any errors
        }
    }

    // Function to update the background image based on weather condition
    function updateBackground(weatherCondition) {
        document.body.style.backgroundImage = backgrounds[weatherCondition] || ''; // Set background image
    }

    // Add event listener to the search button
    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value); // Check weather for the city entered in the search box
    });

    // Check weather for a default city on page load
    checkWeather("New York");
});
