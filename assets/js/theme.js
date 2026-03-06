// theme.js файл для логики с переключением темы
import { getTheme, saveTheme } from './storage.js';

// id="theme-toggle" | поиск темы переключателя (т.к атрибут id)
const themeToggle = document.querySelector('#theme-toggle');

// переключение темы светлой и тёмной
// восстановление темы при перезагрузке
const savedTheme = getTheme();
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = 'Светлая тема';
}

// переключение темы через обработчик события click
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    // проверка наличие css-класса dark-theme
    if (document.body.classList.contains('dark-theme')) {
      themeToggle.textContent = 'Светлая тема';
      saveTheme('dark'); // включить светлую тему
    } else {
      themeToggle.textContent = 'Тёмная тема';
      saveTheme('light'); // включить тёмную тему
    }
});