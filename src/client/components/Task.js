import {useState, useCallback} from 'react'
import {useDispatch} from "react-redux";
import {deleteTask} from "../redux/reducers/tasks";

const Task = ({task, showEditorHandler}) => {
  const dispatch = useDispatch()
  const [showDescription, setShowDescription] = useState(false)

  const showDescriptionHandle = useCallback(() => {
    setShowDescription((prev) => !prev)
  }, [])

  const deleteTaskHandle = useCallback((taskId) => {
    dispatch(deleteTask(taskId))
  }, [dispatch])

  return (
    <div className="tasks-card">
      <div className="title">{task.title}</div>
      <div className="information">
        <div className="project-name">Проект: {task.project}</div>
        <div className="project-name">Приоритет: {task.priority}</div>
      </div>
      {showDescription && <div className="description">{task.description}</div>}
      <div className="buttons">
        <button onClick={() => showEditorHandler(task)}>Изменить</button>
        <button onClick={() => deleteTaskHandle(task.id)}>Закрыть</button>
        <button onClick={showDescriptionHandle}>Развернуть</button>
      </div>
    </div>
  )
}

export default Task