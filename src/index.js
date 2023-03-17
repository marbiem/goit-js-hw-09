import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const fetchCountries = async name => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    );
    if (response.status === 404) {
      Notiflix.Notify.failure('Oops, there is no country with that name.', {
        timeout: 6000,
      });
    }
    const countries = await response.json();
    if (countries.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.',
        {
          timeout: 6000,
        }
      );
    }
    if (countries.length >= 2 && countries.length <= 10) {
      createCountriesList(countries);
    }
    if (countries.length === 1) {
      createCountryInfo(countries[0]);
    }
    console.log('countries', countries);
  } catch (error) {
    console.log(error);
  }
};

const onChange = event => {
  const name = event.target.value.trim();
  fetchCountries(name);
};

const createCountriesList = countries => {
  countryList.textContent = '';
  countries.forEach(country => {
    const countryListElement = document.createElement('li');
    countryListElement.append();
    countryList.insertAdjacentHTML(
      'beforeend',
      `<li>
        <img src="${country.flags.svg}" alt="${country.name.official}" height="20" />
        ${country.name.official}
      </li>`
    );
  });
};

const createCountryInfo = country => {
  countryList.textContent = '';
  // countryInfo.insertAdjacentHTML(
  //   'beforeend',
  //   `
  //     <img src="${country.flags.svg}" alt="${country.name.official}" height="50" />
  //     ${country.name.official}
  //     ${country.capital}
  //     ${country.population}
  //     ${country.languages}
  //   `
  // );
};

searchBox.addEventListener('input', debounce(onChange, DEBOUNCE_DELAY));
