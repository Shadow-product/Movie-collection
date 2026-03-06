// main.js файл основной для логики главной страницы
import { getMovies, saveMovies } from './storage.js';

// class="movie-list" | поиск карточек фильмов (т.к атрибут class)
const movieList = document.querySelector('.movie-list');

// class="movie-actions" | кнопка добавить глобальная отдельная (т.к атрибут class)
const actionsButtonAdd = document.querySelector('.movie-actions');

// id="hamburger" | поиск hamburger-menu (т.к атрибут id)
const hamburger = document.querySelector('#hamburger-menu');

// id="nav-links" | поиск nav-links (т.к атрибут id)
const navLinks = document.querySelector('#nav-links'); 

// поиск элемента <main></main> (без id и class)
const main = document.querySelector('main');

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
      id: 1741260000000,  
      title: "HELLFIRE",
      year: 2026,
      genre: "Боевик",
      rating: "★★★★★★★",
      watched: false,
      poster: "assets/images/poster1.webp"  
    },
    {   
      id: 1741260000001,  
      title: "MINECRAFT",
      year: 2025,
      genre: "Комедия",
      rating: "★★★★★",
      watched: false,
      poster: "assets/images/poster2.webp"  
    },
    { 
      id: 1741260000002,  
      title: "Годзила и Конг\nНовая империя",
      year: 2024,
      genre: "Фантастика",
      rating: "★★★★★★★",
      watched: false,
      poster: "assets/images/poster3.webp" 
    },
];

// если localStorage пустой ИЛИ массив пустой сохраняются тестовые фильмы
// надежный вариант проверки наличие ключа 'movies' и защита от случайных перезаписей данных
if (!localStorage.getItem('movies')) {
    saveMovies(testMovies);
    console.log("Сохранение тестовых данных: ", getMovies());
}   

    // вывод в консоль текущего массива данных для проверки отладки (дополнительно)
    const movies = getMovies(); // читаются данные из localStorage
    console.log("Текущие фильмы: ", movies);

    // создание кнопки для добавления фильма как отдельный блочный элемент
    const globalButtonAdd = document.createElement('button');
    globalButtonAdd.classList.add('btn-add');
    globalButtonAdd.type = "button";
    globalButtonAdd.textContent = 'Добавить фильм';

    // событие на переход страницы form.html
    globalButtonAdd.addEventListener('click', () => {
        window.location.href = "form.html";
    });

    // добавление кнопки добавить в отдельный блочный элемент и
    // проверка на существования элемента
    if (actionsButtonAdd) {
        actionsButtonAdd.appendChild(globalButtonAdd); 
    }

    // функция отрисовывает все элементы из массива
    function renderItems() {
        let movies = getMovies();

        if (!movieList) {
          if (main) {
            const info = document.createElement('p');
            info.textContent = 'Каталог фильмов доступен только на главной странице. Перейдите туда, чтобы просмотреть фильмы в каталоге..';
            info.classList.add("info-message");
            main.appendChild(info);
            }
            return;
        }

        // также при полном удалении всех карточек фильма проверка на длину массива
        // тестовые данные сохраняются для отладки (дополнительно) - movies.length === 0
        if (movies.length === 0) {
         saveMovies(testMovies);
         movies = getMovies();
         console.log("Восстановлены тестовые данные:", movies);
        }

          movieList.innerHTML = ""; // очищается контейнер перед отрисовкой

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
        label.append(checkbox, " просмотрено/не просмотрено");

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