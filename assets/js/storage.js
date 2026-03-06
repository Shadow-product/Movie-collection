// storage.js файл для работы с localStorage

// работа с главной страницей, страницей с формой и о проекте cохранение в localStorage
// именованный экспорт функций getMovies и saveMovies
export const getMovies = () => { // чтение данных в локальном хранилище
  return JSON.parse(localStorage.getItem('movies')) || [];
};

export const saveMovies = (movies) => { // запись данных в локальном хранилище 
  localStorage.setItem('movies', JSON.stringify(movies));
};

// переключение темы theme.js сохранение в localStorage
// именнованый экспорт функции getTheme и saveTheme
export const getTheme = () => {
  return localStorage.getItem('theme') || 'light';
};

export const saveTheme = (theme) => {
  localStorage.setItem('theme', theme);
};