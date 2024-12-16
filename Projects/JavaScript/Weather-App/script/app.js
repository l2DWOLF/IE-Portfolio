const API_KEY = "1194d082e8eca407f97addb1a113f3c3"; // Security Issue => Encrypt
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
const query = document.getElementById("inputCity");
const city = document.getElementById("city");
const country = document.getElementById("country");
const button = document.querySelector("button");
const description = document.getElementById("description");
const feels = document.getElementById("feels");
const temp = document.getElementById("temp");
const img = document.querySelector("img");
const errorMessage = document.getElementById("errorMessage");

let dcity = "New York";

async function getWeather(city) {
    try {
        const response = await fetch(URL + city); // 1.5 s respone = undefind
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
    }
}

function displayWeather(weatherData) {
    if (weatherData.cod === 200) {
        img.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        img.classList.add("w-img");
        let tempa = Math.round(weatherData.main.temp); 
        let tempaF = (tempa * 1.8) + 32;
    
        if (query.value != "") 
        {city.innerText = query.value}
        else
        {city.innerText = dcity;};
        country.innerText = weatherData.sys.country;
        
        temp.innerText = `Temprature: ${tempa} °C | ${Math.round(tempaF)} °F.`;
        description.innerText = `Condition: ${weatherData.weather[0].description}.`;

        let feelsF = (weatherData.main.feels_like * 1.8) + 32; 
        feels.innerText = `Feels Like: ${Math.floor(weatherData.main.feels_like)} °C | ${Math.floor(feelsF)} °F.`;
        errorMessage.innerText = "";
    } else {
        errorMessage.innerText = "City not found..";
        city.innerText = "";
        country.innerText = "";
        temp.innerText = "";
        description.innerText = "";
        feels.innerText = "";
        img.src = "";
    }
}
getWeather("New York");

button.addEventListener("click", () => {
    getWeather(query.value);
});