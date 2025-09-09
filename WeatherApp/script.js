function getWeather() {
  const locationInput = document.getElementById("location-input");
  const location = locationInput.value;
  const apiKey = "a4dc627d876944a6aae01617230706";

  const weatherInfo = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");
  weatherInfo.innerHTML = "";
  errorMessage.textContent = "";

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Weather data not available. Please try again.");
      }
      return response.json();
    })
    .then(data => {
      const { location, current } = data;
      const { name, country } = location;
      const { temp_c, condition, humidity, wind_kph } = current;

      const weatherContainer = document.createElement("div");
      weatherContainer.classList.add("weather-container");

      const headerElement = document.createElement("div");
      headerElement.classList.add("weather-info__header");

      const iconElement = document.createElement("img");
      iconElement.classList.add("weather-info__icon");
      iconElement.src = condition.icon;

      const cityElement = document.createElement("div");
      cityElement.classList.add("weather-info__city");
      cityElement.textContent = `${name}, ${country}`;

      headerElement.appendChild(iconElement);
      headerElement.appendChild(cityElement);

      const temperatureElement = document.createElement("div");
      temperatureElement.classList.add("weather-info__temperature");
      temperatureElement.textContent = `${temp_c}°C`;

      const descriptionElement = document.createElement("div");
      descriptionElement.classList.add("weather-info__description");
      descriptionElement.textContent = condition.text;

      const detailsElement = document.createElement("div");
      detailsElement.classList.add("weather-info__details");

      const humidityElement = createDetailElement("Humidity", `${humidity}%`);
      const windElement = createDetailElement("Wind", `${wind_kph} km/h`);

      detailsElement.appendChild(humidityElement);
      detailsElement.appendChild(windElement);

      weatherContainer.appendChild(headerElement);
      weatherContainer.appendChild(temperatureElement);
      weatherContainer.appendChild(descriptionElement);
      weatherContainer.appendChild(detailsElement);

      weatherInfo.appendChild(weatherContainer);
    })
    .catch(error => {
      errorMessage.textContent = error.message;
      console.log("Error fetching weather data:", error);
    });
}

function createDetailElement(label, value) {
  const rowElement = document.createElement("div");
  rowElement.classList.add("weather-info__details-row");

  const labelElement = document.createElement("div");
  labelElement.classList.add("weather-info__details-label");
  labelElement.textContent = label;

  const valueElement = document.createElement("div");
  valueElement.classList.add("weather-info__details-value");
  valueElement.textContent = value;

  rowElement.appendChild(labelElement);
  rowElement.appendChild(valueElement);

  return rowElement;
}

document.addEventListener("DOMContentLoaded", () => {
  const getWeatherBtn = document.getElementById("get-weather-btn");
  getWeatherBtn.addEventListener("click", getWeather);
});
