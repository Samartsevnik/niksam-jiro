import { useState, useEffect } from 'react'

const BottomMenu = ({tasks, onChangeKey, setIsPriority, showCreatingHandler, sortKey, isPriority}) => {

  const [uniqueProjects, setUniqueProjects] = useState([])

  useEffect(() => {
    setUniqueProjects(() => tasks.map((task) => task.project).filter((task, id, arr) => arr.indexOf(task) === id ))
  }, [tasks])

  return (
    <div className="bottom-menu">
      <button onClick={showCreatingHandler}>Добавить</button>
      <label className="bottom-menu__priority">
        По приоритету:
      <input type="checkbox" checked={isPriority} onChange={(e) => setIsPriority(e.target.checked)} />
      </label>
      <select name="tasklist" id="list" onChange={onChangeKey} value={sortKey}>
        <option value="all">all</option>
        {uniqueProjects.map((project) => (
          <option key={project} value={project}>{project}</option>
        ))}
      </select>
    </div>
  )
}

export default BottomMenu