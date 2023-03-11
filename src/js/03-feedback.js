// імпортуємо функцію з lodash, яка дозволяє обмежити частоту виконання функції
import throttle from 'lodash.throttle';
// задаємо ключ, за яким будуть зберігатися дані форми в локальному сховищі
const STORAGE_KEY = 'feedback-form-state';
// знаходимо форму зворотного зв'язку
const form = document.querySelector('.feedback-form');
// знаходимо поле введення тексту повідомлення
const textarea = document.querySelector('.feedback-form textarea');
// знаходимо поле введення електронної пошти
const input = document.querySelector('.feedback-form input[type="email"]');
// Заповнення форми збереженими даними, якщо вони є
populateFormFields();
// Додавання обробників подій на форму
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));
// Обробник вводу даних у форму
function onFormInput(evt) {
  // Отримання збережених даних або створення порожнього об'єкту, якщо збережених даних немає
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  // Додавання/оновлення даних у формі
  formData[evt.target.name] = evt.target.value;
  // Збереження даних у localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
// Обробник відправки форми
function onFormSubmit(evt) {
  // Зупинка стандартної відправки форми
  evt.preventDefault();
  // Очистка форми
  evt.target.reset();
  // Отримання збережених даних або створення порожнього об'єкту, якщо збережених даних немає
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  // Видалення збережених даних з localStorage
  localStorage.removeItem(STORAGE_KEY);
  // Виведення даних у консоль (або відправка даних на сервер)
  console.log(formData);
}
// Заповнення полів форми збереженими даними
function populateFormFields() {
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (formData) {
    textarea.value = formData.message || '';
    input.value = formData.email || '';
  }
}
