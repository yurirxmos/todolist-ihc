function createNewDay() {
  var newTaskDiv = document.createElement("div");
  newTaskDiv.className = "item";

  var currentDate = new Date().toLocaleDateString('en-CA');

  newTaskDiv.innerHTML = `
    <input type="date" value="${currentDate}" />
    <hr />

    <div class="btn">
      <button onclick="createNewTask(this)" id="btnAdd">
        <img src="./assets/add.svg" id="newTaskButton">
      </button>
      <button onclick="createNewDay()">
        <img src="./assets/day.svg" id="newDayButton"/>
      </button>
      <button onclick="removeDay(this)" id="btnRemove">
        <img src="./assets/delete.svg" />
      </button>
    </div>

    <div class="taskItem">
      <input type="checkbox" />
      <input type="text" placeholder="Digite sua atividade aqui ..." id="task-description"/>
      <button onclick="removeTask(this)" id="btnRemove"> 
        <img src="./assets/delete.svg" />
      </button>
    </div>
  `;

  document.querySelector('.tasks').appendChild(newTaskDiv);
}

function createNewTask(button) {
  var parentTaskDiv = button.closest('.item');

  var newTaskDiv = document.createElement("div");
  newTaskDiv.className = "taskItem";

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  newTaskDiv.appendChild(checkbox);

  var taskDescriptionInput = document.createElement("input");
  taskDescriptionInput.type = "text";
  taskDescriptionInput.id = "task-description";
  taskDescriptionInput.placeholder = "Digite sua atividade aqui ...";
  newTaskDiv.appendChild(taskDescriptionInput);

  var deleteButton = document.createElement("button");
  var deleteImg = document.createElement("img");
  deleteImg.src = "./assets/delete.svg";
  deleteButton.appendChild(deleteImg)
  deleteButton.onclick = function () {
    removeTask(this);
  };
  newTaskDiv.appendChild(deleteButton);

  parentTaskDiv.appendChild(newTaskDiv);
}

function removeTask(button) {
  var parentTaskDiv = button.closest('.taskItem');

  parentTaskDiv.remove();
}

function removeDay(button) {
  var parentDayDiv = button.closest('.item');

  parentDayDiv.remove();
}

function deleteAllDays() {
  var confirmation = confirm("Tem certeza que deseja excluir toda sua lista?");
  
  if (confirmation) {
    var tasksDiv = document.querySelector('.tasks');

    while (tasksDiv.firstChild) {
      tasksDiv.removeChild(tasksDiv.firstChild);
    }
  }
}

function updateBackground() {
  // Obtém a referência à div .tasks
  var tasksDiv = document.querySelector('.tasks');

  // Obtém todas as divs de tarefa dentro da div .tasks
  var taskItems = tasksDiv.querySelectorAll('.item');

  // Itera sobre cada div de tarefa
  taskItems.forEach(function (taskItem) {
    // Obtém todas as checkboxes dentro da div de tarefa
    var checkboxes = taskItem.querySelectorAll('input[type="checkbox"]');

    // Verifica se todas as checkboxes estão marcadas
    var allChecked = Array.from(checkboxes).every(function (checkbox) {
      return checkbox.checked;
    });

    // Se todas estiverem marcadas, aplica a cor de fundo verde
    if (allChecked) {
      taskItem.style.backgroundColor = '#12310c'; // Cor verde de exemplo
    } else {
      taskItem.style.backgroundColor = ''; // Remove a cor de fundo se não estiverem todas marcadas
    }
  });
}

// Adiciona eventos de clique a todas as checkboxes dentro da div .tasks
document.addEventListener('change', function (event) {
  var target = event.target;
  if (target.type === 'checkbox') {
    updateBackground();
  }
});
