// main.js файл основной для логики главной страницы
// class="movie-list" | поиск карточек фильмов (т.к атрибут class)
const movieList = document.querySelector('.movie-list');
// class="footer-actions" | кнопка добавить глобальная отдельная (т.к атрибут class)
const actionsButtonAdd = document.querySelector('.movie-actions');

// тестовый массив для отладки 
const movies = [
    { 
      title: "HELLFIRE",
      year: 2026,
      genre: "Боевик",
      rating: "★★★★★",
      watched: false,
      poster: "assets/images/poster1.webp"  
    },
    {
      title: "MINECRAFT",
      year: 2025,
      genre: "Комедия",
      rating: "★★★☆☆",
      watched: false,
      poster: "assets/images/poster2.webp"  
    },
    { 
      title: "Годзила и Конг\nНовая империя",
      year: 2024,
      genre: "Фантастика",
      rating: "★★★★☆",
      watched: false,
      poster: "assets/images/poster3.webp" 
    },
];

        const globalButtonAdd = document.createElement('button');
        globalButtonAdd.classList.add("btn-add");
        globalButtonAdd.type = "button";
        globalButtonAdd.textContent = 'Добавить фильм';

        // событие на переход страницы form.html
        globalButtonAdd.addEventListener("click", () =>{
            window.location.href = "form.html";
        });

        // добавление кнопки добавить в отдельный блочный элемент
        actionsButtonAdd.appendChild(globalButtonAdd); 


    // функция отрисовывает все элементы из массива
    function renderItems() {
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
        label.appendChild(checkbox);
        label.append("просмотрено/не просмотрено");

        // элементы создаются через createElement потому что безопасно без innerHTML
        // создается постер (фото)
        const img = document.createElement('img');
        img.setAttribute('src', poster); // (имя, значения)
        img.setAttribute('alt', title);
        img.classList.add("poster");

        // обработчик на чекбокс
        checkbox.addEventListener("change", () => {
            // проверяется тестовый массив для отладки
            // по индексу watched в массиве movies
            movies[index].watched = checkbox.checked;
            card.classList.toggle("highlight", checkbox.checked);
            console.log(`${title} ${checkbox.checked ? "просмотрен" : "не просмотрен"}`);
            console.log(card.classList.contains("highlight"));
            renderItems(); // перерисовывается (обновляется) массив
        });


        // создаются кнопки  
        const buttonWatch = document.createElement('button');
        buttonWatch.classList.add("btn-watch"); 
        buttonWatch.type = "button";
        buttonWatch.textContent = 'Отметка о просмотре';

        // модальное окно для обработчика события click (отметка о просмотре)
        buttonWatch.addEventListener("click", () => {
            alert(`${title} отмечен как просмотренный!`);
        });

        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add("btn-delete");
        buttonDelete.type = "button";
        buttonDelete.textContent = 'Удалить фильм';

        // обработчик на кнопку удалить фильм
        buttonDelete.addEventListener("click", () => {
            if (confirm(`Удалить "${title}"?`)) {
                movies.splice(index, 1); // удаляется фильм из массива
                renderItems();           // перерисовывается (обновляется) массив
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
renderItems();