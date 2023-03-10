// імпортуємо функцію з lodash, яка дозволяє обмежити частоту виконання функції
import throttle from 'lodash.throttle';
// задаємо ключ, за яким будуть зберігатися дані форми в локальному сховищі
const STORAGE_KEY = 'feedback-form-state';
// знаходимо форму зворотного зв'язку
const form = document.querySelector('.feedback-form');
// знаходимо поле введення тексту повідомлення
const textarea = document.querySelector('.feedback-form textarea');
// знаходимо поле введення електронної пошти
const input = document.querySelector('input');
const formData = {}; // об'єкт, в якому будуть зберігатися дані форми
populateTextarea(); // заповнюємо поля форми даними з локального сховища (якщо такі є)
// Додаємо обробник події на відправку форми
form.addEventListener('submit', onFormSubmit);
// Додаємо обмежувач частоти виконання функції на введення тексту повідомлення
form.addEventListener('input', throttle(onTextareaInput, 500));
// Додаємо обробник події на введення даних у поля форми
form.addEventListener('input', evt => {
  formData[evt.target.name] = evt.target.value; // зберігаємо дані у формі в об'єкт formData
});
// Обробник події на введення тексту повідомлення
function onTextareaInput(evt) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault(); // зупиняємо дійсну відправку форми на сервер
  evt.target.reset(); // очищаємо поля форми
  const objData = JSON.parse(localStorage.getItem(STORAGE_KEY)); // отримуємо дані форми з локального сховища
  localStorage.removeItem(STORAGE_KEY); // видаляємо дані з локального сховища
  console.log(formData); // виводимо дані з форми у консоль
}
// Функція для заповнення полів форми даними з локального сховища
function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY)); // отримуємо дані форми

  if (savedMessage === null) {
    return; // якщо немає даних у локальному сховищі, виходимо з функції
  }
  textarea.value = savedMessage['message'] || ''; // заповнюємо поле введення тексту повідомлення
  input.value = savedMessage['email'] || ''; // заповнюємо поле введення електронної пошти
}
