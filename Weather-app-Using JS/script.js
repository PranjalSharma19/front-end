const inputBox = document.querySelector('.search-box');
const searchBtn = document.getElementById('search_Btn');
const weatherImage = document.querySelector('.weather-Image');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.description');  
const windspeed = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const RainfallChance = document.querySelector('#Rainfall-chance');
const weather_body = document.querySelector('.weather-body');
const dateTime = document.querySelector('.date-time');

console.log(inputBox, searchBtn, weatherImage, temperature, weatherDescription, windspeed, humidity);

async function checkWeather(city) {
    const apiKey = "4ce2ad7a57924b8cb6c82139250603";
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`;
    const weather_data = await fetch(`${url}`).then(response => response.json());
    console.log(weather_data);

    if (weather_data.error !== undefined) {
        weatherImage.src = './assets/404.png';
        temperature.innerHTML = '404';
        weatherDescription.innerHTML = 'City Not Found';
        document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZf3JACOeMhw_JLs_QYTrxUYN8lc-w5Bp9ig&s')";
        return; // Add return statement to prevent further execution
    }
    
    // Displaying temperature data
    temperature.innerHTML = `${weather_data.current.temp_c}°C`;
    weatherDescription.innerHTML = weather_data.current.condition.text;
    windspeed.innerHTML = `${weather_data.current.wind_kph} km/h`;  
    humidity.innerHTML = `${weather_data.current.humidity}%`;
    RainfallChance.innerHTML = `${weather_data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    weatherImage.src = weather_data.current.condition.icon;

    const date = new Date();    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    dateTime.innerHTML = date.toLocaleDateString('en-US', options);

    // Change background based on weather description
    if (weatherDescription.innerHTML.trim() === 'Sunny') {
        document.body.style.backgroundImage = "url('./assets/sunny.gif')";
    }
    if (weatherDescription.innerHTML === 'Partly cloudy') {
        document.body.style.backgroundImage = "url('https://media.tenor.com/I8LmxHsARk0AAAAM/sunny-bluesky.gif')";
    }
    else if (weatherDescription.innerHTML === 'Rain' || weatherDescription.innerHTML === 'Overcast') {
        document.body.style.backgroundImage = "url('./assets/RAINFALL.gif')";
    } else if (weatherDescription.innerHTML === 'Clear') {
        document.body.style.backgroundImage = "url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDkzM2M3ZDEwbmVodG9oa3lqcmpjZGxzejVzOHltbXFrNGY5YXp1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ivcVZnZAEqhs4/giphy.gif')";
    } else if (weatherDescription.innerHTML === 'Cloudy') {
        document.body.style.backgroundImage = "url('./assets/CLOUDY.gif')";
    } else if (weatherDescription.innerHTML === 'snow') {
        document.body.style.backgroundImage = "url('./assets/SNOWFALL.GIF')";
    } else if (weatherDescription.innerHTML === 'Mist') {
        document.body.style.backgroundImage = "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjM1NnoyZDVoNXNiNHhzYTNxMXJkdGU0OGQxdGN3YmdyZDE2MHRtbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aHNzfAaTKNPFa1P4Fj/giphy.gif')";
    } else {
        document.body.style.backgroundImage = "url('./assets/sunny.gif')";
    }
}

inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (inputBox.value === '') {
            alert('Please Enter a City Name');
            return;
        }
        checkWeather(inputBox.value);
        weather_body.style.display = 'flex';
    }
});

searchBtn.addEventListener('click', () => {
    if (inputBox.value === '') {
        alert('Please Enter a City Name');
        return;
    }
    checkWeather(inputBox.value);
    weather_body.style.display = 'flex';
});





