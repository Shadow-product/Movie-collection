// main.js файл основной для логики главной страницы
// тестовый массив для отладки 
const movies = [
    { 
      title: "Фильм 1",
      year: 2026,
      genre: "Боевик",
      rating: "★★★★★",
      watched: false,
      poster: "assets/images/poster1.webp"  
    },
    {
      title: "Фильм 2",
      year: 2025,
      genre: "Комедия",
      rating: "★★★☆☆",
      watched: true,
      poster: "assets/images/poster2.webp"  
    },
    { 
      title: "Фильм 3",
      year: 2024,
      genre: "Фантастика",
      rating: "★★★★☆",
      watched: false,
      poster: "assets/images/poster3.webp" 
    },
];

// class="movie-list" | поиск всех карточек фильмов (т.к атрибут class)
const movieList = document.querySelector('.movie-list'); 

// функция отрисовывает все элементы из массива
function renderItems() {
    movieList.innerHTML = ""; // очищается контейнер перед отрисовкой

    // перебор массива через цикл forEach
    movies.forEach(({ title, year, genre, rating, watched, poster }, index) =>  {
        const card = document.createElement('div');
        card.className = "movie-card";

        // элементы создаются через createElement потому что 
        // создается постер (фото) безопасно без innerHTML
        const img = document.createElement('img');
        img.setAttribute('src', poster); // (имя, значения)
        img.setAttribute('alt', title);
        img.className = "poster";

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
        label.append(" просмотрено/не просмотрено");

        // создаются кнопки  
        const buttonWatch = document.createElement('button');
        buttonWatch.className = "btn-watch"; 
        buttonWatch.type = "button";
        buttonWatch.textContent = 'Отметка о просмотре';

        const buttonAdd = document.createElement('button');
        buttonAdd.className = "btn-add";
        buttonAdd.type = "button";
        buttonAdd.textContent = 'Добавить';

        // событие на переход страницы form.html

        const buttonDelete = document.createElement('button');
        buttonDelete.className = "btn-delete";
        buttonDelete.type = "button";
        buttonDelete.textContent = 'Удалить';

        buttonDelete.addEventListener("click", () => {
            if (confirm(`Удалить "${title}"?`)) {
                movies.splice(index, 1); // удаляется фильм из массива
                renderItems();           // перерисовывается массив
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
            buttonAdd,
            buttonDelete 
        );

        movieList.appendChild(card);
    });
}
renderItems();