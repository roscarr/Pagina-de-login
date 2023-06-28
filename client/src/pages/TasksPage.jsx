import { useEffect } from "react"
import { useTask } from "../context/TasksContext"
import { useAuth } from "../context/authContext"
import TaskCard from "../components/TaskCard";
import days from "dayjs"
import  utc  from "dayjs/plugin/utc"
days.extend(utc)

function TasksPage() {
  const {getTasks,tasks}=useTask()
  console.log(tasks);
  useEffect(()=>{
    getTasks()
  },[])
  if (tasks.length===0)return(<h1>No hay tarea</h1>)
  return (
    <div className=" grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1">{tasks.map(task=>(
        <TaskCard key={task._id} id={task._id} title={task.title} description={task.description}
        date={days(task.date).utc().format('DD/MM/YYYY')}
        />
    ))}</div>
  )
}

export default TasksPage