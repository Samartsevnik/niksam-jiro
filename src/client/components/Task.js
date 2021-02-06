

const Task = ({task}) => {
  return (
    <div className="tasks-card">
      <div className="title">{task.title}</div>
      <div className="information">
        <div className="project-name">Проект: {task.project}</div>
        <div className="project-name">Приоритет: {task.priority}</div>
      </div>
      <div className="buttons">
        <button>Изменить</button>
        <button>Закрыть</button>
        <button>Развернуть</button>
      </div>
    </div>
  )
}

export default Task