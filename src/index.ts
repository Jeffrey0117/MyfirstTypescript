import { v4 as uuidV4 } from 'uuid';
import $ from 'jquery';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const $list = $('#list');
const $form = $('#new-task-form');
const $input = $('#new-task-title');
const tasks: Task[] = loadTasks();

tasks.forEach(addListItem);

$form?.on('submit', (e) => {
  e.preventDefault();

  if ($input?.val() === '' || $input?.val() === null) return;

  const newTask = {
    id: uuidV4(),
    title: $input.val() as string,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  addListItem(newTask);
  $input.val('');
});

function addListItem(task: Task) {
  const $item = $('<li>');
  const $label = $('<label>');
  const $checkbox = $('<input>')
    .attr('type', 'checkbox')
    .prop('checked', task.completed) // Remove the extra semicolon here
    .on('change', () => {
      task.completed = $checkbox.prop('checked'); // Use prop() to get the checked state
      saveTasks();
    });
  $label.append($checkbox, task.title);
  $item.append($label);
  $list?.append($item);
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
