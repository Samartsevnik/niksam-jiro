import {Fragment, useEffect, useState, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import '../../App.css';
import Task from "../components/Task";
import BottomMenu from "../components/BottomMenu";
import {getTasks} from "../redux/reducers/tasks";
import TaskEditor from "../components/TaskEditor";

function TasksScene() {
  const dispatch = useDispatch()
  const tasks = useSelector((s) => s.tasks.tasks)

  const [task, setTask] = useState(tasks)

  const [sortedTasks, setSortedTasks] = useState(tasks)
  const [isPriority, setIsPriority] = useState(false)
  const [sortKey, setSortKey] = useState("all")
  const [showEditing, setShowEditing] = useState(false)


  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  useEffect(() => {
    if (sortedTasks.length === 0) {
      setSortKey('all')
    }
  }, [sortedTasks.length])

  useEffect(() => {
    if (sortKey === 'all') {
      setSortedTasks(tasks)
    } else {
      setSortedTasks(tasks.filter((task) => task.project === sortKey))
    }
  }, [sortKey, tasks])

  useEffect(() => {
    if (isPriority) {
      setSortedTasks((prev) => [...prev].sort((a, b) => a.priority - b.priority))
    } else {
      setSortedTasks((prev) => [...prev].sort((a, b) => a.date - b.date))
    }
  }, [isPriority, sortKey, tasks])

  const onChangeKey = useCallback(({target: {value}}) => {
    setSortKey(value)
  }, [])

  const showCreatingHandler = useCallback(() => {
    setShowEditing((prev) => !prev)
    setTask('')
  }, [])

  const showEditorHandler = useCallback((task) => {
    setTask(task)
    setShowEditing(true)
  }, [])


  if (tasks.length === 0) {
    return <h2 className="load">Loading....</h2>
  }

  return (
    <div className="wrapper">
      <div className="tasks">
        {
          sortedTasks.map((task) => (
            <Fragment key={task.id}>
              <Task task={task} showEditorHandler={showEditorHandler}/>
            </Fragment>
          ))
        }
      </div>
      {showEditing ?
        <TaskEditor task={task} showCreatingHandler={showCreatingHandler}/> :
        <BottomMenu
          tasks={tasks}
          onChangeKey={onChangeKey}
          setIsPriority={setIsPriority}
          showCreatingHandler={showCreatingHandler}
          isPriority={isPriority}
          sortKey={sortKey}/>
      }
    </div>
  );
}

export default TasksScene;
