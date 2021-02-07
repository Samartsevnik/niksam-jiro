import axios from 'axios'

const GET_TASKS = 'GET_TASKS'
const DELETE_TASK = 'DELETE_TASK'
const CREATE_TASK = 'CREATE_TASK'
const UPDATE_TASK = 'UPDATE_TASK'


const initialState = {
  tasks: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.tasks }
    case DELETE_TASK:
      return { ...state, tasks: action.tasks }
    case CREATE_TASK:
      return { ...state, tasks: action.tasks }
    case UPDATE_TASK:
      return { ...state, tasks: action.tasks }
    default:
      return state
  }
}

export function getTasks() {
  return (dispatch) => {
    axios.get('/api/v1/tasks').then(({data: tasks}) => dispatch({type: GET_TASKS, tasks}))
  }
}

export function deleteTask(taskId) {
  return (dispatch, getState) => {
    console.log(taskId)
    let { tasks } = getState().tasks
    tasks = tasks.filter((task) => task.id !== taskId)
    axios.patch(`/api/v1/tasks/delete/${taskId}`).then(() => dispatch({type: DELETE_TASK, tasks}))
  }
}

export function createTask(task) {
  return (dispatch, getState) => {
    let { tasks } = getState().tasks
    const id = tasks[tasks.length - 1].id + 1
    tasks = [...tasks, {id, ...task, date: +new Date()}]
    axios.post('/api/v1/tasks/create', {id, ...task, date: +new Date()}).then(() => dispatch({type: CREATE_TASK, tasks}))
  }
}

export function updateTask(task) {
  return (dispatch, getState) => {
    let { tasks } = getState().tasks
    tasks = tasks.reduce((acc, rec) => {
      if (rec.id === task.id) {
        return [...acc, { ...task }]
      }
      return [...acc, rec]
    }, [])
    axios.patch('/api/v1/tasks/update', task).then(() => dispatch({type: UPDATE_TASK, tasks}))
  }
}