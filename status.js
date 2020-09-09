const TODO = 'todo';
const DOING = 'doing';
const DONE = 'done';

const status = {
  [TODO]: DOING,
  [DOING]: DONE,
  [DONE]: TODO,
};

const getNextStatus = (currentStatus) => status[currentStatus];
const getDefaultStatus = () => TODO;

module.exports =   { getDefaultStatus, getNextStatus };
