const express = require('express');
const app = express();

const {
  getTodoData,
  updateTaskStatus,
  removeTask,
  removeTodo,
  updateTitle,
  addTask,
} = require('./handlers');

app.use(express.static('./react-build'));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.get('/api/todoData', getTodoData);
app.post('/api/updateTaskStatus', updateTaskStatus);
app.post('/api/removeTask', removeTask);
app.post('/api/removeTodo', removeTodo);
app.post('/api/updateTitle', updateTitle);
app.post('/api/addTask', addTask);

app.listen(3001, () => console.log(`Listening on port 3001`));
