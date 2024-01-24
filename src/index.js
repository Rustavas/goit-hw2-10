// import { fetchBreeds } from "./api_breed_cat";
// import { createMarkup } from "./markup_breeds_list";
localStorage.clear()
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');


window.addEventListener('load', () => {
  setTimeout(() => { loader.remove() }, 1000)
})
function removeLoader() {
  const preLoader = document.querySelector('.loader');
  setTimeout(() => { preLoader.remove() }, 3000)
}


const API_KEY = 'live_eVFX0N3DgZf8XV7EZFhS9HUEtK1lVasKqGqyQWPZoGDlSDnCwXDvn4ocqwmdZP1e';
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
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
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
  select.insertAdjacentHTML("beforebegin", '<span class="loader"></span>')
  return fetch(`${BASE_URL}/images/search?breed_ids=${breed}&api_key=${API_KEY}`)
    .then(resp => {
      if (!resp.ok) {
        catInfo.innerHTML = "<p>Oops! Something went wrong! Try reloading the page!</p>";
      }
      removeLoader()
      return resp.json();
    }).catch(onErrorBreed)
    .finally(
    );
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
  document.body.innerHTML = `<p class="error" >Oops! Something went wrong! Try reloading the page!</p>`;
}

function onErrorBreed() {
  catInfo.innerHTML = `<p class="error" >Oops! Something went wrong! Try reloading the page!</p>`;
}






