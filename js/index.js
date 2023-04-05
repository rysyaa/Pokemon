// Import stylesheets
// import './style.css';

// Асинхронность, промисы и HTTP.  Домашняя работа

// Задание №1
// Создать программу - список покемонов.

// Пример:
// Bulbasaur
// Ivysaur
// Venusaur
// Charmander
// Charmeleon
// Charizard
// Squirtle
// … и т.п.

// При клике на имя покемона, показать рядом (в соседнем div-е) или во всплывающем
// окне информацию об этом покемоне, например:

// Имя: Charmeleon
// Тип: fire
// Рост: 11
// Вес: 190
// Изображение покемона (дополнительно)

// Указания:
// Список покемонов (первые 20 штук) получить через запрос к API:
// https://pokeapi.co/api/v2/pokemon/
// Информацию о каждом покемоне получать через запрос к API:
// https://pokeapi.co/api/v2/pokemon/{id}/
// где {id} - номер покемона
// Подсказка об используемых ключах результата
// (предположим что полученный объект у вас лежит в переменной result)
// Изображение: result.sprites.front_default
// Имя: result.name
// Тип: массив result.types. Из каждого элемента массива можно взять только type.name
// Рост: result.height
// Вес: result.weight

// Дополнительно:
// Используя ссылку на следующую страницу в результате (ссылку на API следующих
// результатов) реализовать пагинацию (постраничный вывод) в программе, т.е.:
// На клик по ссылке “Next” делать запрос на следующие 20 штук, заменять текущий список.
// Реализовать “Previous” и “Next” - возможность возвращаться на страницу ранее

// ! ================================================================================================================

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonListElement = document.getElementById('pokemon-list');
const pokemonInfoElement = document.getElementById('pokemon-info');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let currentPageUrl = apiUrl;

// Функция для загрузки списка покемонов по URL
async function loadPokemonList(url) {
  const response = await fetch(url);
  const data = await response.json();
  const pokemonList = data.results;
  for (let pokemon of pokemonList) {
    const listItem = document.createElement('button');
    listItem.innerText = pokemon.name;
    listItem.addEventListener('click', () => {
      loadPokemonInfo(pokemon.url);
    });
    pokemonListElement.appendChild(listItem);
  }
  setPaginationUrls(data.previous, data.next);
}

// Функция для загрузки информации о покемоне по URL
async function loadPokemonInfo(url) {
  const response = await fetch(url);
  const data = await response.json();
  const infoHtml = `
    <h2>${data.name}</h2>
    <img src="${data.sprites.front_default}">
    <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>
    <p>Height: ${data.height}</p>
    <p>Weight: ${data.weight}</p>
  `;
  pokemonInfoElement.innerHTML = infoHtml;
}

// Функция для установки URL для пагинации
function setPaginationUrls(previousUrl, nextUrl) {
  prevButton.disabled = !previousUrl;
  nextButton.disabled = !nextUrl;
  currentPageUrl = apiUrl;
  if (nextUrl) {
    currentPageUrl = nextUrl;
  } else if (previousUrl) {
    currentPageUrl = previousUrl;
  }
}

// Загрузка первой страницы покемонов
loadPokemonList(currentPageUrl);

// Добавление обработчиков клика на кнопки пагинации
prevButton.addEventListener('click', () => {
  loadPokemonList(currentPageUrl);
});

nextButton.addEventListener('click', () => {
  loadPokemonList(currentPageUrl);
});