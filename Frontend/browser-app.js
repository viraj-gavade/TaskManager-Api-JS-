const tasksDOM = document.querySelector('.tasks');
const loadingDOM = document.querySelector('.loading-text');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');

// Function to show tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible';

  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/api/v1/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    const { data: { task } } = response; // Destructure tasks array from response data

    if (task.length === 0) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = 'hidden';
      return;
    }

    const allTasks = task.map((task) => {
      const { completed, _id: taskID, name } = task; // Destructure task properties
      return `
        <div class="single-task ${completed ? 'task-completed' : ''}">
          <h5>
            <span><i class="far fa-check-circle"></i></span>
            ${name}
          </h5>
          <div class="task-links">
            <a href="task.html?id=${taskID}" class="edit-link">
              <i class="fas fa-edit"></i>
            </a>
            <button type="button" class="delete-btn" data-id="${taskID}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>`;
    }).join('');

    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML = '<h5 class="empty-list">There was an error, please try again later.</h5>';
    console.error('Error fetching tasks:', error);
  }

  loadingDOM.style.visibility = 'hidden';
};

// Function to handle task deletion
tasksDOM.addEventListener('click', async (e) => {
  const el = e.target;
  if (el.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible';
    const id = el.dataset.id;

    try {
      const token = localStorage.getItem('token');
      
      await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }

    loadingDOM.style.visibility = 'hidden';
  }
});

// Function to handle form submission
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value.trim();

  if (!name) {
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Please enter a task name';
    formAlertDOM.classList.add('text-danger');
    setTimeout(() => {
      formAlertDOM.style.display = 'none';
      formAlertDOM.classList.remove('text-danger');
    }, 3000);
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:3000/api/v1/tasks', {
      name: name
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Task added:', response.data);

    showTasks();
    taskInputDOM.value = '';
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Success, task added';
    formAlertDOM.classList.add('text-success');
  } catch (error) {
    console.error('Error adding task:', error);
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Error, please try again';
    formAlertDOM.classList.add('text-danger');
  }

  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success', 'text-danger');
  }, 3000);
});

// Initial load of tasks
showTasks();
