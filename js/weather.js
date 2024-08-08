const wrapper = document.querySelector('.wrapper')
const search = document.querySelector('.search button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

function displayWeather (json) {
    const image = document.querySelector('.weather-box img')
    const temperature = document.querySelector('.weather-box .temperature')
    const description = document.querySelector('.weather-box .description')
    const humidity = document.querySelector('.weather-details .humidity span')
    const wind = document.querySelector('.weather-details .wind span')
    switch (json.weather[0].main) {
        case 'Clear':
            image.src = 'images/clear.png';
            break;
        case 'Clouds':
            image.src = 'images/cloud.png';
            break;
        case 'Mist':
            image.src = 'images/mist.png';
            break;
        case 'Rain':
            image.src = 'images/rain.png';
            break;
        case 'Snow':
            image.src = 'images/snow.png';
            break;
        default:
            image.src = 'images/cloud.png';
            break;
    }
    temperature.innerHTML = `${parseInt(json.main.temp)}°C`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`
}

window.addEventListener('load', () => {
    const savedWeather = localStorage.getItem('weatherData');
    if (savedWeather) {
        const weatherData = JSON.parse(savedWeather);
        displayWeather(weatherData);
        wrapper.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');
    }
});

search.addEventListener('click', () => {
    const APIKey = '7effe4a989e79265c4f48ee8c8105fa2';
    const city = document.querySelector('.search input').value;
    if (city == '') {
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404') {
                wrapper.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');  
                error404.classList.add('active');
                return;
            }
            wrapper.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            localStorage.setItem('weatherData', JSON.stringify(json));
            
            displayWeather(json);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
});
