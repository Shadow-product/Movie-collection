// form.js файл для логики страницы с формой
import { getMovies, saveMovies } from './storage.js';

// id="movie-form" | поиск формы (т.к атрибут id)
const movieForm = document.querySelector('#movie-form');
// id="cancel" | поиск кнопки переход на главную
const cancelButton = document.querySelector('#cancel');

function goHome() {
    // добавление элемента и сохранение фильма в localStorage
  window.location.href = "index.html";
}

movieForm.addEventListener('submit', (event) => {
    event.preventDefault(); // отмена стандартной отправки
    // вызов функции добавление и сохранение фильма
    goHome(); // переход после сохранения

    // получение значения
    const title = document.querySelector("#title").value;
    const yearValue = document.querySelector("#year").value;
    const genre = document.querySelector("#genre").value;
    const ratingValue = document.querySelector("#rating").value;
    const watched = document.querySelector("#watched").checked;
    const poster = document.querySelector("#poster").value;

    // преобразования в числовой тип данных год и рейтинг фильма 
    const year = Number(yearValue);
    const rating = Number(ratingValue);

    // Валидация через JavaScript
    if (!title || !yearValue || !genre || !ratingValue || !poster) {
        alert("Заполните все поля!");
    return;
}

    if (year < 1900 || year > 2026) {
        alert("Введите корректный год");
    return;
}

    if (rating < 1 || rating > 10) {
        alert("Рейтинг должен быть от 1 до 10");
    return;
}

    // метод endsWith проверяет на окончания строки (пример: .webp)
    if (!poster.endsWith(".jpg") && !poster.endsWith(".jpeg") && !poster.endsWith(".png") && !poster.endsWith(".webp")) {
        alert("Постер должен быть прямой ссылкой на изображение (.jpg, .jpeg, .png или .webp)!");
    return;
}

    // добавление звезд в рейтинге через цикл for
    let stars = ""; 
    for (let i = 0; i < rating; i++ ) {
        stars = stars + "★"; // добавляется одна звезда
    }

  // Создается объект фильма с уникальным id
  const newMovie = {
    id: Date.now(), // уникальный идентификатор
    title,
    year,
    genre,
    rating: stars,
    watched,
    poster
  };

  // Сохраняется в localStorage (локальное хранилище)
  const movies = getMovies(); // получение текущего массива фильмов
  movies.push(newMovie); // добавляется в конец массива
  saveMovies(movies); // сохранение массива обратно в localStorage
});

// вызов функции добавление и сохранение фильма на обработчик события "click"
cancelButton.addEventListener('click', goHome);