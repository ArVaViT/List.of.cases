document.addEventListener('DOMContentLoaded', function () {
    const tasks = [];
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const totalCount = document.getElementById('totalCount');
    const incompleteCount = document.getElementById('incompleteCount');
    const taskList = document.getElementById('taskList');
  
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach(function (task, index) {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;
        listItem.className = task.completed ? 'completed' : '';
  
        listItem.addEventListener('click', function () {
          toggleTask(index);
        });
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Видалити';
        deleteButton.addEventListener('click', function () {
          deleteTask(index);
        });
  
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
      });
    }
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
        updateCounts();
      }
    }
  
    function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
      updateCounts();
    }
  
    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
      updateCounts();
    }
  
    function updateCounts() {
      totalCount.textContent = 'Загальна кількість справ: ' + tasks.length;
      incompleteCount.textContent = 'Кількість незроблених справ: ' + tasks.filter(task => !task.completed).length;
    }
  });
  