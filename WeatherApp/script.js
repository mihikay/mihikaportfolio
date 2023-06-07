function getWeather() {
    const locationInput = document.getElementById("location-input");
    const location = locationInput.value;
    const apiKey = "a4dc627d876944a6aae01617230706"; 
  
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
      .then(response => response.json())
      .then(data => {
        const weatherInfo = document.getElementById("weather-info");
        weatherInfo.innerHTML = `
          <h2>${data.location.name}</h2>
          <p>Temperature: ${data.current.temp_c}°C</p>
          <p>Condition: ${data.current.condition.text}</p>
        `;
      })
      .catch(error => {
        console.log("Error fetching weather data:", error);
      });
  }
  