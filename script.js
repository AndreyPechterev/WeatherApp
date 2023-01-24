const apiKey = 'b3b39897f43d4590a83113937232301';
import conditions from './conditions.js'
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const header = document.querySelector('.header'); 



function removeCard() {
  const prevCard = document.querySelector('.card');
  if (prevCard) prevCard.remove()
}

function showError(errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`
  header.insertAdjacentHTML('afterend', html)
}

function showCard({name, country, temp, condition, img}) {
  const html = `
        <div class="card">
        <div class="card-city">${name} <span>${country}</span></div>
        <div class="card-weather">
          <div class="card-temperature">${temp}<sup>°C</sup></div>
          <img class="card-img" src="${img}">
        </div>
        <div class="card-description">${condition}</div>
        </div>
      `

  header.insertAdjacentHTML('afterend', html)
}

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    const response = await fetch(url)
    const data = response.json()
    return data
}


form.onsubmit = async function(event) {
  event.preventDefault(); 
  let city = input.value.trim();
  input.value = ""

  const data = await getWeather(city)

  if (data.error) {

    removeCard();

    showError(data.error.message)

  } else {

      removeCard();

      const info = conditions.find(el => el.code === data.current.condition.code)
      
      const condition = data.current.isDay ? info.languages[23]['day_text'] : info.languages[23]['night_text']

      const weatherData = {
        name: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: condition,
        img: data.current.condition.icon
      }

      showCard(weatherData)
    }

}

