const locationInput = document.getElementById("location__input");
const cityName = document.getElementById("city__name");
const botaoBuscar = document.getElementById("location__button");

const apiKey = "bc790cfd5966c0161b4fe77faf5c2a76";


//visual
if (locationInput.value === "") {
  cityName.innerHTML = "Digite sua localização";
}

function cityNameChange(location) {
    cityName.innerHTML = location;
}
//

//funcao pra enviar o input
function enviar() {
  console.log(locationInput.value);
  locationInput.blur();
  cityNameChange(locationInput.value);
  updateWeather(locationInput.value)
  locationInput.value = "";
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (locationInput.value.trim() !== "") {
      enviar();
    }
  }
});

botaoBuscar.addEventListener("click", () => {
  if (locationInput.value.trim() !== "") {
    enviar();
  }
});
//

//convertendo a cidade registrada em lat e long
async function cidadePraLatLong(location) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${location}&format=json`,
    );

    const data = await response.json();

    if (data.length > 0) {
      const lat = data[0].lat;
      const lon = data[0].lon;
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      return { lat, lon };
    } else {
      console.error("Localização não encontrada");
      return;
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return;
  }
}
//


//pegando o clima
async function fetchWeather(lat, lon, apiKey) {
 const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

  const response = await fetch(apiUrl);

  console.log(await response.json());
  
  return response.json();
}
//


//atualizando o clima
async function updateWeather(city) {
  const coordenadas = await cidadePraLatLong(city); 
  if(!coordenadas) {    //quando n acha a cidade
    console.error("Não foi possível obter as coordenadas para a cidade fornecida.");
    return;
  }
  const weather = await fetchWeather(coordenadas.lat, coordenadas.lon, apiKey);
  
  if (!weather) {   //quando n acha o clima
    console.error("Erro ao obter os dados do clima");
    return;
  }
  console.log(weather);
  
}
