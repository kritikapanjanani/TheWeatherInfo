const ApiKey =`b731027122291571be0c2b562c8db9ed`
const form=document.querySelector("form")
const search=document.querySelector("#search")
const weatherdata=document.querySelector("#weatherdata")

const getWeather = async(city) => {
    weatherdata.innerHTML=`<h2> Loading...</h2>`
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`
    const response=await fetch(url);
    const data=await response.json()
    console.log(data)
   return displayweather(data)
}
const displayweather = ( data) => {
     if(data.cod == "404"){
       weatherdata.innerHTML =`
        <h2>city not found!!</h2>
        `
        return;
     }
    weatherdata.innerHTML = `
    <div>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="img">
   </div>
   <div>
        <h2>${data.main.temp} °C </h2>
        <h4>${data.weather[0].main}</h4>
   </div>`
}

const getCurrentTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
        return 'Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'Afternoon';
    } else {
        return 'Evening';
    }
}

const showWelcomeMessage = () => {
    const welcomeMessage = document.createElement("div");
    welcomeMessage.innerHTML = `
        <p>Good ${getCurrentTimeOfDay()}, welcome to the Weather Forecast!... Enter a city name to get the weather information => </p>;`
    document.body.insertBefore(welcomeMessage, document.body.firstChild);
}

showWelcomeMessage();


form.addEventListener(
    "submit",
    function(event){
        getWeather(search.value)
        event.preventDefault();
    }
)