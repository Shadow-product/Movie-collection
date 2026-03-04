// storage.js файл для работы с localStorage
// именованный экспорт функций getMovies и saveMovies
export const getMovies = () => { // чтение данных в локальном хранилище
  return JSON.parse(localStorage.getItem("movies")) || [];
};

export const saveMovies = (movies) => { // запись данных в локальном хранилище 
  localStorage.setItem("movies", JSON.stringify(movies));
};