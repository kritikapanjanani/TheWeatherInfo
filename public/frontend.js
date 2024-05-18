// const { getWeather } = require('./script.js');

document.getElementById("getweatherbutton").addEventListener("click", async function(event) {
    event.preventDefault();
    let city = document.getElementById("fname").value;
    try {
        const data = await getWeather(city);
        displayWeather(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
});
function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    const temperature = data.main.temp;
    const temperatureElement = document.createElement("p");
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    weatherInfo.innerHTML = "";

    weatherInfo.appendChild(temperatureElement);
    console.log(data);
}
// console.log(data);
