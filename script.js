const container = document.querySelector('.countries-container')
const searchInput = document.querySelector('.search-input')
const dropdownSelect = document.querySelector('.dropdown-select')
const themeChanger = document.querySelector('.theme-switcher')

let allCountries = []

fetch('https://restcountries.com/v3.1/all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json()
    })
    .then(data => {
        allCountries = data
        renderCountryCard(allCountries)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });



function renderCountryCard(countries) {
    container.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('a')
        countryCard.classList.add("country-card")
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.innerHTML = ` 
      <img src=${country.flags.svg} alt="${country.name.common}">
      <div class="card-text">
      <h3 class="card-title">${country.name.common}</h3>
      <p><b>Population: </b> ${country.population.toLocaleString('en-IN')}</p>
      <p><b>Region: </b> ${country.region}</p>
      <p><b>Capital: </b> ${country.capital ? country.capital : ' '}</p>
`
        container.appendChild(countryCard)
    })
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase()
    //console.log(searchTerm);

    const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm) &&
        country.region.toLowerCase().includes(dropdownSelect.value.toLowerCase())
    );

    console.log(filteredCountries);
    renderCountryCard(filteredCountries)
})

dropdownSelect.addEventListener('change', () => {
    const selectRegion = dropdownSelect.value

    if (selectRegion === "") {
        renderCountryCard(allCountries);  // Show all countries when "All" is selected
    } else {
        // Filter based on selected region
        const filteredCountries = allCountries.filter(country =>
            country.region.toLowerCase() === selectRegion.toLowerCase()
        );

        renderCountryCard(filteredCountries);  // Render filtered countries
    }


})

const bodyElement = document.body;

// Assuming bodyElement and themeChanger are already defined

function updateThemeButton() {
    if (document.body.classList.contains('light-theme')) {
        themeChanger.innerHTML = `<i class="fa-regular fa-moon"></i> Dark Mode`;
    } else {
        themeChanger.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
    }
}

function setTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
    updateThemeButton();
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    setTheme(savedTheme);
});

themeChanger.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light-theme') ? 'dark-theme' : 'light-theme';
    setTheme(newTheme);
});


const clear = document.querySelector('.cross')

function clearInput() {
    searchInput.value = ''
    renderCountryCard(allCountries)
}

clear.addEventListener('click', clearInput)