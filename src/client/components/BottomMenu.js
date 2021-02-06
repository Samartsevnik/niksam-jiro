import { useState, useEffect } from 'react'

const BottomMenu = ({tasks, onChangeKey, setIsPriority}) => {

  const [uniqueProjects, setUniqueProjects] = useState([])

  useEffect(() => {
    setUniqueProjects(() => tasks.map((task) => task.project).filter((task, id, arr) => arr.indexOf(task) === id ))
  }, [tasks])

  return (
    <div className="bottom-menu">
      <button>Добавить</button>
      <input type="checkbox" onChange={(e) => setIsPriority(e.target.checked)} />
      <select name="tasklist" id="list" onChange={onChangeKey} defaultValue="all">
        <option value="all">all</option>
        {uniqueProjects.map((project) => (
          <option key={project} value={project}>{project}</option>
        ))}
      </select>
    </div>
  )
}

export default BottomMenu