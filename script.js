document.addEventListener('DOMContentLoaded', function () {
  // Спочатку спробуємо отримати збережений список завдань з Local Storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const taskInput = document.getElementById('taskInput'); // Поле введення завдання
  const addButton = document.getElementById('addButton'); // Кнопка "Додати"
  const totalCount = document.getElementById('totalCount'); // Відображення загальної кількості завдань
  const incompleteCount = document.getElementById('incompleteCount'); // Відображення кількості незроблених завдань
  const taskList = document.getElementById('taskList'); // Список завдань

  // Функція для збереження завдань в Local Storage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Додаємо обробники
  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  // Функція для відображення завдань в списку
  function renderTasks() {
    taskList.innerHTML = ''; // Очищаємо список перед відображенням нових завдань
    // Проходимось по всім завданням і створюємо для кожного новий елемент списку
    tasks.forEach(function (task, index) {
      const listItem = document.createElement('li'); // Створюємо новий елемент списку
      listItem.textContent = task.text; // Встановлюємо текст завдання
      // Додаємо клас "completed" для завдань, які виконані
      listItem.className = task.completed ? 'completed' : '';
      // Додаємо обробник події для кліку на завданні, який включає/виключає стан завдання
      listItem.addEventListener('click', function () {
        toggleTask(index);
      });
      // Створюємо кнопку для видалення завдання
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Видалити'; // Встановлюємо текст кнопки
      // Додаємо обробник події для кліку на кнопці видалення, який видаляє завдання
      deleteButton.addEventListener('click', function () {
        deleteTask(index);
      });
      // Додаємо кнопку в елемент списку
      listItem.appendChild(deleteButton);
      // Додаємо елемент списку в список завдань
      taskList.appendChild(listItem);
    });
    saveTasks(); // Зберігаємо завдання в Local Storage після оновлення списку
  }

  // Функція для додавання завдання
  function addTask() {
    const taskText = taskInput.value.trim(); // Отримуємо текст завдання і видаляємо зайві пробіли
    if (taskText !== '') {
      tasks.push({ text: taskText, completed: false }); // Додаємо завдання в масив
      taskInput.value = ''; // Очищаємо поле введення
      renderTasks(); // Оновлюємо відображення списку завдань
      updateCounts(); // Оновлюємо показники кількості завдань
    }
  }

  // Функція для перемикання стану завдання
  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed; // Змінюємо стан завдання на протилежний
    renderTasks(); // Оновлюємо відображення списку завдань
    updateCounts(); // Оновлюємо показники кількості завдань
  }

  // Функція для видалення завдання
  function deleteTask(index) {
    tasks.splice(index, 1); // Видаляємо завдання з масиву
    renderTasks(); // Оновлюємо відображення списку завдань
    updateCounts(); // Оновлюємо показники кількості завдань
  }

  // Функція для оновлення показників кількості завдань
  function updateCounts() {
    totalCount.textContent = 'Загальна кількість справ: ' + tasks.length; // Оновлюємо загальну кількість завдань
    incompleteCount.textContent = 'Кількість незроблених справ: ' + tasks.filter(task => !task.completed).length; // Оновлюємо кількість незавершених завдань
  }

  // Викликаємо функцію для відображення завдань при завантаженні сторінки
  renderTasks();
});
