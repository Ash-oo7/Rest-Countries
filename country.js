const countryName = new URLSearchParams(location.search).get('name');
const flagImg = document.querySelector('.counrtry-details img')
const countryTitle = document.querySelector('.details-text-container h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.countries-list')

const backBtn = document.querySelector('.back-button')
backBtn.addEventListener('click', () => {
    history.back();
})

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json()
    })
    .then(([country]) => {
        flagImg.src = country.flags.svg;
        flagImg.alt = `${country.name.common} flag`;

        countryTitle.innerText = country.name.common;

        population.innerText = country.population.toLocaleString('en-IN')

        region.innerText = country.region

        topLevelDomain.innerText = country.tld.join(', ')

        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        } else {
            nativeName.innerText = country.name.common;
        }

        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(', ')
        }

        if (country.capital) {
            capital.innerText = country.capital;
        }

        if (country.languages) {
            languages.innerText = Object.values(country.languages).slice(0, 2).join(', ')
        }

        if (country.subregion) {
            subRegion.innerText = country.subregion
        }

        if (country.borders) {
            country.borders.forEach(border => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then(response => { return response.json() })
                    .then(([borderCountry]) => {
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.innerText = borderCountry.name.common
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        borderCountries.append(borderCountryTag)
                    })
            });
        }

    })


const themeChanger = document.querySelector('.theme-switcher')


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


