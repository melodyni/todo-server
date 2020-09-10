const { createClient } = require('./redisClient');
const redisClient = createClient();

const { getDefaultStatus, getNextStatus } = require('./status');

const defaultTodo = () => ({ tasks: [], title: 'todo', lastId: 0 });

const setTodo = (req, res) => {
  const todoData = JSON.stringify(req.app.locals.todoData);
  redisClient.set('todoData', todoData, (err, data) => {
    if (!err) {
      res.end();
    }
  });
};

const getTodoData = (req, res) => {
  redisClient.get('todoData', (err, data) => {
    if (err) {
      req.app.locals.todoData = defaultTodo();
    }
    req.app.locals.todoData = JSON.parse(data) || defaultTodo();
    const { tasks, title } = req.app.locals.todoData;
    res.json({ tasks, title });
  });
};

const addTask = (req, res) => {
  const { task } = req.body;
  const { todoData } = req.app.locals;
  const id = todoData.lastId++;
  const newTask = { id, message: task, status: getDefaultStatus() };
  todoData.tasks.push(newTask);
  setTodo(req, res);
};

const updateTaskStatus = (req, res) => {
  const { id } = req.body;
  const { todoData } = req.app.locals;
  const taskToUpdate = todoData.tasks.find((task) => task.id === id);
  taskToUpdate.status = getNextStatus(taskToUpdate.status);
  setTodo(req, res);
};

const removeTask = (req, res) => {
  const { id } = req.body;
  const { todoData } = req.app.locals;
  todoData.tasks = todoData.tasks.filter((task) => task.id !== id);
  setTodo(req, res);
};

const removeTodo = (req, res) => {
  req.app.locals.todoData = defaultTodo();
  setTodo(req, res);
};

const updateTitle = (req, res) => {
  const { title } = req.body;
  const { todoData } = req.app.locals;
  todoData.title = title;
  setTodo(req, res);
};

module.exports = {
  getTodoData,
  updateTaskStatus,
  removeTask,
  removeTodo,
  updateTitle,
  addTask,
};
