// Імпортуємо клас Player з бібліотеки Vimeo Player API та функцію throttle з Lodash для оптимізації виклику функції onPlay
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
// Отримуємо iframe відео з DOM та створюємо новий об'єкт Player з використанням iframe.
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
// Встановлюємо ключ для зберігання часу відтворення в Local Storage.
const STORAGE_KEY = 'videoplayer-current-time';
// Функція, яка зберігає поточний час відтворення в Local Storage при кожному оновленні часової мітки відео.
const onPlay = function (data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.seconds));
};
// Встановлюємо прослуховувач події timeupdate на об'єкті Player та застосовуємо функцію throttle до onPlay, щоб зменшити частоту виклику функції.
player.on('timeupdate', throttle(onPlay, 1000));
// Отримуємо збережений час відтворення з Local Storage та встановлюємо його на об'єкті Player при запуску відтворення відео.
const saveTime = localStorage.getItem(STORAGE_KEY);
if (saveTime) player.setCurrentTime(saveTime).then(function (seconds) {});
