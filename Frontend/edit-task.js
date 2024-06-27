// DOM Element Selection
const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');

// Retrieve task ID from URL query parameters
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
console.log(id)
let tempName; // Variable to store the original task name

// Function to fetch and display task details
const showTask = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data: { task } } = await axios.get(`/api/v1/tasks/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { _id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name; // Store the original task name for potential rollback

    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.error('Error fetching task:', error);
  }
};

// Initial call to fetch and display task details
showTask();

// Event listener for form submission (edit task)
editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  editBtnDOM.textContent = 'Loading...';

  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;
    console.log(taskName,taskCompleted)

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    
    // Send PATCH request to update task
    const { data: { task } } = await axios.patch(`http://localhost:3000/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { _id: taskId, completed, name } = task;

    taskIDDOM.textContent = taskId;
    taskNameDOM.value = name;
    tempName = name; // Update tempName in case of subsequent edits

    if (completed) {
      taskCompletedDOM.checked = true;
    }

    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Success, edited task';
    formAlertDOM.classList.add('text-success');
  } catch (error) {
    console.log('Error editing task:', error);
    taskNameDOM.value = tempName; // Rollback to original task name on error
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Error, please try again';
    formAlertDOM.classList.add('text-danger');
  }

  editBtnDOM.textContent = 'Edit';

  // Hide alert after 3 seconds
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success', 'text-danger');
  }, 3000);
}); 
