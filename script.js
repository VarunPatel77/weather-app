const apiKey = "https://home.openweathermap.org/api_keys"; // Replace with your OpenWeatherMap key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

const getWeather = async (city) => {
  try {
    const url = 
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const { name, main, weather, wind } = data;

    weatherResult.innerHTML = `
      <h2>${name}</h2>
      <p><strong>🌡️ Temp:</strong> ${main.temp}°C</p>
      <p><strong>☁️ Condition:</strong> ${weather[0].description}</p>
      <p><strong>💧 Humidity:</strong> ${main.humidity}%</p>
      <p><strong>🌬️ Wind:</strong> ${wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
};

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});
