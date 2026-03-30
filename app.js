document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        return showAlert('Você precisa digitar uma cidade...');
    }

    const apiKey = '7762cffeeabd70453beaa75f31a66bce';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showAlert('Cidade encontrada!');
    } else {
        showAlert('Cidade não encontrada...');
    }
});

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}