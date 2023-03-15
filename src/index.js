import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('input#search-box');

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
    console.log('countries', countries);
  } catch (error) {
    console.log(error);
  }
};

const onChange = event => {
  const name = event.target.value.trim();
  fetchCountries(name);
};

searchBox.addEventListener('input', debounce(onChange, DEBOUNCE_DELAY));
