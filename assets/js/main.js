// main.js файл основной для логики главной страницы
import { getMovies, saveMovies } from './storage.js';

// class="movie-list" | поиск карточек фильмов (т.к атрибут class)
const movieList = document.querySelector('.movie-list');

// class="footer-actions" | кнопка добавить глобальная отдельная (т.к атрибут class)
const actionsButtonAdd = document.querySelector('.movie-actions');

// id="hamburger" | поиск hamburger-menu (т.к атрибут id)
const hamburger = document.querySelector('#hamburger');

// id="hamburger" | поиск nav-links (т.к атрибут id)
const navLinks = document.querySelector('#nav-links'); 

// проверка условия на hamburger-menu с обработчиком события click
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        // если класса нету добавляет
        // если класс есть удаляет
        navLinks.classList.toggle('active');
    });
}

// тестовый массив для отладки 
const testMovies = [
    { 
      title: "HELLFIRE",
      year: 2026,
      genre: "Боевик",
      rating: "★★★★★★★",
      watched: false,
      poster: "assets/images/poster1.webp"  
    },
    {   
      title: "MINECRAFT",
      year: 2025,
      genre: "Комедия",
      rating: "★★★★★",
      watched: false,
      poster: "assets/images/poster2.webp"  
    },
    { 
      title: "Годзила и Конг\nНовая империя",
      year: 2024,
      genre: "Фантастика",
      rating: "★★★★★★★",
      watched: false,
      poster: "assets/images/poster3.webp" 
    },
];

// если localStorage пустой сохраняются тестовые фильмы
if (getMovies().length === 0) {
    saveMovies(testMovies);
}

    const globalButtonAdd = document.createElement('button');
    globalButtonAdd.classList.add('btn-add');
    globalButtonAdd.type = "button";
    globalButtonAdd.textContent = 'Добавить фильм';

    // событие на переход страницы form.html
    globalButtonAdd.addEventListener('click', () => {
        window.location.href = "form.html";
    });

    // добавление кнопки добавить в отдельный блочный элемент
    actionsButtonAdd.appendChild(globalButtonAdd); 


    // функция отрисовывает все элементы из массива
    function renderItems() {
    movieList.innerHTML = ""; // очищается контейнер перед отрисовкой

    const movies = getMovies(); // читаются данные из localStorage

    // перебор массива через цикл forEach
    movies.forEach(({ title, year, genre, rating, watched, poster }, index) =>  {
        const card = document.createElement('div');
        card.classList.add("movie-card");

        // создается заголовок (h2) и описание (p)
        const header2 = document.createElement('h2');
        header2.textContent = title;
        
        const paragraphYear = document.createElement('p');
        paragraphYear.textContent = `Год: ${year}`;

        const paragraphGenre = document.createElement('p');
        paragraphGenre.textContent = `Жанр: ${genre}`;

        const paragraphRating = document.createElement('p');
        paragraphRating.textContent = `Рейтинг: ${rating}`;

        // создается чекбокс
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = watched;
        label.appendChild(checkbox);
        label.append("просмотрено/не просмотрено");

        // элементы создаются через createElement потому что безопасно без innerHTML
        // создается постер (фото)
        const img = document.createElement('img');
        img.setAttribute('src', poster); // (имя, значения)
        img.setAttribute('alt', title);
        img.classList.add("poster");

        // обработчик на чекбокс
        checkbox.addEventListener('change', () => {
            // проверяется тестовый массив для отладки
            // по индексу watched в массиве movies
            movies[index].watched = checkbox.checked;
            card.classList.toggle("highlight", checkbox.checked);
            console.log(`${title} ${checkbox.checked ? "просмотрен" : "не просмотрен"}`);
            console.log(card.classList.contains('highlight'));
            saveMovies(movies); // сохраняются изменение
            renderItems(); // перерисовывается (обновляется) массив
        });

        // создаются кнопки  
        const buttonWatch = document.createElement('button');
        buttonWatch.classList.add('btn-watch'); 
        buttonWatch.type = "button";
        buttonWatch.textContent = 'Отметка о просмотре';

        // модальное окно для обработчика события click (отметка о просмотре)
        buttonWatch.addEventListener('click', () => {
            alert(`${title} отмечен как просмотренный!`);
        });

        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('btn-delete');
        buttonDelete.type = "button";
        buttonDelete.textContent = 'Удалить фильм';

        // обработчик на кнопку удалить фильм
        buttonDelete.addEventListener('click', () => {
            if (confirm(`Удалить "${title}"?`)) {
                movies.splice(index, 1); // удаляется фильм из массива
                saveMovies(movies); // сохраняются изменение
                renderItems(); // перерисовывается (обновляется) массив
            }
        });

        // добавление элемента в DOM (читабельный вариант)
        card.append(
            img,
            header2,
            paragraphYear,
            paragraphGenre,
            paragraphRating,
            label,
            buttonWatch,
            buttonDelete 
        );

        // добавление всех карточек в конец
        movieList.appendChild(card);

    });
}

// перерисовывается (обновляется) массив
renderItems();