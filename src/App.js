import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AddTask } from './components/AddTask'
import Footer from './components/Footer'
import Header from './components/Header'
import Tasks from './components/Tasks'
import About from './components/About'


function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([]) 

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromSever = await fetchTasks()
      setTasks(tasksFromSever)
    }
    getTasks()
  }, [])
  //Fetch tasks from server
  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5000/tasks`)
    const data = await res.json()

    //console.log(data)
    return data
  }

  //Fetch single task 
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    //console.log(data)
    return data
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
    /* //console.log(task)
    const id = Math.floor(Math.random() * 10000) + 1
    //console.log(id)
    const newTask = {id, ...task}
    setTasks([...tasks, newTask]) */
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    console.log(id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    const data = await res.json()
    //console.log('reminder', id)
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }
  return (
    <Router>
      <div className="container">
        <Header onAdd={() => (setShowAddTask(!showAddTask))} showAdd={showAddTask}/>
        <Route path='/' exact render={(props) => (
            <>
              {showAddTask && <AddTask onAdd = {addTask}/>}
              {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks added yet.'}
            </>
          )} 
        />
        
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
