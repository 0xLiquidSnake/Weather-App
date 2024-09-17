const apikey = "12262efdec85296d6bbde9dd0ad634b3";

const weatherDataElement = document.getElementById("weather-data");
const cityInputElement = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => { // Fixed the capitalization of 'submit'
    event.preventDefault();
    const cityValue = cityInputElement.value.trim(); // Corrected variable name and added trim to remove extra spaces
    if (cityValue) {
        getWeatherData(cityValue);
    }
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`); // Removed spaces in the query parameters

        if (!response.ok) { // Fixed the condition to properly check for a failed response
            throw new Error("Network response was not okay!");
        }

        const data = await response.json();
        updateWeatherData(data); // Pass data to a function to update the UI
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherDataElement.innerHTML = "<p>Unable to fetch weather data. Please try again later.</p>"; // Display error message in the UI
    }
}

function updateWeatherData(data) {
    const { main, weather, wind } = data; // Destructure the data object

    weatherDataElement.innerHTML = `
        <div class="icon">
            <img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather Icon">
            <div class="temperature">${main.temp}°C</div>
            <div class="description">${weather[0].description}</div>
            <div class="details">
                <div>Feels like: ${main.feels_like}°C</div>
                <div>Humidity: ${main.humidity}%</div>
                <div>Wind Speed: ${wind.speed} m/s</div>
            </div>
        </div>
    `;
}
