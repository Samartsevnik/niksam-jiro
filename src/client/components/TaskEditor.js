import {useState, useEffect} from 'react'
import {useDispatch} from "react-redux";
import {createTask, updateTask} from "../redux/reducers/tasks";

const TaskEditor = ({task, showCreatingHandler}) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [project, setProject] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState("1")

  const clearStates = () => {
    setTitle('')
    setProject('')
    setPriority(1)
    setDescription('')
  }

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setProject(task.project)
      setPriority(task.priority)
      setDescription(task.description)
    } else {
      clearStates()
    }
  }, [task])

  const editTaskHandler = () => {
    let newTask = {title, project, priority, description}

    if (task) {
      newTask = {id: task.id, ...newTask, date: task.date}
      dispatch(updateTask(newTask))
    } else {
      dispatch(createTask(newTask))
    }
    clearStates()
    showCreatingHandler()
  }

  return (
    <div className="task-editor">
      <label className="task-editor__item">
        Заголовок задачи
        <input type="text" id="task-editor-title" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </label>
      <label className="task-editor__item">
        Название проекта
        <input type="text" id="task-editor-project" value={project} onChange={(e) => setProject(e.target.value)}/>
      </label>
      <label className="task-editor__item">
        Описание
        <textarea id="task-editor-description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </label>
      <div className="task-editor__item">
        Приоритет
        <select name="priority" id="task-edit-priority" value={priority}
                onChange={(e) => setPriority(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="task-editor__buttons">
        <button onClick={editTaskHandler}>Сохранить</button>
        <button onClick={showCreatingHandler}>Отменить</button>
      </div>
    </div>
  )
}

export default TaskEditor