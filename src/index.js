function displayWeather (response) {
    let temperatureElement = document.querySelector(".weather-app-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector ("h1");
    let descriptionElement = document.querySelector("#description");
    let windElement = document.querySelector ("#wind");
    let humidityElement = document.querySelector("#humidity");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time*1000);
    let iconElement = document.querySelector("#icon");
    
    console.log(response.data);
    
    temperatureElement.innerHTML = temperature;
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    timeElement.innerHTML = formatDate(date);
    iconElement.innerHTML= `<img src ="${response.data.condition.icon_url}"/>`;
}

function searchCity(city){
    let apiKey = "te659a2ao0cb8e3d11cb64043bff9883";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayWeather);
}

function searchEngine (event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input-text");
    searchCity(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEngine);

// c'est la ville qui apparaît quand la page s'ouvre
searchCity("Berlin");

function formatDate (date) {
    let minutes = date.getMinutes();
        if (minutes < 10){
         minutes = `0${minutes}`;
        }
    let hours = date.getHours();
        if (hours < 10){
            hours = `0${hours}`;
        }  
    
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;
}
