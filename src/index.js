// import { fetchBreeds } from "./api_breed_cat";
// import { createMarkup } from "./markup_breeds_list";

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorMessage = document.createElement('p');
localStorage.clear()

const API_KEY = 'live_eVFX0N3DgZf8XV7EZFhS9HUEtK1lVasKqGqyQWPZoGDlSDnCwXDvn4ocqwmdZP1e';
// const API_LINK = 'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME'
const BASE_URL = 'https://api.thecatapi.com/v1';
window.addEventListener('load', onLoadPage);
function onLoadPage(evt) {
  fetchBreeds()
    .then(data => (
      select.innerHTML = createMarkup(data)
    ))
    .catch(onErrorPage);
}



function fetchBreeds() {
  // fetch(`${BASE_URL}/images/search?limit=10&breed_ids=beng&api_key=${API_KEY}`);
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(resp => {
      if (!resp.ok) {
        // throw new Error(resp.statusText)
        // document.body.innerHTML = createMarkupError();
        
      }
      return resp.json();
    });
};


function createMarkup(arr) {
  return arr.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
}
//================

select.addEventListener('change', onSelect);

function onSelect(evt) {
  window.removeEventListener('load', onLoadPage)
  const breed_id = select.value
  fetchCat(breed_id).then(data =>
    data.map(({ url, breeds }) => {
      catInfo.innerHTML = createMarkupBreed(
        url, breeds[0].name, breeds[0].description, breeds[0].temperament)
    })
  )
}

function fetchCat(breed) {
  return fetch(`${BASE_URL}AAA/images/search?breed_ids=${breed}&api_key=${API_KEY}`)
    .then(resp => {
      if (!resp.ok) {
        // throw new Error(resp.statusText)
        catInfo.innerHTML = "<p>Oops! Something went wrong! Try reloading the page!</p>";
      }
      return resp.json();
    }).catch(onErrorBreed);
}

function createMarkupBreed(url, name, description, temperament) {
  return (
    ` <img src="${url}" alt="${name}"   class="image"/>
    <div class="cat-description">
    <h2 class="breed-title">${name}</h2>
    <p class="breed-description">${description}</p>
    <div class="temperament">
    <h3 class="temperament-title">Temperament:</h3>
    <p class="temperament-description">${temperament}</p>
    </div>
    </div>`
  )
}
function onErrorPage() {
  document.body.innerHTML = `<p class="error">Oops! Something went wrong! Try reloading the page!</p>`;
}
function onErrorBreed() {
  catInfo.innerHTML = `<p class="error">Oops! Something went wrong! Try reloading the page!</p>`;
}





