const { readFile, writeFile } = require('fs').promises

const write = async (tasksList) => {
  await writeFile(`${__dirname}/../data/data.json`, JSON.stringify(tasksList, 1, 2), {
    encoding: 'utf8'
  })
}

const read = () => {
  return readFile(`${__dirname}/../data/data.json`, { encoding: 'utf8' })
    .then((result) => {
      return JSON.parse(result)
    })
    .catch(() => [])
}


exports.getTasks = async (req, res) => {
  const tasks = await read()
  res.json(tasks)
}

exports.createTask = async (req, res) => {
  const task = req.body
  const tasks = await read()
  const updatedTasks =  [...tasks, task]
  await write(updatedTasks)
  res.json('success')
}

exports.updateTask = async (req, res) => {
  const task = req.body
  const tasks = await read()
  const updatedTasks =  tasks.reduce((acc, rec) => {
    if (rec.id === task.id) {
      return [...acc, task]
    }
    return [...acc, rec]
  }, [])
  await write(updatedTasks)
  res.json('success')
}

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params
  const tasks = await read()
  const updatedTasks =  tasks.reduce((acc, rec) => {
    if (rec.id === +taskId) {
      return acc
    }
    return [...acc, rec]
  }, [])
  await write(updatedTasks)
  res.json('success')
}