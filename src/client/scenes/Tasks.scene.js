import {Fragment, useEffect, useState, useCallback} from 'react'
import axios from "axios";
import '../../App.css';
import Task from "../components/Task";
import BottomMenu from "../components/BottomMenu";

function TasksScene() {

  const [tasks, setTasks] = useState([])

  const [sortedTasks, setSortedTasks] = useState(tasks)
  const [isPriority, setIsPriority] = useState(false)
  const [sortKey, setSortKey] = useState(false)

  useEffect(() => {
    axios.get('/api/v1/tasks').then(({data}) => setTasks(data))
  }, [])

  useEffect(() => {
    setSortedTasks(tasks.filter((task) => task.project === sortKey || 'all' === sortKey))
  }, [sortKey, tasks])

  useEffect(() => {
    setSortedTasks(tasks)
  }, [tasks])

  useEffect(() => {
    if(isPriority) {
      setSortedTasks((prev) => prev.sort((a, b) => a.priority - b.priority ))
    } else {
      setSortedTasks((prev) => prev.sort((a, b) => a.id - b.id ))
    }
  }, [isPriority, sortedTasks, sortKey])

  const onChangeKey = useCallback(({target:{value}}) => {
    setSortKey(value)
  }, [])

  if(tasks.length === 0) {
    return <h2 className="load">Loading....</h2>
  }

  return (
    <div className="wrapper">
      <div className="tasks">
        {
          sortedTasks.map((task) => (
            <Fragment key={task.id}>
              <Task task={task}/>
            </Fragment>
          ))
        }
      </div>
      <BottomMenu tasks={tasks} onChangeKey={onChangeKey} setIsPriority={setIsPriority}/>
    </div>
  );
}

export default TasksScene;
