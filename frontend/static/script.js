document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = `<p class="error">Please enter a city</p>`;
    return;
  }

  try {
    const res = await fetch(`/weather?city=${encodeURIComponent(city)}`);
    const data = await res.json();

    if (data.error) {
      resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
    } else {
      resultDiv.innerHTML = `
        <div class="weather-card">
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><i class="fas fa-temperature-half"></i> Temperature: ${data.main.temp} °C</p>
          <p><i class="fas fa-cloud"></i> Weather: ${data.weather[0].description}</p>
          <p><i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%</p>
          <p><i class="fas fa-wind"></i> Wind Speed: ${data.wind.speed} m/s</p>
        </div>
      `;
    }
  } catch (err) {
    resultDiv.innerHTML = "<p class='error'>Error fetching weather</p>";
  }
});

