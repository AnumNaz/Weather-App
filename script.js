let inputBox= document.querySelector(".input-box")
let searchBtn= document.querySelector(".searchBtn")
let weatherImg= document.querySelector(".weatherImg")
let temperature = document.querySelector(".temp")
let tempDes = document.querySelector(".des")
let humidity = document.querySelector("#humidity")
let windSpeed = document.querySelector("#wind-speed")
let showVis = document.querySelector("#show-vis")
let cityName=document.querySelector(".cityName");
let weatherIcon =document.querySelector("#weatherIcon");

searchBtn.addEventListener("click", ()=>{
    checkWeather(inputBox.value);
})

async function checkWeather(city){
    let apiKey="7d3ca2cf9cf0e37c6216ad9ba1aaea16"
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const weatherData= await fetch(url)
    .then((res)=>{
        return res.json();
    })
    .catch((err)=>{
        alert("Here is the access failed!");
    })
    
    temperature.innerHTML= `${Math.round(weatherData.main.temp-273.15)}°C`;
    tempDes.innerHTML= `${(weatherData.weather[0].description).toUpperCase()}`;
    humidity.innerHTML= `${weatherData.main.humidity}%`;
    windSpeed.innerHTML= `${weatherData.wind.speed}Km/H`;
    showVis.innerHTML= `${(weatherData.visibility)/1000}Km`;
    cityName.innerHTML=`${weatherData.name}`;
    let weatherCondition = getweatherIcon(weatherData.weather[0].main);
    weatherIcon.setAttribute("class", `${weatherCondition}`);
    inputBox.value="";
    console.log(weatherData);
}

function getweatherIcon(cond){
    const iconArr={
        Clear:"fa-solid fa-sun",
        Clouds: "fa-solid fa-cloud",
        Smoke : "fa-solid fa-cloud",
        Haze: "fa-solid fa-cloud",
        Mist: "fa-solid fa-cloud",
        Fog: "fa-solid fa-smoge",
        Drizzle:"fa-solid fa-cloud-sun-rain",
        Rain:"fa-solid fa-cloud-rain",
        Thunderstorm: "fa-solid fa-cloud-bolt"

    }

    return iconArr[cond] || "fa-solid fa-sun"
}